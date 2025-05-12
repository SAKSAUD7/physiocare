# PhysioCare - Physiotherapy Clinic Management System

PhysioCare is a comprehensive web application designed to streamline physiotherapy clinic operations, appointments, and patient care management.

## Features

- **User Authentication**: Secure login and signup with email/password and Google OAuth
- **Role-Based Access**: Different dashboards and features for patients, doctors, and administrators
- **Appointment Management**: Book, view, and manage physiotherapy appointments
- **Treatment Plans**: Create and track patient treatment plans
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Next.js API Routes
- **Authentication**: NextAuth.js with Credential and Google providers
- **Database**: MongoDB (with mock data for demonstration)

## Getting Started

### Prerequisites

- Node.js 14+ and npm

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-username/physiocare.git
   cd physiocare
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env.local` file with the following variables:
   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   
   # Google OAuth (optional)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   
   # MongoDB (optional)
   DATABASE_URL=your-mongodb-connection-string
   ```

4. Start the development server
   ```
   npm run dev
   ```

### Demo Accounts

The application comes with pre-configured test accounts:

- **Admin**: admin@physiocare.com / admin123
- **Doctor**: doctor@physiocare.com / doctor123
- **Patient**: patient@physiocare.com / patient123

## Deployment

This application can be deployed to Vercel, Netlify, or any hosting platform that supports Next.js.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons by [React-Icons](https://react-icons.github.io/react-icons/)
- UI Components styled with [TailwindCSS](https://tailwindcss.com/) 