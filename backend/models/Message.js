import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    senderName: {
      type: String,
      required: true,
      trim: true
    },
    senderEmail: {
      type: String,
      required: true,
      trim: true
    },
    subject: {
      type: String,
      default: 'General Inquiry'
    },
    message: {
      type: String,
      required: true
    },
    read: {
      type: Boolean,
      default: false
    },
    ip: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true,
    collection: 'contact_messages'
  }
);

export const ContactMessage = mongoose.models.ContactMessage || mongoose.model('ContactMessage', MessageSchema);
