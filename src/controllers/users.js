const { userService } = require('../services/index');


const createUser  = async (req,res) => {
    try {
        const user = {...req.body.user};
        const newUser = await userService.createUser(user);
        if(newUser.error) {
            return res.status(newUser.error.code).send(newUser.error.message);
        }
        return res.status(201).send(newUser);
    } catch(err) {
        console.log(err);
        return res.status(500).send({"message":"something went wrong in userController create user"});
    }
}

const getUserById = async(req,res) => {
    try {
      const user = await userService.getUser(req.params.email);
      if(!user) {
        return res.status(404).send({"user":user,"message":"user not found"});
      }
      if(user.error) {
         return res.status(user.error.code).send(user.error.message);
      }
      return res.send({"user":user,"message":"user found sucess"});
    } catch(err) {
        console.log(err);
        return res.status(500).send({"message":"something went wrong in UserController findByID"});
    }
}

const getAllUsers = async(req,res) => {
    try {
      const user = await userService.getAllUsers();
      return res.status(200).send({"user":user,"message":"foun all"});
    } catch(err) {
        console.log(err);
        return res.status(500).send({"message":"something went wrong in UserController findAll"});
    }
}


module.exports = {
    createUser,
    getUserById,
    getAllUsers
}