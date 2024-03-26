const express = require('express');
const cors = require('cors');
const sequelize = require('./db/sequelize');
const app = express();
const port = process.env.PORT || 3000
const { teacherRouter, userRouter, ratingRouter, facultyRouter, 
        departmentRouter, subjectRouter, reviewRouter } = require('./routes/index');
app.use(cors());
app.use(express.json());

app.get('/',(req,res) => {
    res.json({message: "development started"});
})
// Middleware to log the request endpoint
app.use((req, res, next) => {
  if (!req.url.startsWith('/socket.io/')) {
    console.log(`Request to: ${req.method} ${req.url}`);
  }
  next();
});

// routes 
app.use('/',teacherRouter);
app.use('/',userRouter);
app.use('/',ratingRouter);
app.use('/',facultyRouter);
app.use('/',departmentRouter);
app.use('/',subjectRouter);
app.use('/',reviewRouter)

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
