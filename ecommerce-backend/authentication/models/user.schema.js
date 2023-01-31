const mongoose = require("mongoose");
import USER_SCHEMA_CONSTS from './../utils/user.schema.consts'
import AUTH_ROLES from '../utils/auth.roles.consts'
const bcrypt = require('bcryptjs');
const AUTH_CONFIG = require('./../config/auth.config');
const JWT = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = mongoose.Schema(
    {
        fullname:{
            type: String,
            maxLength:[USER_SCHEMA_CONSTS.FULLNAME_MAX_LENGTH,`Name cannot be more than ${USER_SCHEMA_CONSTS.FULLNAME_MAX_LENGTH} characters long!`]
        },
        username:{
            type: String,
            unique:[true, "User with same username already exists."],
            maxLength:[USER_SCHEMA_CONSTS.USERNAME_MAX_LENGTH,`Username cannot be more than ${USER_SCHEMA_CONSTS.USERNAME_MAX_LENGTH} characters long!`],
            minLength:[USER_SCHEMA_CONSTS.USERNAME_MIN_LENGTH,`Username cannot be less than ${USER_SCHEMA_CONSTS.USERNAME_MIN_LENGTH} characters long!`],
            match:[USER_SCHEMA_CONSTS.USERNAME_MATCH_REGEXP(),"Given Username is invalid!"]
        },
        email:{
            type: String,
            required:[true,"email cannot be empty!"],
            unique:[true, "User with same email id already exists."],
            match:[USER_SCHEMA_CONSTS.EMAIL_MATCH_REGEXP,"Given email id is invalid!"]        
        },
        password:{
            type: String,
            required:[true,"password cannot be empty!"],
            minLength:[USER_SCHEMA_CONSTS.PASSWORD_MIN_LENGTH,`password cannot be less than ${USER_SCHEMA_CONSTS.PASSWORD_MIN_LENGTH} characters long!`],
            select: false, //this ensures that "password" won't be sent in DB o/p when user-info is queried from DB.
        },
        role:{
            type:String,
            enum:Object.values(AUTH_ROLES),
            default:AUTH_ROLES.USER
        },
        forgotPasswordToken:String,
        forgotPasswordExpiryTime:Date,
    },
    {
        timestamps: true
    }
);

// Whenever we receive user data including password from the client-side,
// then before saving the user data into our DB, we Encrypt the password & then save it:
userSchema.pre('save',  // "pre" hook will always execute its callback function before "save" function is executed.
    async function(next){
        if(!this.isModified("password")) // isModified() returns true if password is being modified in current transaction, else returns false.
            return next(); 
        this.password = bcrypt.hash(this.password, AUTH_CONFIG.AUTH_ENCRYPT_PWD_SALT);
        next();
    }
)

// We can add methods to our userSchema that 
// user model object can access like any other mongoose/mongoDB methods:
userSchema.methods = {
    
    comparePassword: async function(enteredPwd){
        return await bcrypt.compare(enteredPwd, this.password); // compares entered pwd from client-side and encrypted pwd in DB.
    },

    getJwtToken: function(){
        return JWT.sign(    // generates a unique JWT Auth Token
            {
                _id: this._id,
                role: this.role,
            },
            AUTH_CONFIG.JWT_AUTH_SECRET,
            {
                expiresIn: AUTH_CONFIG.JWT_EXPIRY_TIME
            }
        )
    },

    // generates & assigns a secret token to forgotPasswordToken and a time to forgotPasswordExpiryTime
    getForgotPasswordToken: function(){
        const forgotToken = crypto.randomBytes(32).toString('hex');

        this.forgotPasswordToken = crypto.createHash("sha256").update(forgotToken).digest('hex');
        this.forgotPasswordExpiryTime = Date.now() + (20 * 60 * 1000);

        return forgotToken;
    }
    
}

module.exports = mongoose.model("user",userSchema);