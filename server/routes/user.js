const router = require('express').Router();
const userController = require('../controllers/user');

//Login
router.post('/login', userController.login);

//add new user
router.post('/register', userController.register);

//delete user, Limit only for admin
router.post('/deleteUser', userController.deleteUser);

//get users, Limit only for admin
router.post('/getUsers', userController.getUsers);

router.post('/getUserByToken', userController.getUserByToken);

module.exports = router;
