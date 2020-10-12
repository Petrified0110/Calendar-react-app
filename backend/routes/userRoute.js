const {Router} = require("express");
const userController = require("../controllers/userController");


const router = new Router();

router.route('/').get(userController.getUsers).post(userController.addUser);
router.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

module.exports = router;