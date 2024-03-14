const router = require('express').Router();

const { userController } = require('../controllers/index');

router.post('/api/user',userController.createUser);

router.get('/api/user/:id',userController.getUserById);
router.get('/api/users',userController.getAllUsers);



module.exports = router;


