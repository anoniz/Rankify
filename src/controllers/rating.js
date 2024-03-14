// calculate subject rating
const calculateSubjectRating = (rating) => {
    
    let Weight_Punctuality = 7;  
    let Weight_Subject_Command = 10;
    let Weight_Teaching_Method = 10;
    let Weight_Helping_Attitude = 8;
    let Weight_Lab_Interaction = 11;
    let Weight_Is_Role_Model = 15;


    let Total_Weights = Weight_Punctuality + 
    Weight_Subject_Command + 
    Weight_Teaching_Method + 
    Weight_Helping_Attitude;

    let Overall_Rating = (rating.punctuality * Weight_Punctuality +
    rating.subject_command * Weight_Subject_Command + 
    rating.teaching_method * Weight_Teaching_Method + 
    rating.helping_attitude * Weight_Helping_Attitude +
    (rating.is_role_model ? 10 * Weight_Is_Role_Model: 0) +
    (rating.lab_interaction || 0 ) * Weight_Lab_Interaction) / Total_Weights;
    
    return parseInt(Overall_Rating.toFixed());
}

// punctuality, subject_command , teaching_method , helping_attitude , 
// lab_interaction, is_role_model, // subject_Rating id, teacher id, userid ,
// these properties are needed to create a review
const {v4: uuid } = require('uuid');
const { ratingService, subjectRatingService, reviewService } = require('../services/index');

// lets create a review


const createRating = async(req,res) => {
    // req.body should have rating, user,teacher,subject
    try {

    const rating = {
        ...req.body.rating,   // this will contain above things
        UserId: req.user.id,  // req object will contain user after validation,
        TeacherId: req.body.teacher.id
    } // we also need SubjectRatingId to create review so lets create one.

    // create a subjectRating
    let subject_Rating = {
        id:uuid(),
        TeacherId: req.body.teacher.id,
        SubjectId: req.body.subject.id,
        rating: calculateSubjectRating(rating) 
    };
    const subjectRating = await subjectRatingService.createSubject_Rating(subject_Rating);
    if(subjectRating.error) {
        return res.status(subjectRating.error.code).send(subjectRating.error.message);
    }
    // now subject rating is created so we can create the rating;
    rating.Subject_RatingId = subjectRating.subjectRating.id;
    const newRating = await ratingService.createRating(rating);
    if(newRating.error) {
        return res.status(newRating.error.code).send(newRating.error.message);
    }
    return res.status(201).send({"rating":newRating, "message":"rating created successfully"});


    } catch(err) {
        console.log(err);
        return res.status(500).send({"message":"something went wrong in ratingController, create rating"});
    
    }
   
}

const getAllRatingsOfTeacher = async(req,res) => {
    // first we need subject ratings, becuase ratings are linked to subject ratings
    // and not directly to teacher
    try {
        const teacherId = req.params.id;
        const subject_ratings = await subjectRatingService.getAllSubjectRatingsOfTeacher(teacherId);

        if(subject_ratings.error) {
            return res.status(subject_ratings.error.code).send(subject_ratings.error.message);
        }

        // now we can get all ratings of these subject ratings
        const allRatings = await Promise.all((subject_ratings.teacher_ratings).
        map(async(subject_rating ) => {
           const ratings = await ratingService.getAllRatingsOfTeacher(subject_rating.id);
           return {subject_rating, allRatings:ratings};
        }));
        
        return res.send({"allRatings":allRatings});

    } catch(err) {
        console.log(err);
        return res.status(500).send({"message":"something went wrong in ratingController, getAllRatingsOfTeacher"});
    
    }

}


module.exports = {
    createRating,
    getAllRatingsOfTeacher
}
