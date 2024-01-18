const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true // Name of the user
	},
	userName: {
		type: String,
		required: true,
		unique: true // Unique identifier for the user
	},
	email: {
		type: String,
		required: true,
		lowercase: true,
		unique: true // User's email address (case-insensitive, unique)
	},
	phone: {
		type: Number,
		required: true,
		maxLength: 10
	},
	userType: {
		type: String,
		required: true,
		default: 'USER'
	},
	password: {
		type: String,
		required: true,
		minLength: 6 // User's password (minimum length: 6 characters)
	},
	createdAt: {
		type: Date,
		immutable: true,
		default: () => {
			return Date.now();
		} // Date when the user was created (immutable)
	},
	updatedAt: {
		type: Date,
		default: () => {
			return Date.now();
		} // Date when the user was last updated
	}
});

//Create the User model using the user schema
module.exports = mongoose.model('User', userSchema);
