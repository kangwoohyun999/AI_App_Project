# AI App Server (Express)
## Quick start
1. Copy `.env.example` to `.env` and fill values.
2. `npm install`
3. `npm run dev` (if you have nodemon) or `npm start`
4. Endpoints:
   - POST /auth/register { email, password, name }
   - POST /auth/login { email, password } -> returns { token, user }
   - POST /chat { message } (requires Authorization: Bearer <token> )
