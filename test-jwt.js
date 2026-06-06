const http = require('http');

const API_BASE = 'http://localhost:5000/api/auth';

async function testJWTLogic() {
    console.log('--- Starting JWT Logic Test ---');
    
    // 1. Generate a unique email to avoid "User already exists" errors
    const uniqueEmail = `testuser_${Date.now()}@hotella.com`;
    const password = 'supersecretpassword123';
    
    console.log(`\n1. Registering new user: ${uniqueEmail}`);
    const registerBody = JSON.stringify({
        email: uniqueEmail,
        password: password,
        role: 'customer'
    });

    const registerResponse = await makeRequest('/register', 'POST', registerBody);
    console.log('Register Response:', registerResponse);
    
    if (!registerResponse.token) {
        console.error('❌ Failed to get JWT token on registration!');
        return;
    }
    
    const jwtToken = registerResponse.token;
    console.log('\n✅ Successfully received JWT Token:');
    console.log(jwtToken);
    
    console.log('\n2. Testing Protected Route (/me) WITH Token...');
    const protectedResponse = await makeRequest('/me', 'GET', null, jwtToken);
    console.log('Protected Route Response (Should succeed):', protectedResponse);
    
    if (protectedResponse.email === uniqueEmail) {
        console.log('✅ Token successfully verified and user data retrieved!');
    } else {
        console.error('❌ Token verification failed or user data mismatched!');
    }
    
    console.log('\n3. Testing Protected Route (/me) WITHOUT Token...');
    const unauthResponse = await makeRequest('/me', 'GET', null, null);
    console.log('Protected Route Response (Should fail):', unauthResponse);
    
    if (unauthResponse.message === 'No token provided, authorization denied') {
         console.log('✅ Route successfully blocked unauthorized access!');
    } else {
         console.error('❌ Route did not block access properly!');
    }

    console.log('\n--- JWT Logic Test Complete ---');
}

// Helper function to make HTTP requests since we are using pure Node.js without node-fetch/axios
function makeRequest(path, method, body = null, token = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(API_BASE + path);
        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (body) {
            options.headers['Content-Length'] = Buffer.byteLength(body);
        }

        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    resolve({ status: res.statusCode, raw: data });
                }
            });
        });

        req.on('error', (e) => reject(e));

        if (body) {
            req.write(body);
        }
        req.end();
    });
}

testJWTLogic();