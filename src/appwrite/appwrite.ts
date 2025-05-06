// src/appwrite.js
import { Client, Account, OAuthProvider } from 'appwrite';

const client = new Client();
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // The Appwrite API endpoint
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Your Appwrite project ID

// Exporting account and OAuthProvider after the client is set up
export const account = new Account(client);
export { OAuthProvider };
