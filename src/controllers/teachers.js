const { teacherService,departmentService,facultyService } = require('../services/index');
const { v4:uuid } = require('uuid');

// CRUD
// 1. CREATE

// Array []
// ​
// 0: Object { profileUrl: "https://abc.com/amir", name: "muhammad amir", email: "amir@iiu.edu.pk", … }
// ​​
// department: "Department of Computer Science"
// ​​
// designation: "Professor"
// ​​
// email: "amir@iiu.edu.pk"
// ​​
// faculty: "Faculty of Computing and Information Technology"
// ​​
// name: "muhammad amir"
// ​​
// profileUrl: "https://abc.com/amir"
// ​​
// qualification: "PhD"
// ​​
// specialization: "Image proccessing"
// ​​
// <prototype>: Object { … }
// ​
// length: 1
// ​
// <prototype>: Array []

const createTeacher = async(req,res) => {
    try {   // req.body will have teacher obj and anything else
        const teacher = {...req.body.teacher};
         console.log(req.body)
         // validate email
         const emailRegex = /^[a-zA-Z0-9._%+-]+@iiu\.edu\.pk$/;
         if(!emailRegex.test(teacher.email)) {
             return res.status(400).send({"message":"Invalid IIUI Email from server"});
         }
         console.log(req.body)
         const fetchTeacher = await teacherService.getTeacher(teacher.email);
         if(fetchTeacher.error) { 
              return res.status(fetchTeacher.error.code).send(fetchTeacher.error.message);
         }
         if(fetchTeacher.teacher) {
          return res.status(409).send({"message":"Teacher already exists with this email"});
         }
         // now teacher is not in db so we can create it.
         // check if given faculty and department exists
         // else create them on the fly
         let fetchFaculty = await facultyService.getFaculty(teacher.faculty);
         if(!fetchFaculty.faculty) {
         
            fetchFaculty = {id:uuid(),name:teacher.faculty};
            console.log(fetchFaculty, "..pp");
            fetchFaculty = await facultyService.createFaculty(fetchFaculty);
         }
         // now faculty is created, now create the department
         let fetchDepartment = await departmentService.getDepartment(teacher.department);
         if(!fetchDepartment.department) {
           fetchDepartment = {id:uuid(),name:teacher.department,FacultyId: fetchFaculty.faculty.id};
         
           fetchDepartment = await departmentService.createDepartment(fetchDepartment);
         }
         // if i am here then dept exists or its created.
         // so we can proceed to create the teacher
         // modifying teacher object and adding IDs
         delete teacher.faculty;
         delete teacher.department;
         //
          console.log(fetchFaculty.faculty);
          console.log(fetchDepartment.department);
         //
    
          teacher.FacultyId = fetchFaculty.faculty.id;
          teacher.DepartmentId = fetchDepartment.department.id;
         
         const newTeacher = await teacherService.createTeacher(teacher);
         if(newTeacher.error) {
           return res.status(newTeacher.error.code).send(newTeacher.error.message);
         }
         // everything went good then return the teacher back
         return res.status(201).send({"teacher":newTeacher, "message":"teacher added successfully"});
      
    } catch(err) {
        console.log(err);
        return res.status(500).send({"message":"something went wrong in teacherController create teacher"});
    }
   
}

const getTeacherById = async(req,res) => {
    try {
      const teacher = await teacherService.getTeacher(req.params.email);
      if(!teacher) {
        return res.status(404).send({"teacher":teacher,"message":"teacher not found"});
      }
      if(teacher.error) {
         return res.status(teacher.error.code).send(teacher.error.message);
      }
      return res.send({"teacher":teacher,"message":"teacher found sucess"});
    } catch(err) {
        console.log(err);
        return res.status(500).send({"message":"something went wrong in teacherController findByID"});
    }
}

const getAllTeachers = async(req,res) => {
    try {
      const teachers = await teacherService.getAllTeachers();
      return res.status(200).send({"teachers":teachers,"message":"foun all"});
    } catch(err) {
        console.log(err);
        return res.status(500).send({"message":"something went wrong in teacherController findAll"});
    }
}

module.exports = {
    createTeacher,
    getTeacherById,
    getAllTeachers,
}