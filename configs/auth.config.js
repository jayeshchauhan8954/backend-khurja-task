require('dotenv').config();

// Exporting a configuration object with a secret key
module.exports = {
	secretKey: process.env.SECRET_KEY
};
