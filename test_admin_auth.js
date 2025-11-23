
const BASE_URL = 'http://localhost:5000/api/auth';

async function testAdminAuth() {
    console.log('--- Testing Admin Registration ---');
    const regRes = await fetch(`${BASE_URL}/admin/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Admin One',
            email: `admin_${Date.now()}@example.com`, // Unique email
            password: 'password123'
        })
    });

    const regText = await regRes.text();
    try {
        const regData = JSON.parse(regText);
        console.log('Registration Status:', regRes.status);
        console.log('Registration Response:', regData);

        if (regRes.status !== 201) {
            console.error('Registration failed!');
            return;
        }

        console.log('\n--- Testing Admin Login ---');
        const loginRes = await fetch(`${BASE_URL}/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: regData.email,
                password: 'password123'
            })
        });

        const loginData = await loginRes.json();
        console.log('Login Status:', loginRes.status);
        console.log('Login Response:', loginData);

        if (loginRes.status === 200 && loginData.token) {
            console.log('\n✅ Admin Auth Flow Verified Successfully!');
        } else {
            console.error('\n❌ Admin Login Failed!');
        }
    } catch (e) {
        console.error('Failed to parse JSON:', regText);
        return;
    }
}

testAdminAuth();
