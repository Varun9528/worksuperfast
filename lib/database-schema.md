# WorkSuperFast Database Schema

## Database: MongoDB

### Collections:

## 1. users
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed with bcrypt),
  phone: String,
  role: String, // 'user', 'contractor', 'admin'
  isVerified: Boolean,
  address: String,
  createdAt: Date,
  updatedAt: Date,
  referralCode: String,
  referredBy: ObjectId, // Reference to user who referred
  earnings: Number,
  totalReferrals: Number,
  profileImage: String
}
```

## 2. contractors
```javascript
{
  _id: ObjectId,
  userId: ObjectId, // Reference to users collection
  aadharNumber: String,
  categories: [String], // Array of categories
  experience: String,
  idProof: String, // File path
  isApproved: Boolean,
  approvedBy: ObjectId, // Reference to admin user
  approvedAt: Date,
  rating: Number,
  totalJobs: Number,
  completedJobs: Number,
  earnings: Number,
  availabilityStatus: String, // 'available', 'busy', 'offline'
  createdAt: Date,
  updatedAt: Date
}
```

## 3. jobs
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  category: String,
  payment: Number,
  paymentType: String, // 'fixed', 'visit'
  location: {
    state: String,
    city: String,
    pincode: String,
    coordinates: {
      lat: Number,
      lng: Number
    },
    address: String
  },
  postedBy: ObjectId, // Reference to users collection
  contactInfo: {
    name: String,
    phone: String,
    email: String
  },
  photo: String, // File path
  status: String, // 'pending', 'approved', 'rejected', 'completed', 'cancelled'
  approvedBy: ObjectId, // Reference to admin user
  approvedAt: Date,
  assignedTo: ObjectId, // Reference to contractor
  assignedAt: Date,
  completedAt: Date,
  platformFee: Number, // 3% of payment
  actualPayment: Number, // payment - platformFee
  createdAt: Date,
  updatedAt: Date
}
```

## 4. job_applications
```javascript
{
  _id: ObjectId,
  jobId: ObjectId, // Reference to jobs collection
  contractorId: ObjectId, // Reference to contractors collection
  applicationMessage: String,
  quotedPrice: Number,
  status: String, // 'pending', 'accepted', 'rejected'
  appliedAt: Date,
  respondedAt: Date
}
```

## 5. transactions
```javascript
{
  _id: ObjectId,
  jobId: ObjectId, // Reference to jobs collection
  payerId: ObjectId, // Reference to users collection (job poster)
  receiverId: ObjectId, // Reference to users collection (contractor)
  amount: Number,
  platformFee: Number,
  actualAmount: Number, // amount - platformFee
  transactionType: String, // 'payment', 'refund', 'referral_bonus'
  paymentMethod: String,
  paymentStatus: String, // 'pending', 'completed', 'failed', 'refunded'
  transactionId: String, // Payment gateway transaction ID
  createdAt: Date,
  updatedAt: Date
}
```

## 6. reviews
```javascript
{
  _id: ObjectId,
  jobId: ObjectId, // Reference to jobs collection
  reviewerId: ObjectId, // Reference to users collection (job poster)
  revieweeId: ObjectId, // Reference to users collection (contractor)
  rating: Number, // 1-5 stars
  comment: String,
  reviewType: String, // 'job_review', 'contractor_review'
  createdAt: Date,
  updatedAt: Date
}
```

## 7. complaints
```javascript
{
  _id: ObjectId,
  jobId: ObjectId, // Reference to jobs collection
  complainantId: ObjectId, // Reference to users collection
  respondentId: ObjectId, // Reference to users collection
  complaintType: String, // 'quality', 'payment', 'behavior', 'fraud'
  title: String,
  description: String,
  evidence: [String], // Array of file paths
  status: String, // 'pending', 'investigating', 'resolved', 'dismissed'
  resolution: String,
  resolvedBy: ObjectId, // Reference to admin user
  resolvedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 8. referrals
```javascript
{
  _id: ObjectId,
  referrerId: ObjectId, // Reference to users collection
  referredId: ObjectId, // Reference to users collection
  referralCode: String,
  status: String, // 'pending', 'verified', 'rewarded'
  rewardAmount: Number,
  rewardedAt: Date,
  verifiedJobId: ObjectId, // Reference to jobs collection
  createdAt: Date,
  updatedAt: Date
}
```

## 9. notifications
```javascript
{
  _id: ObjectId,
  userId: ObjectId, // Reference to users collection
  title: String,
  message: String,
  type: String, // 'job_posted', 'job_assigned', 'payment_received', 'review_received'
  relatedId: ObjectId, // Reference to related document (job, transaction, etc.)
  isRead: Boolean,
  createdAt: Date
}
```

## 10. admin_logs
```javascript
{
  _id: ObjectId,
  adminId: ObjectId, // Reference to admin user
  action: String, // 'approve_job', 'reject_job', 'approve_contractor', 'resolve_complaint'
  targetType: String, // 'job', 'contractor', 'complaint'
  targetId: ObjectId, // Reference to target document
  details: String,
  createdAt: Date
}
```

## 11. categories
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  icon: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 12. settings
```javascript
{
  _id: ObjectId,
  key: String, // 'platform_fee_percentage', 'referral_bonus_amount', 'min_withdrawal_amount'
  value: String,
  type: String, // 'number', 'string', 'boolean'
  description: String,
  updatedBy: ObjectId, // Reference to admin user
  updatedAt: Date
}
```

## Environment Variables (.env):

```bash
# Database
MONGODB_URI=mongodb://localhost:27017/worksuperfast

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# File Upload
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5MB

# Payment Gateway
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Google Maps
GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# WhatsApp
WHATSAPP_API_URL=https://api.whatsapp.com
WHATSAPP_API_TOKEN=your_whatsapp_token

# App Settings
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
```

This schema provides a comprehensive foundation for the WorkSuperFast application with proper relationships, indexing, and security considerations.