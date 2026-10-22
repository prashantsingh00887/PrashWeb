import express from 'express';
import multer from 'multer';
import { connectDB, getDBStatus } from '../config/db.js';
import { uploadToCloudinary, uploadBase64ToCloudinary, cloudinary } from '../config/cloudinary.js';
import { Portfolio } from '../models/Portfolio.js';
import { ContactMessage } from '../models/Message.js';
import { defaultPortfolioData } from '../../src/data/defaultData.js';

const router = express.Router();

// Configure multer for memory storage (up to 50MB files for videos/documents)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

// Middleware to ensure DB connection before handling requests
const ensureDB = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('DB middleware connection error:', err);
    next();
  }
};

router.use(ensureDB);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: getDBStatus(),
    cloudinary: {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'ggb1dd3d',
      configured: true
    }
  });
});

// Helper to remove any duplicate items by id, _id, or title
const dedupeCollection = (list) => {
  if (!Array.isArray(list)) return [];
  const seen = new Set();
  return list.filter(item => {
    if (!item || typeof item !== 'object') return false;
    const key = String(item.id || item._id || item.title || item.name || '').trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

// 1. GET /api/portfolio - Fetch complete portfolio data from MongoDB Atlas
router.get('/portfolio', async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne().sort({ updatedAt: -1 });

    // Seed database if empty on first connection
    if (!portfolio) {
      console.log('[MongoDB Atlas] No portfolio record found. Seeding initial data...');
      portfolio = await Portfolio.create(defaultPortfolioData);
    }

    const doc = portfolio.toObject ? portfolio.toObject() : portfolio;
    // Ensure clean deduplication on read
    doc.projects = dedupeCollection(doc.projects);
    doc.skills = dedupeCollection(doc.skills);
    doc.education = dedupeCollection(doc.education);
    doc.certificates = dedupeCollection(doc.certificates);
    doc.achievements = dedupeCollection(doc.achievements);

    res.json(doc);
  } catch (err) {
    console.error('Error in GET /api/portfolio:', err);
    // Graceful fallback to default data if DB is temporarily unreachable
    res.json(defaultPortfolioData);
  }
});

// 2. POST /api/portfolio - Update or replace portfolio data in MongoDB Atlas
router.post('/portfolio', async (req, res) => {
  try {
    const updateData = req.body;
    if (!updateData || typeof updateData !== 'object') {
      return res.status(400).json({ error: 'Invalid portfolio data payload' });
    }

    // Clean deduplication before saving
    if (Array.isArray(updateData.projects)) updateData.projects = dedupeCollection(updateData.projects);
    if (Array.isArray(updateData.skills)) updateData.skills = dedupeCollection(updateData.skills);
    if (Array.isArray(updateData.education)) updateData.education = dedupeCollection(updateData.education);
    if (Array.isArray(updateData.certificates)) updateData.certificates = dedupeCollection(updateData.certificates);
    if (Array.isArray(updateData.achievements)) updateData.achievements = dedupeCollection(updateData.achievements);
    if (Array.isArray(updateData.messages)) updateData.messages = dedupeCollection(updateData.messages);

    // Atomic update/upsert into MongoDB
    let portfolio = await Portfolio.findOneAndUpdate(
      {},
      { $set: updateData },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    console.log('[MongoDB Atlas] Portfolio data updated and deduplicated successfully.');
    res.json({ success: true, data: portfolio });
  } catch (err) {
    console.error('Error in POST /api/portfolio:', err);
    res.status(500).json({ error: err.message || 'Failed to update portfolio data' });
  }
});

// 3. POST /api/upload - Upload file to Cloudinary (Supports multipart or base64)
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    let result;

    // A. If uploaded as multipart form-data via multer
    if (req.file && req.file.buffer) {
      const mime = req.file.mimetype || '';
      let resource_type = 'auto';
      if (mime.startsWith('image/')) resource_type = 'image';
      else if (mime.startsWith('video/')) resource_type = 'video';
      else if (mime.includes('pdf')) resource_type = 'raw';

      result = await uploadToCloudinary(req.file.buffer, {
        resource_type,
        public_id: `upload_${Date.now()}`
      });
    }
    // B. If uploaded as base64 string in JSON body
    else if (req.body.fileData || req.body.base64) {
      const base64Str = req.body.fileData || req.body.base64;
      let resource_type = req.body.resource_type || 'auto';
      result = await uploadBase64ToCloudinary(base64Str, { resource_type });
    } else {
      return res.status(400).json({ error: 'No file or base64 data provided in request' });
    }

    res.json({
      success: true,
      url: result.secure_url || result.url,
      public_id: result.public_id,
      format: result.format,
      bytes: result.bytes,
      resource_type: result.resource_type
    });
  } catch (err) {
    console.error('Error uploading to Cloudinary:', err);
    res.status(500).json({ error: err.message || 'Cloudinary upload failed' });
  }
});

// 4. POST /api/contact - Receive and save contact inquiries to MongoDB Atlas
router.post('/contact', async (req, res) => {
  try {
    const { senderName, senderEmail, subject, message } = req.body;
    if (!senderName || !senderEmail || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const newMessage = await ContactMessage.create({
      senderName,
      senderEmail,
      subject: subject || 'General Inquiry',
      message,
      ip: req.ip || req.headers['x-forwarded-for'] || ''
    });

    // Also append to portfolio document's messages array for Admin inbox view
    try {
      const portfolio = await Portfolio.findOne().sort({ updatedAt: -1 });
      if (portfolio) {
        if (!Array.isArray(portfolio.messages)) portfolio.messages = [];
        portfolio.messages.unshift({
          id: newMessage._id.toString(),
          senderName: newMessage.senderName,
          senderEmail: newMessage.senderEmail,
          subject: newMessage.subject,
          message: newMessage.message,
          createdAt: newMessage.createdAt
        });
        await portfolio.save();
      }
    } catch (innerErr) {
      console.warn('Could not mirror message to portfolio doc:', innerErr.message);
    }

    res.json({
      success: true,
      message: 'Inquiry received and saved to MongoDB Atlas.',
      id: newMessage._id
    });
  } catch (err) {
    console.error('Error in POST /api/contact:', err);
    res.status(500).json({ error: err.message || 'Failed to save message' });
  }
});

// 5. POST /api/auth/login - Admin authentication
router.post('/auth/login', async (req, res) => {
  try {
    const { passcode } = req.body;
    const portfolio = await Portfolio.findOne().sort({ updatedAt: -1 });
    const expected = portfolio?.adminConfig?.passcode || defaultPortfolioData.adminConfig?.passcode || 'prashant2026';

    if (passcode === expected) {
      return res.json({ success: true, authenticated: true });
    }
    return res.status(401).json({ success: false, error: 'Invalid admin passcode' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
