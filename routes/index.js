const express = require('express')
const router = express.Router()

const { catchErrors } = require('../helpers/errorHandlers')
const { getAuthorize } = require('../middlewares/authMiddleware')
const userEndpoint = require('../apis/userEndpoint')
const friendEndpoint = require('../apis/friendEndpoint')
const postEndpoint = require('../apis/postEndpoint')
const commentEndpoint = require('../apis/commentEndpoint')

// Unprotected routes
router.get('/', (req, res) => res.json({ msg: process.env.APP_NAME }))
router.post('/api/authenticate', catchErrors(userEndpoint.postAuthenticate))
router.post('/api/sign-up', catchErrors(userEndpoint.postSignUp))
router.get('/api/confirm-sign-up', catchErrors(userEndpoint.getConfirmSignUp))
router.post('/api/forgot-password', catchErrors(userEndpoint.postForgotPassword))
router.get('/api/confirm-reset-password', catchErrors(userEndpoint.getConfirmResetPassword))

// Middlewares
router.use(getAuthorize)

// Protected routes
router.get('/api/users', catchErrors(userEndpoint.getUsers))
router.get('/api/get-user-current', catchErrors(userEndpoint.getUserCurrent))
router.get('/api/test-axios', catchErrors(userEndpoint.getTestAxios))

router.get('/api/get-user-profile', catchErrors(userEndpoint.findUserProfile))
router.get('/api/add-friend/:userTwoId', catchErrors(friendEndpoint.addFriend))
router.post('/api/add-post', catchErrors(postEndpoint.addPost))
router.put('/api/like-post', catchErrors(postEndpoint.likePost))
router.post('/api/add-comment', catchErrors(commentEndpoint.addComment))

module.exports = router
