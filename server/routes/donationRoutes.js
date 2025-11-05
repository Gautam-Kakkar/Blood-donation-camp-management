import express from 'express';
import {
  recordQuickDonation,
  getAllDonations,
} from '../controllers/donationController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/quick', protect, authorize('admin', 'organizer'), recordQuickDonation);
router.get('/', protect, getAllDonations);

export default router;
