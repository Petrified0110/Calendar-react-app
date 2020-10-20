const {Router} = require("express");
const eventController = require("../controllers/eventController");
const authController = require("../controllers/authController");

const router = new Router();

router.route('/').get(authController.protect, eventController.getEvents).post( authController.protect, eventController.addEvent);
router.route('/:id').get(authController.protect, eventController.getEvent).patch(eventController.updateEvent).delete(authController.protect, eventController.deleteEvent);

module.exports = router;