# AML/CTF Compliance MVP

A comprehensive Anti-Money Laundering and Counter-Terrorism Financing compliance platform built with Next.js 14, MongoDB, and NextAuth.

## Features

- **User Authentication**: Secure signup, login, and password reset functionality
- **Business Information Management**: Upload and store company details with document management
- **Risk Assessment**: Interactive questionnaire with automatic risk scoring (Low, Medium, High, Very High)
- **Document Generation**: Automated AML/CTF Program and Risk Assessment report templates
- **PDF Export**: Download generated compliance documents as PDFs
- **Dashboard**: Comprehensive view of assessments, documents, and business information
- **Secure Hosting**: SSL-ready with environment variable configuration for deployment

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Authentication**: NextAuth.js with JWT
- **Database**: MongoDB with Mongoose
- **PDF Generation**: jsPDF
- **Deployment**: Vercel-ready with configuration

## Getting Started

### Prerequisites

- Node.js 18+ (Note: The project uses Node 18, but Next.js 14 recommends Node 20+)
- MongoDB instance (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd amf-ctf-compliance-mvp
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

   Update the following variables in `.env.local`:
   ```env
   # MongoDB Connection
   MONGODB_URI=your-mongodb-connection-string

   # NextAuth (generate with: openssl rand -base64 32)
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000

   # Email Configuration (optional for password reset)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@example.com
   SMTP_PASS=your-app-password
   SMTP_FROM=noreply@amlctf.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the application**

   Navigate to [http://localhost:3000](http://localhost:3000)

## MongoDB Setup

### Using MongoDB Atlas (Recommended)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and add it to `.env.local`

### Using Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/amlctf`

## Project Structure

```
amf-ctf-compliance-mvp/
├── app/
│   ├── (auth)/              # Authentication pages
│   │   ├── login/
│   │   ├── signup/
│   │   └── reset-password/
│   ├── api/                 # API routes
│   │   ├── auth/           # NextAuth configuration
│   │   ├── users/          # User management
│   │   ├── business/       # Business information
│   │   ├── assessment/     # Risk assessments
│   │   └── documents/      # Document generation
│   ├── dashboard/          # Main dashboard
│   ├── business-info/      # Business info form
│   └── assessment/         # Risk assessment questionnaire
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── forms/              # Form components
│   └── layout/             # Layout components
├── lib/
│   ├── models/             # MongoDB models
│   └── utils/              # Utility functions
└── public/
    └── uploads/            # File uploads directory
```

## Key Features Explanation

### 1. User Authentication
- Secure password hashing with bcryptjs
- JWT-based session management
- Password reset with email verification

### 2. Business Information
- Company details form
- File upload for supporting documents
- ABN and industry classification

### 3. Risk Assessment
- 10-question questionnaire
- Automatic risk scoring (0-100 scale)
- Risk level classification:
  - Low: 0-20 points
  - Medium: 21-40 points
  - High: 41-60 points
  - Very High: 61-100 points

### 4. Document Generation
- **AML/CTF Program**: Comprehensive compliance program template
- **Risk Assessment Report**: Detailed risk analysis with recommendations
- Both documents customized with business information

### 5. PDF Export
- Client-side PDF generation
- Professional formatting
- Downloadable compliance documents

## Deployment to Vercel

### Prerequisites
- Vercel account
- MongoDB Atlas database (recommended for production)

### Steps

1. **Install Vercel CLI** (optional)
   ```bash
   npm i -g vercel
   ```

2. **Connect to Vercel**

   Push your code to GitHub, then:
   - Go to [Vercel](https://vercel.com)
   - Import your repository
   - Configure environment variables

3. **Set Environment Variables in Vercel**

   Add these in Vercel Dashboard → Settings → Environment Variables:
   ```
   MONGODB_URI=your-mongodb-atlas-connection-string
   NEXTAUTH_SECRET=your-production-secret
   NEXTAUTH_URL=https://your-domain.vercel.app
   SMTP_HOST=your-smtp-host
   SMTP_PORT=587
   SMTP_USER=your-email
   SMTP_PASS=your-password
   SMTP_FROM=noreply@yourdomain.com
   ```

4. **Deploy**
   ```bash
   vercel --prod
   ```

### SSL/HTTPS
- Vercel automatically provides SSL certificates
- All deployments use HTTPS by default

## Security Best Practices

1. **Never commit `.env.local`** - It's in `.gitignore`
2. **Use strong NEXTAUTH_SECRET** - Generate with `openssl rand -base64 32`
3. **Enable MongoDB IP whitelisting** in production
4. **Use environment-specific configurations**
5. **Keep dependencies updated** - Run `npm audit` regularly

## API Endpoints

### Authentication
- `POST /api/users/signup` - Create new user
- `POST /api/auth/signin` - Login (NextAuth)
- `POST /api/users/reset-password` - Request/reset password

### Business
- `POST /api/business` - Create business info
- `GET /api/business` - Get user's businesses

### Assessment
- `POST /api/assessment` - Submit risk assessment
- `GET /api/assessment` - Get user's assessments

### Documents
- `POST /api/documents` - Generate document
- `GET /api/documents` - Get user's documents
- `GET /api/documents/[id]` - Get specific document

## Risk Assessment Questions

The platform includes 10 comprehensive risk assessment questions covering:
1. Business nature
2. Transaction values
3. Cash handling
4. International customers
5. High-risk countries
6. Politically exposed persons (PEPs)
7. Customer onboarding (KYC)
8. Transaction monitoring
9. Staff training
10. Suspicious activity reporting

## Document Templates

### AML/CTF Program Template Includes:
1. Introduction
2. Business Details
3. AML/CTF Compliance Officer
4. Customer Due Diligence (CDD)
5. Suspicious Matter Reporting
6. Record Keeping
7. Employee Training
8. Program Review
9. Approval and Adoption

### Risk Assessment Report Includes:
1. Executive Summary
2. Business Profile
3. Questionnaire Results
4. Risk Analysis
5. Risk Mitigation Recommendations
6. Next Steps
7. Certification

## Troubleshooting

### Common Issues

**1. MongoDB Connection Error**
```
Error: Please define the MONGODB_URI environment variable
```
Solution: Add `MONGODB_URI` to `.env.local`

**2. NextAuth Error**
```
Error: Please define the NEXTAUTH_SECRET environment variable
```
Solution: Add `NEXTAUTH_SECRET` to `.env.local`

**3. File Upload Not Working**
```
Error: ENOENT: no such file or directory
```
Solution: Ensure `public/uploads` directory exists:
```bash
mkdir -p public/uploads
```

**4. Node Version Warning**
```
npm WARN EBADENGINE Unsupported engine
```
Solution: Upgrade to Node.js 20+:
```bash
nvm install 20
nvm use 20
```

## Development Tips

### Running with Different Environments

**Development:**
```bash
npm run dev
```

**Production Build:**
```bash
npm run build
npm start
```

**Linting:**
```bash
npm run lint
```

### Database Seeding

For testing, you can manually create a user via the signup page, then:
1. Add business information
2. Complete risk assessment
3. Generate documents

## Future Enhancements

Potential features for future versions:
- Multi-language support
- Advanced analytics dashboard
- Automated compliance reminders
- Integration with AUSTRAC reporting
- Bulk document generation
- Custom questionnaire builder
- Role-based access control
- Audit trail logging

## Contributing

This is an MVP project. For production use:
1. Add comprehensive error handling
2. Implement rate limiting
3. Add input validation on all forms
4. Implement comprehensive testing
5. Add logging and monitoring
6. Enhance security measures

## License

This project is for demonstration purposes. Ensure compliance with local regulations when deploying for production use.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the code comments
3. Check Next.js and MongoDB documentation

## Author

Built with Next.js 14, MongoDB, and NextAuth.js

---

**Note**: This is an MVP (Minimum Viable Product). For production deployment, please ensure:
- Comprehensive security audit
- Legal compliance review
- Professional testing
- Backup and disaster recovery procedures
- Performance optimization
- Monitoring and logging systems
# Deployed to Vercel
