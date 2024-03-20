const router = require('express').Router();
const {teacherController } = require('../controllers/index');

router.post('/api/teacher',teacherController.createTeacher);

router.get('/api/teacher/:id',teacherController.getTeacherById); // get by id/email
router.get('/api/teachers/faculty/:facultyId?',teacherController.getAllTeachers); // get teacher by faculty (if provided)
router.get('/api/teachers/department/:departmentId?',teacherController.getAllTeachersByDept) // get teacher by dept
router.get('/api/teachers/top10',teacherController.getTop10Teachers);



module.exports = router;

// all cruds for teacher. but currently i need to focus on Read only 
// so only get requests.. 


