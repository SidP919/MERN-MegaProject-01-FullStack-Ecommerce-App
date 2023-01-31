const User = require('../models/user.schema');
const asyncHandler = require('../services/asyncHandler');
const CustomError = require('../services/customError');
const cookieOptions = require('../utils/auth.cookieOptions');
const getUniqueUsername = require('../services/getUniqueUsername');

/****************************************************************************************
 * @SIGNUP
 * @route http://localhost:4001/api/v1/auth/signup
 * @requestType POST
 * @description User SignUp Controller which registers/creates a new user
 * @parameters fullname, username, email, password
 * @returns JSON object( containing response message, newly created User object and token)
 **************************************************************************************/
const signUp = asyncHandler(async(req,res)=>{
    // Destructuring the required info from signup request's body object
    const {fullname, email, password} = req.body;
    let {username} = req.body;
    // Check if all required info was sent in signup request or not
    if(!(fullname && email && password)){ //omitted username from this check since username is not a mandatory field
        console.log("User Info: ",fullname,email,password,username)
        throw new CustomError("Mandatory fields cannot be empty! Please fill them & try again.", 400);
    }

    // Check if email sent in signup request is unique or not
    const ifExistingUser = await User.findOne({email});
    if(ifExistingUser){
        throw new CustomError("User with same email-id already exists! Please provide a unique email-id.", 400)
    }

    // If username is sent in signup request
    if(username){
        // Check if username sent in signup request is unique or not
        const ifExistingUsername = await User.findOne({username});
        if(ifExistingUsername){
            throw new CustomError("User with same username already exists! Please provide a unique Username.",400)
        }
    }else{ // If username is not sent in SignUp request:
        let ifExistingUsername = true;
        do{
            username = getUniqueUsername(email);
            ifExistingUsername = await User.findOne({username});
        }while(ifExistingUsername)
    }

    // create User account
    const user = await User.create({
        fullname,
        username,
        email,
        password
    })
    .then((newUser)=>{ // if user created successfully:
        newUser.password = undefined; //no one will be able to access value of password after this line
        return newUser;
    })
    .catch((error)=>{ // if user creation failed:
        throw new CustomError(error.message,400);
    });

    // generate token using userSchema method- getJwtToken()
    const token = await user.getJwtToken();

    // set cookie- token
    res.cookie("token",token,cookieOptions);

    // send success response:
    res.status(201).json({
        success:true,
        message:"User has been successfully registered.",
        token,
        user
    })
})

module.exports = {signUp};