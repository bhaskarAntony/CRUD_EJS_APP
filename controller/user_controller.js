    //this is mvc architecture
    //controllers

    const User = require('../model/user_database_model')

const { render } = require("ejs")

    //view the index.ejs
    //we can create any type of function here but it must be callback function
    let index = (req, res) =>{
        return res.render('index')

    }

    //create.ejs
    const create = (req, res) =>{
        return res.render('create')
    }

    //update.ejs
    function edit(req, res){
        return res.render('update')
    }



    //creating api routes
    //add new user //(post) request
    let addUser = async (req, res) =>{
        try {
            //check if the email is already exist or not
            let existEmail = await User.findOne({email: req.body.email})
            if(existEmail)
                return res.status(400).json({msg:`${req.body.email} already`})//400 is abad request

             //check if the mobile number is already exist or not
             let existMobile = await User.findOne({email: req.body.mobile})
             if(existMobile)
                 return res.status(400).json({msg:`${req.body.mobile} already`})//400 is abad request
            //create new user 
            let newUser = await User.create(req.body)

            res.status(200).json({msg: "new user created successfully", user:newUser})
        } catch (error) {
                return res.status(500).json({msg:error.message}) //500 status is a internal server error
        }
    }

    //read all users //(get) request
    let allUser = async (req, res) =>{
        try {
            let users = await User.find({})

            res.status(200).json({length:users.length, users})
        } catch (error) {
                return res.status(500).json({msg:error.message}) //500 status is a internal server error
        }
    }

     //read single user //(get) request
     let singleUser = async (req, res) =>{
        try {
            let id = req.params.id

            let single = await User.findById({_id:id})
            if(!single)
                return res.status(404).json({msg:   `requested id is not found`})
            res.status(200).json({user:single})
        } catch (error) {
                return res.status(500).json({msg:error.message}) //500 status is a internal server error
        }
    }

     //delete user //(delete) request
     let deleteUser = async (req, res) =>{
        try {
            let id = req.params.id

            let ExistUser = await User.findById({_id:id})
            if(!ExistUser)
              return res.status(404).josn({msg:"Requested id not found"})
            await User.findByIdAndDelete({_id:id})
            res.status(200).json({msg:"User information deleted successfully"})
        } catch (error) {
                return res.status(500).json({msg:error.message}) //500 status is a internal server error
        }
    }

     //update user //(patch) request
     let updateUser = async (req, res) =>{
        try {
            let id = req.params.id
            let existEmail = await User.findOne({email: req.body.email})
            if(existEmail)
                return res.status(400).json({msg:`${req.body.email} already`})//400 is abad request

             //check if the mobile number is already exist or not
             let existMobile = await User.findOne({email: req.body.mobile})
             if(existMobile)
                 return res.status(400).json({msg:`${req.body.mobile} already exist`})//400 is abad request
                await User.findByIdAndUpdate({_id:id}, req.body)
                res.status(200).json({msg:"user information updated successfully"})
        } catch (error) {
                return res.status(500).json({msg:error.message}) //500 status is a internal server error
        }
    }



    //page not found
    var pnf = (req, res) =>{
        return res.render('pnf.ejs')
    }

    //export all the craeted call functions
    module.exports = {index, create, edit, pnf, addUser, allUser, singleUser, deleteUser, updateUser}