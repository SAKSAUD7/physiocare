# PhysioCare

PhysioCare is a modern web application for physiotherapy services, allowing patients to book appointments, manage their profiles, and connect with professional physiotherapists.

## Features

- **User Authentication**: Secure login and registration system with role-based access (Admin, Doctor, Patient)
- **Appointment Booking**: Interactive step-by-step booking process
- **User Profiles**: Customizable profiles with avatar upload capability
- **Service Management**: Browse various physiotherapy services
- **Therapist Selection**: Choose from qualified professionals based on specialization

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Icons**: React Icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MongoDB database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/physiocare.git
   cd physiocare
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret_key
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Test Accounts

For testing purposes, the following accounts are available:

- **Admin**:
  - Email: admin@physiocare.com
  - Password: admin123

- **Doctor**:
  - Email: doctor@physiocare.com
  - Password: doctor123

- **Patient**:
  - Email: patient@physiocare.com
  - Password: patient123

## Deployment

The application can be easily deployed on Vercel:

1. Push your code to GitHub
2. Import the project to Vercel
3. Configure environment variables
4. Deploy

## License

[MIT](LICENSE)

## Acknowledgements

- Images from Unsplash
- Icons from React Icons 