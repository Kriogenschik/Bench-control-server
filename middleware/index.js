const admin = require('firebase-admin');

const serviceAccount = require('./credentials.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

class Middleware {
	async decodeToken(req, res, next) {
		const token = req.headers.authorization.split(' ')[1];
    // console.log(token);
		try {
			// const decodeValue = await admin.auth().verifyIdToken(token);
      const decodeValue = true;
			if (decodeValue) {
				req.user = decodeValue;
				return next();
			}
			return res.json({ message: 'Un authorize' });
		} catch (e) {
			return res.json({ message: 'Internal Error' });
		}
	}
}

module.exports = new Middleware();