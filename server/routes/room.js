const router = require('express').Router();
const roomController = require('../controllers/room');

//get rooms, Limit only for admin
router.post('/getRooms', roomController.getRooms);

//get users, Limit only for admin
router.post('/addRoom', roomController.addRoom);

module.exports = router;
