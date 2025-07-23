# Alladins Chirag

A real-time stock analysis and automation platform with Zerodha Kite API integration.

## Features
- User authentication (email/password or mobile/OTP)
- Real-time stock dashboard (Zerodha/Grow style)
- Automated trading (Zerodha Kite API)
- Websocket-based live updates

## Project Structure
- `client/` – React frontend (deployed on Vercel)
- `server/` – Node.js backend (deployed on Render)

## Setup

### Backend (server)
1. `cd server`
2. `npm install`
3. Set up environment variables (MongoDB URI, etc.)
4. `npm start`

### Frontend (client)
1. `cd client`
2. `npm install`
3. Set up environment variables (API base URL, websocket URL, etc.)
4. `npm start`

## Deployment
- Frontend: Vercel
- Backend: Render

## TODO
- Complete authentication logic
- Integrate Zerodha Kite API
- Build dashboard UI
- Implement trading automation 