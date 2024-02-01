const constants = require('../utils/constants');
const User = require('../model/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config');

// Step 1: Sign up a user
exports.signUp = async (req, res) => {
	try {
		// 1- Create a new user in the database
		const createUser = await User.create({
			name: req.body.name,
			userName: req.body.userName,
			email: req.body.email,
			phone: req.body.phone,
			password: bcrypt.hashSync(req.body.password, 13)
		});

		// 2- Prepare response data
		const postResponse = {
			name: createUser.name,
			userName: createUser.userName,
			email: createUser.email,
			phone: createUser.phone,
			userType: createUser.userType,
			createdAt: createUser.createdAt,
			updatedAt: createUser.updatedAt
		};

		// 3- Send the successful response
		return res.status(201).send({
			userDetails: postResponse,
			message: 'SignUp Successfully'
		});
	} catch (e) {
		console.log('Error occurred while creating the user');
		// Step 6: Send an error response if an error occurred
		return res.status(500).send({
			message: 'Some internal error occurred while creating the user'
		});
	}
};

// Step 7: Sign in a user
exports.signIn = async (req, res) => {
	try {
		// 1-  Find the user by userName in the database
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			// 2-  Send an error response if the user doesn't exist
			res.status(400).send({
				message: "Failed! User doesn't exist"
			});
			return;
		}

		// 3- Check if password matches
		let isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

		if (!isPasswordValid) {
			//4- Send an error response if the password is invalid
			res.status(401).send({
				message: 'Invalid Password'
			});
			return;
		}

		// token data
		let tokenData = {
			id: user._id,
			email: user.email,
			name: user.name,
			userType: user.userType,
		}
		// 5- Generate an access token
		const token = jwt.sign(tokenData, authConfig.secretKey, {
			expiresIn: 86400 // 24 hours
		});
		let postData = {
			name: user.name,
			userName: user.userName,
			email: user.email,
			phone: user.phone,
			userType: user.userType,
		}
		// setting access token in headers
		// res.setHeader('accessToken', token)

		// setting the token in the cookies
        res.cookie('accessToken', token, {
            httpOnly: true,
            maxAge: 86400 * 1000 // 24 hours in milliseconds
        });
		// 6- Prepare response data
		res.status(200).send({ data: postData, message: 'Login Successful' });

	} catch (error) {
		return res.status(500).send({ message: 'Login failed due to Internal server issues' })
	}
};
