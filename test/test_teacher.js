const {Teacher } = require('../src/models/index');
const {v4: uuid} = require('uuid');

const teacher = {
    id:uuid(),
    name:"asim munir",
    DepartmentId: "6b10b0aa-b099-4507-8299-79f41e85ba31",
    designation: "abc",
    picture:"abc",
    original_profile: "dinod",
    qualification:"ma",
    specialization: "ok"
}
console.log(teacher);
const createTeacher = async() => {
    try {
     

       const newTeacher = await Teacher.create(teacher);
       return {teacher:newTeacher};
    } catch(err) {
       console.log(err);
       return {error:{message:"something went wrong in createTeacher",code:500}};
    }
}

module.exports = {
    createTeacher
};