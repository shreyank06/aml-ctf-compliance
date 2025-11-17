# Quick Start Guide

## Setup in 5 Minutes

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Configure Environment Variables
```bash
cp .env.example .env.local
```

Edit `.env.local` with your MongoDB connection string:
```env
MONGODB_URI=mongodb://localhost:27017/amlctf
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/amlctf

NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
```

Generate `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Access Application
Open [http://localhost:3000](http://localhost:3000)

## First Steps

1. **Sign Up**: Create a new account at `/signup`
2. **Add Business**: Fill in your business information at `/business-info`
3. **Complete Assessment**: Take the risk assessment questionnaire
4. **Generate Documents**: Create AML/CTF Program and Risk Assessment documents
5. **Download PDFs**: Export your compliance documents

## Default Flow

```
Sign Up → Login → Dashboard → Business Info → Risk Assessment → Generate Documents → Download PDFs
```

## Key Features

- **User Authentication**: Secure signup/login with NextAuth
- **Business Management**: Store company details with file uploads
- **Risk Assessment**: 10-question AML/CTF risk evaluation
- **Document Generation**: Automated compliance document templates
- **PDF Export**: Download documents for records
- **Dashboard**: Overview of all assessments and documents

## MongoDB Options

### Option 1: Local MongoDB
```bash
# Install MongoDB
# Start MongoDB service
# Use: mongodb://localhost:27017/amlctf
```

### Option 2: MongoDB Atlas (Recommended)
1. Create free account at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create cluster
3. Get connection string
4. Add to `.env.local`

## Troubleshooting

**Can't connect to MongoDB?**
- Check `MONGODB_URI` in `.env.local`
- For local: Ensure MongoDB is running
- For Atlas: Check IP whitelist and credentials

**NextAuth error?**
- Ensure `NEXTAUTH_SECRET` is set in `.env.local`
- Generate new secret: `openssl rand -base64 32`

**Build errors?**
- Run: `npm install --legacy-peer-deps`
- Clear cache: `rm -rf .next`

## Production Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

Environment variables for production:
```env
MONGODB_URI=your-atlas-connection-string
NEXTAUTH_SECRET=your-production-secret
NEXTAUTH_URL=https://your-domain.vercel.app
```

## Support

- Check README.md for detailed documentation
- Review code comments for implementation details
- Refer to Next.js and MongoDB documentation

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

Happy coding!
