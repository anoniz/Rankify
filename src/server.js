const express = require('express');
const cors = require('cors');
const sequelize = require('./db/sequelize');
const app = express();
const port = process.env.PORT || 3000
const { teacherRouter, userRouter, ratingRouter, facultyRouter, departmentRouter, subjectRouter } = require('./routes/index');
app.use(cors());
app.use(express.json());

app.get('/',(req,res) => {
    res.json({message: "development started"});
})

// routes 
app.use('/',teacherRouter);
app.use('/',userRouter);
app.use('/',ratingRouter);
app.use('/',facultyRouter);
app.use('/',departmentRouter);
app.use('/',subjectRouter)

// sequelize.sync({force:true})

sequelize.sync({alter:true}).then(connection => {
  console.log('Connected To Database');
  app.listen(port, () => {
     console.log(`Server Started On Port ${port}`);
  });

}).catch(err => {
  console.log('Unable To Connect To Database ,Cant Start Server');
  console.log(err);
});
