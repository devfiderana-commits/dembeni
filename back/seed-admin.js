const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import User model
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide a username'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

async function seedAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/user-management');

    console.log('Connected to MongoDB');

    // Check if admin exists
    const existingAdmin = await User.findOne({ email: 'admin@dembeni.fr' });

    if (existingAdmin) {
      console.log('Admin account already exists. Updating password...');
      existingAdmin.password = 'admin123';
      await existingAdmin.save();
      console.log('✅ Admin password updated successfully');
      console.log(`Email: admin@dembeni.fr`);
      console.log(`Password: admin123`);
    } else {
      // Create new admin account
      const admin = new User({
        username: 'Admin Dembeni',
        email: 'admin@dembeni.fr',
        password: 'admin123',
        role: 'admin',
      });

      await admin.save();
      console.log('✅ Admin account created successfully');
      console.log(`Email: admin@dembeni.fr`);
      console.log(`Password: admin123`);
    }

    await mongoose.disconnect();
    console.log('\nDatabase connection closed');
  } catch (error) {
    console.error('Error seeding admin account:', error.message);
    process.exit(1);
  }
}

seedAdmin();
