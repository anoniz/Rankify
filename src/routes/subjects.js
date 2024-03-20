const router = require('express').Router();
const { subjectController } = require('../controllers/index');
//all posts 

//all gets

router.get('/api/subjects/:id',subjectController.getAllSubjectsByDept);


module.exports = router; 