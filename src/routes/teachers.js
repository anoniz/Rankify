const router = require('express').Router();
const {teacherController } = require('../controllers/index');

router.post('/api/teacher',teacherController.createTeacher);

router.get('/api/teacher/:id',teacherController.getTeacherById);
router.get('/api/teachers',teacherController.getAllTeachers);


module.exports = router;


