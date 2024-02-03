// importing mongoose for establishing connection with database
const mongoose = require('mongoose');
const cors = require('cors');
// the below is for all configuration
const serverConfig = require('./configs/server.config');
const dbConfig = require('./configs/db.config');
const cookieParser = require('cookie-parser')

// the below is for bcrypt js i.e., used to encrypt and decrypt text (ex. password)
const bcrypt = require('bcryptjs');

// express settings
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(cors({})); // using cors to connect
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// importing User model below
const User = require('./model/user.model');
// the all below code is for creating db and connecting
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;

db.on('error', () => {
	console.log(`Error while connecting to Database with ${dbConfig.DB_NAME}!`);
});

db.once('open', () => {
	console.log(`Connected to Database Successfully with ${dbConfig.DB_NAME}!`);
	init();
});

// for admin creation
async function init() {
	let user = await User.findOne({ userName: 'ADMIN' });
	if (user) {
		console.log(`Admin user already Present!`);
		return;
	}
	try {
		// creating the user
		user = await User.create({
			name: 'Jayesh Chauhan',
			userName: 'ADMIN',
			email: 'officialjitandrachauhan@gmail.com',
			phone: 8273798510,
			userType: 'ADMIN',
			password: await bcrypt.hashSync('Welcome@1234', 15)
		});
		console.log(user);
	} catch (error) {
		console.log(`Error while creating Admin User and the error is : ${error}`);
	}
}

// importing routes
require('./routes/auth.routes')(app);
require('./routes/task.routes')(app);
// the below code is for initializing server
app.listen(serverConfig.PORT, () => {
	console.log(`Server is up and running on port : ${serverConfig.PORT}!`);
});
