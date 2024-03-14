const { v4:uuid } = require('uuid');
const { subjectService } = require('../services/index');

const createSubject = async(req,res) => {
    try {   // req.body will have subject obj and anything else
        const subject = {...req.body.subject, id:uuid()};
        const newSubject = await subjectService.createSubject(subject);
        if(newSubject.error) {
            return res.status(newSubject.error.code).send(newSubject.error.message);
        }        
        return res.status(201).send({"subject":newSubject, "message":"subject added successfully"});
       
    } catch(err) {
        console.log(err);
        return res.status(500).send({"message":"something went wrong in subjectController create subject"});
    
    }
}

const getAllSubjects = async(req,res) => {
    // all subjects of particular department
    
}
