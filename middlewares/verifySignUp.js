const User = require('../model/user.model');

validateSignUpRequest = async (req, res, next) => {
	// here will be the whole logic to validate signup request

	// 1. validate name
	if (!req.body.name) {
		res.status(400).send({
			message: 'Failed! Name is not provided.'
		});
		return;
	}
	// 2. validate userName
	if (!req.body.userName) {
		res.status(400).send({
			message: 'Failed! username is not provided.'
		});
		return;
	}
	// 3. validation if the userName is already present
	let user = await User.findOne({ userName: req.body.userName });
	if (user !== null) {
		res.status(400).send({
			message: 'Failed! Username is already present. Try Different.'
		});
		return;
	}
	// Step 4: Validate the email
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression pattern for email validation
	const isValidEmail = emailRegex.test(req.body.email);
	if (!isValidEmail) {
		res.status(400).send({
			message: 'Failed! Invalid email'
		});
		return;
	}

	// 5. validate email if it is present or not
	let email = await User.findOne({ email: req.body.email });
	if (email !== null) {
		res.status(400).send({
			message: 'Failed! Email is already present. Try Different.'
		});
		return;
	}

	// 6. validate phone number
	let phone = await User.findOne({ phone: req.body.phone });
	if (phone !== null) {
		res.status(400).send({
			message: 'Failed! Phone Number is already present. Try Different.'
		});
		return;
	}
	// 7.  Move to the next middleware/route controller
	next();
};

const verifySignUp = {
	validateSignUpRequest: validateSignUpRequest
};

module.exports = verifySignUp;
