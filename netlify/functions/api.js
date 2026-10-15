import serverless from 'serverless-http';
import app from '../../backend/app.js';
import { connectDB } from '../../backend/config/db.js';

let isDbConnected = false;

// Serverless handler for Netlify Functions
const handler = async (event, context) => {
  // Prevent function timeout waiting for event loop
  context.callbackWaitsForEmptyEventLoop = false;

  if (!isDbConnected) {
    try {
      await connectDB();
      isDbConnected = true;
    } catch (err) {
      console.error('[Netlify Function] DB Connection failed:', err);
    }
  }

  const serverlessHandler = serverless(app);
  return await serverlessHandler(event, context);
};

export { handler };
