const authController = require('../controller/auth.controllers');
const { verifySignup } = require('../middlewares');

module.exports = function(app) {
	app.post('/intern/api/v1/auth/signup', [ verifySignup.validateSignUpRequest ], authController.signUp);
	app.post('/intern/api/v1/auth/signin', authController.signIn);
};