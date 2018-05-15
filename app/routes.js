const express = require('express');
const requireDir = require('require-dir');

const routes = express.Router();

const authMiddleware = require('./middlewares/auth');

const controllers = requireDir('./controllers');

/**
 * Auth
 */
routes.post('/signup', controllers.authController.signup);
routes.post('/signin', controllers.authController.signin);

/**
 * =============
 * Auth routes
 */
routes.use(authMiddleware);

/**
 * =============
 * Users
 */
routes.get('/me', controllers.userController.me);
routes.get('/feed', controllers.userController.feed);
routes.put('/users', controllers.userController.update);

/**
 * =============
 * Follows
 */
routes.post('/follows/:id', controllers.followController.create);
routes.delete('/unfollows/:id', controllers.followController.destroy);


/**
 * =============
 * Tweets
 */
routes.post('/tweets', controllers.tweetController.create);
routes.delete('/tweets/:id', controllers.tweetController.destroy);

/**
 * =============
 * Likes
 */
routes.post('/like/:id', controllers.likeController.toggle);


module.exports = routes;
