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

/*************************************************************************************
 * @LOGIN
 * @route http://localhost:4001/api/v1/auth/login
 * @requestType POST
 * @description User Login Controller for logging an existing/registered user
 * @parameters username/email and password
 * @returns JSON object( containing response message, logged in User object and token)
 **************************************************************************************/
const login = asyncHandler(async (req,res) => {
    
    // Destructuring the required info from login request's body object
    const {username, email, password} = req.body;

    // Check if all required info was sent in login request or not
    if(!((username || email) && password)){
        throw new CustomError("Mandatory fields cannot be empty! Please fill them & try again.", 400);
    }

    // Get user info from DB including password and compare it with user provided password
    const user = await User.findOne(
        {
            $or:[{email},{username}]
        })
        .select("+password")
        .catch((error)=>{
            console.log(error);
            throw new CustomError(error.message, error.code)
        });
    if(!user){
        throw new CustomError("Email/Username or/and Password entered is/are incorrect! Please try again.", 400)
    }
    const isPwdCorrect = await user.comparePassword(password);
    user.password = undefined;

    // if password is correct:
    if(isPwdCorrect){
        // generate token:
        const token = user.getJwtToken();
        // set token in cookies:
        res.cookie("token", token, cookieOptions);
        // send response:
        res.status(200).json({
            success:true,
            message:"User logged in successfully.",
            token,
            user
        })
    }else{ // if password is incorrect:
        throw new CustomError("Email/Username or/and Password entered is/are incorrect! Please try again.", 400)
    }

})

/*************************************************************************************
 * @LOGOUT
 * @route http://localhost:4001/api/v1/auth/logout
 * @requestType POST
 * @description User LogOut Controller for logging out an existing/registered user
 * @parameters none
 * @returns JSON object( containing response result and message)
 **************************************************************************************/
const logOut = asyncHandler(async (_req,res) => {
    res.cookie("token",null,{
        expires: new Date(),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"User logged out successfully."
    })
})

module.exports = {signUp, login, logOut};