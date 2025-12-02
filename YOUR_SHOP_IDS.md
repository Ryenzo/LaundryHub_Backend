# Your Shop IDs

Copy these exact IDs to create admin accounts:

## 1. Wash Ko Lang
**Shop ID:** `692dc9f06b2cdfc70242e44f`

Create admin:
```json
{
  "name": "Wash Ko Lang Admin",
  "email": "admin@washkolang.com",
  "password": "test123",
  "shopId": "692dc9f06b2cdfc70242e44f"
}
```

## 2. Tripple Bubble Laundry  
**Shop ID:** `692dc9f06b2cdfc70242e459`

Create admin:
```json
{
  "name": "Triple Bubble Admin",
  "email": "admin@tripplebubble.com",
  "password": "test123",
  "shopId": "692dc9f06b2cdfc70242e459"
}
```

## 3. Mommy's Best Laundry
**Shop ID:** `692dc9f06b2cdfc70242e460`

Create admin:
```json
{
  "name": "Mommys Best Admin",
  "email": "admin@mommysbest.com",
  "password": "test123",
  "shopId": "692dc9f06b2cdfc70242e460"
}
```

## How to Use

### In Postman/Thunder Client:
1. Open your API client
2. Create new POST request to: `http://localhost:5000/api/auth/admin/register`
3. Set header: `Content-Type: application/json`
4. Copy one of the JSON blocks above into the body
5. Send!

### Using curl:
```bash
curl -X POST http://localhost:5000/api/auth/admin/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Wash Ko Lang Admin\",\"email\":\"admin@washkolang.com\",\"password\":\"test123\",\"shopId\":\"692dc9f06b2cdfc70242e44f\"}"
```

✅ Your server is running on http://localhost:5000
