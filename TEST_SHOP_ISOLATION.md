# Quick Test Guide: Shop-Specific Bookings

## Quick Start (5 Minutes)

### Step 1: Get Shop IDs (30 seconds)
```bash
# Get all shops
curl http://localhost:5000/api/shops
```

Copy the `_id` for each shop (you'll need these for Step 2).

### Step 2: Create 3 Admin Accounts (2 minutes)

Replace `<SHOP_ID>` with actual IDs from Step 1.

**Wash Ko Lang Admin:**
```bash
curl -X POST http://localhost:5000/api/auth/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Wash Ko Lang Admin",
    "email": "admin@washkolang.com",
    "password": "test123",
    "shopId": "<WASH_KO_LANG_SHOP_ID>"
  }'
```

**Triple Bubble Admin:**
```bash
curl -X POST http://localhost:5000/api/auth/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Triple Bubble Admin",
    "email": "admin@tripplebubble.com",
    "password": "test123",
    "shopId": "<TRIPLE_BUBBLE_SHOP_ID>"
  }'
```

**Mommy's Best Admin:**
```bash
curl -X POST http://localhost:5000/api/auth/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mommys Best Admin",
    "email": "admin@mommysbest.com",
    "password": "test123",
    "shopId": "<MOMMYS_BEST_SHOP_ID>"
  }'
```

### Step 3: Login & Test (2 minutes)

**Login as Wash Ko Lang admin:**
```bash
curl -X POST http://localhost:5000/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@washkolang.com",
    "password": "test123"
  }'
```

Copy the `token` from the response.

**Get bookings (should only show Wash Ko Lang bookings):**
```bash
curl http://localhost:5000/api/admin/bookings/my-shop \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

### Step 4: Verify Isolation

Repeat Step 3 for Triple Bubble and Mommy's Best admins. Each should only see their own shop's bookings!

## Expected Results

✅ **Wash Ko Lang admin** sees only Wash Ko Lang bookings  
✅ **Triple Bubble admin** sees only Triple Bubble bookings  
✅ **Mommy's Best admin** sees only Mommy's Best bookings

## All Available Endpoints

```
POST /api/auth/admin/register          - Create admin account
POST /api/auth/admin/login             - Login admin
GET  /api/admin/bookings/my-shop       - Get all shop bookings
GET  /api/admin/bookings/my-shop/status/:status  - Filter by status
GET  /api/admin/bookings/:id           - Get specific booking
PUT  /api/admin/bookings/:id/status    - Update booking status
DELETE /api/admin/bookings/:id         - Delete booking
```

## Postman/Thunder Client Collection

Import these requests into your API client:

### 1. Get Shops
```
GET http://localhost:5000/api/shops
```

### 2. Register Admin
```
POST http://localhost:5000/api/auth/admin/register
Body (JSON):
{
  "name": "Admin Name",
  "email": "admin@shop.com",
  "password": "test123",
  "shopId": "{{shopId}}"
}
```

### 3. Login Admin
```
POST http://localhost:5000/api/auth/admin/login
Body (JSON):
{
  "email": "admin@shop.com",
  "password": "test123"
}
```

### 4. Get My Shop Bookings
```
GET http://localhost:5000/api/admin/bookings/my-shop
Headers:
  Authorization: Bearer {{token}}
```

### 5. Update Booking Status
```
PUT http://localhost:5000/api/admin/bookings/{{bookingId}}/status
Headers:
  Authorization: Bearer {{token}}
Body (JSON):
{
  "status": "processing"
}
```

## Troubleshooting

**"Admin already exists"**
- Use different email for each shop admin

**"Invalid shop ID"**
- Make sure you copied the correct `_id` from `/api/shops`
- IDs should look like: `675d26f8e4b9a1234567890`

**"Not authorized"**
- Make sure to include `Authorization: Bearer <token>` header
- Token expires - login again to get new token

**Empty bookings array**
- Normal if no bookings created yet
- Create test bookings using the booking endpoint

**Can see other shop's bookings**
- Verify admin has correct shopId in database
- Check you're using `/my-shop` endpoint, not old endpoint
