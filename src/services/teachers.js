// CRUD

const { Teacher } = require('../models/index');

const getTeacher = async (email) => {
     try {
        const teacher = await Teacher.findByPk(email);
        return {teacher:teacher};
        
     } catch(err) {
          console.log(err);
          return {error:{message:"something went wrong in getTeacher",code:500}}
     }
}
// teache obj has , email,name,designation, picture, orignalprofile, dept,faculty

const createTeacher = async(teacher) => {
     try {
        const newTeacher = await Teacher.create(teacher);
        return {teacher:newTeacher};
     } catch(err) {
        console.log(err);
        return {error:{message:"something went wrong in createTeacher",code:500}};
     }
 }
 
 const deleteTeacher = async(id) => {
   try {
     const teacher = await Teacher.destroy({where: {id:id}});
     return {teacher:teacher};
  } catch(err) {
     console.log(err);
     return {error:{message:"something went wrong in deleteTeacher",code:500}};
 } 
 }
 
 const updateTeacher = async(updates) => {
   try {
     const newTeacher = await Teacher.update(updates,{where:{id:updates.id}});
     return {updatedTeacher: newTeacher[1]}; 
   } catch(err) {
     console.log(err);
     return {error:{message:"something went wrong in deleteTeacher",code:500}};
   }
 
 }

const getAllTeachers = async() => {
  try {
    const teachers = await Teacher.findAll();
    return {teachers:teachers};
  } catch(err) {
    console.log(err);
    return {error:{message:"something went wrong in deleteTeacher",code:500}};
  }

} 
 
 module.exports = {
   getTeacher,
   createTeacher,
   deleteTeacher,
   updateTeacher,
   getAllTeachers
 }

