# Creative Network Mobile App Setup Guide

## Prerequisites

1. Install Node.js (v18 or later)
2. Install Git
3. Install Expo CLI globally:
```bash
npm install -g expo-cli
```
4. Install Expo Go app on your mobile device:
   - [iOS App Store](https://apps.apple.com/app/apple-store/id982107779)
   - [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

## Setup Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd creative-network-platform
```

2. Install root dependencies:
```bash
npm install
```

3. Navigate to mobile app directory:
```bash
cd apps/mobile
```

4. Install mobile app dependencies:
```bash
npm install
```

5. Start the development server:
```bash
npm start
```

## Running the App

Once the development server starts, you'll see:
- A QR code in your terminal
- Development options in your terminal

To run the app:

### On iOS:
- Open the Camera app
- Point it at the QR code
- Tap the banner that appears
- The app will open in Expo Go

### On Android:
- Open Expo Go app
- Tap "Scan QR Code"
- Scan the QR code
- The app will open in Expo Go

## Development Notes

- The app will automatically reload when you save changes
- Press 'r' in the terminal to reload manually
- Press 'm' to toggle the menu
- Press 'j' to open React DevTools

## Troubleshooting

If you encounter issues:

1. Clear Metro bundler cache:
```bash
npm start -- --clear
```

2. Reset Expo cache:
```bash
expo start -c
```

3. Verify your Node.js version:
```bash
node --version
```

4. Check that all environment variables are set correctly in `.env`

5. Ensure you're on the same WiFi network as your development machine

## Environment Setup

Make sure your `.env` file in `apps/mobile` contains the necessary Firebase configuration:

```env
# App Configuration
APP_NAME=Creative Network
APP_ENV=development

# API Configuration
API_URL=http://localhost:4000

# Firebase Configuration
FIREBASE_API_KEY=AIzaSyBTLvnp6L6m1x5dLJ1OdWfwnsgNN1_53ZE
FIREBASE_AUTH_DOMAIN=fluckeyplatform.firebaseapp.com
FIREBASE_PROJECT_ID=fluckeyplatform
FIREBASE_STORAGE_BUCKET=fluckeyplatform.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=76928364407
FIREBASE_APP_ID=1:76928364407:web:12b5893ef0d77aefa37b72
```

These Firebase configuration values are already set up for the Creative Network platform. If you're setting up your own instance of the application, you'll need to replace these values with your own Firebase project credentials.