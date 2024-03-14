const { Subject_Rating } = require('../models/index');

const getSubject_Rating = async (subjectRatingId) => {
    try {
        const subjectRating = await Subject_Rating.findByPk(subjectRatingId);
        return { subjectRating: subjectRating };
    } catch (err) {
        console.log(err);
        return { error: { message: "something went wrong in getSubject_Rating", code: 500 } };
    }
}

const createSubject_Rating = async (newSubjectRating) => {
    try {
        const createdSubjectRating = await Subject_Rating.create(newSubjectRating);
        return { subjectRating: createdSubjectRating };
    } catch (err) {
        console.log(err);
        return { error: { message: "something went wrong in createSubject_Rating", code: 500 } };
    }
}

const deleteSubject_Rating = async (subjectRatingId) => {
    try {
        const deletedRows = await Subject_Rating.destroy({ where: { id: subjectRatingId } });
        return { rowsAffected: deletedRows };
    } catch (err) {
        console.log(err);
        return { error: { message: "something went wrong in deleteSubject_Rating", code: 500 } };
    }
}

const updateSubject_Rating = async (updatedSubjectRating) => {
    try {
        
            const [updatedRowsCount, updatedRows] = await Subject_Rating.update(updatedSubjectRating, { where: { id: updatedSubjectRating.id }, returning: true });
            return { updatedSubjectRating: updatedRows[0] };
        } catch (err) {
            console.log(err);
            return { error: { message: "something went wrong in updateSubject_Rating", code: 500 } };
        }
}
    
const getAllSubjectRatingsOfTeacher = async(teacherId) => {
    try {
       const teacher_ratings = await Subject_Rating.findAll({where:{TeacherId:teacherId}});
       return {teacher_ratings:teacher_ratings};
    }  catch (err) {
        console.log(err);
        return { error: { message: "something went wrong in updateSubject_Rating", code: 500 } };
    }
}

const getAllSubjectRatingsOfSubject = async(subjectId) => {
    try {
        const subject_ratings = await Subject_Rating.findAll({where:{SubjectId:subjectId}});
        return {subject_ratings:subject_ratings};
     }  catch (err) {
         console.log(err);
         return { error: { message: "something went wrong in updateSubject_Rating", code: 500 } };
     }
}



module.exports = {
    getSubject_Rating,
    createSubject_Rating,
    deleteSubject_Rating,
    updateSubject_Rating,
    getAllSubjectRatingsOfSubject,
    getAllSubjectRatingsOfTeacher
}