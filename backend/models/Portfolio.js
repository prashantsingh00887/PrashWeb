import mongoose from 'mongoose';

const PortfolioSchema = new mongoose.Schema(
  {
    profile: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      default: {}
    },
    education: {
      type: Array,
      default: []
    },
    skills: {
      type: Array,
      default: []
    },
    projects: {
      type: Array,
      default: []
    },
    certificates: {
      type: Array,
      default: []
    },
    achievements: {
      type: Array,
      default: []
    },
    adminConfig: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    messages: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true,
    strict: false,
    collection: 'portfolio_data'
  }
);

export const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);
