# **Backend API for Authentication in our Full-Stack Ecommerce Application**

## **Description:** 
This is the authentication directory of our Full-Stack Ecommerce Application where we can find the code files & commits' details related to the authentication part of this Full-Stack Ecommerce Application.

***

## **List of contents**

  1. [Tech Stack Used](https://github.com/SidP919/MERN-MegaProject-01-FullStack-Ecommerce-App/tree/Main/ecommerce-backend/authentication#tech-stack-used)

  1. [Links & resources](https://github.com/SidP919/MERN-MegaProject-01-FullStack-Ecommerce-App/tree/Main/ecommerce-backend/authentication#links--resources)

***

## **Tech Stack used**

- [![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)](https://www.mongodb.com/atlas) 
 [![NodeJS](https://img.shields.io/badge/Node-JS-green)](https://nodejs.org/en/) 
 [![ExpressJS](https://img.shields.io/badge/Express-JS-758283)](https://expressjs.com/en/starter/installing.html)
 [![JavaScript-ES6](https://img.shields.io/badge/JavaScript-ES6-F7CD2E)](https://www.w3schools.com/js/js_es6.asp)

- **npm packages used** ( can see them in package.json file also): 
```json
    "dependencies": {

        "dotenv": "^16.0.3",
        "express": "^4.18.2",
        "mongoose": "^6.8.4",
        "bcryptjs": "^2.4.3",
        "jsonwebtoken": "^9.0.0"

    },

    "devDependencies": {

        "nodemon": "^2.0.20"

    }
```

***

## **Links & resources**

**Read and go through below links to understand various concepts/library/packages that we have used so far in this authentication directory:**

- [Click here](https://github.com/Automattic/mongoose/issues/1596#issuecomment-21977096) to know more about ``select: false`` used in [this](https://github.com/SidP919/MERN-MegaProject-01-FullStack-Ecommerce-App/blob/759b64aef16074254a465099dc231c612c710c99/ecommerce-backend/authentication/models/user.schema.js) file.

- [Click here](https://stackoverflow.com/a/24214767) to know more about `match:` property used in [this](https://github.com/SidP919/MERN-MegaProject-01-FullStack-Ecommerce-App/blob/Main/ecommerce-backend/authentication/models/user.schema.js) file.

- [Click here](https://regexr.com/3e48o) to know more about ``EMAIL_MATCH_REGEXP: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)`` used in [this](https://github.com/SidP919/MERN-MegaProject-01-FullStack-Ecommerce-App/blob/Main/ecommerce-backend/authentication/utils/user.schema.consts.js) file.

- [Click here](https://regexr.com/66jvc) to know more about ``USERNAME_MATCH_REGEXP: new RegExp(/^[a-zA-Z0-9_-]{8,26}$/)`` used in [this](https://github.com/SidP919/MERN-MegaProject-01-FullStack-Ecommerce-App/blob/759b64aef16074254a465099dc231c612c710c99/ecommerce-backend/authentication/utils/user.schema.consts.js) file.

- [Click here](https://rclayton.silvrback.com/export-enumerations-as-static-mongoose-properties) to know more about ``enum:Object.values(AUTH_ROLES)`` used in [this](https://github.com/SidP919/MERN-MegaProject-01-FullStack-Ecommerce-App/blob/Main/ecommerce-backend/authentication/models/user.schema.js) file.

- [Click here](https://mongoosejs.com/docs/timestamps.html#timestamps) to know more about ``{ timestamps: true }`` used in [this](https://github.com/SidP919/MERN-MegaProject-01-FullStack-Ecommerce-App/blob/759b64aef16074254a465099dc231c612c710c99/ecommerce-backend/authentication/models/user.schema.js) file.

- [Click here](https://mongoosejs.com/docs/middleware.html#pre) to know more about ``userSchema.pre('save'`` used in [this](https://github.com/SidP919/MERN-MegaProject-01-FullStack-Ecommerce-App/blob/Main/ecommerce-backend/authentication/models/user.schema.js) file.\
Also, read this- [issue with pre-hook & save() during password-update](https://stackoverflow.com/questions/50581825/ismodified-and-pre-save-mongoose-nodejs/69676178#69676178)

- [Click here](https://mongoosejs.com/docs/api/document.html#document_Document-isModified) to know more about ``if(!this.isModified("password"))`` used in [this](https://github.com/SidP919/MERN-MegaProject-01-FullStack-Ecommerce-App/blob/759b64aef16074254a465099dc231c612c710c99/ecommerce-backend/authentication/models/user.schema.js) file.

- [Click here](https://www.npmjs.com/package/bcryptjs#usage---async) to know more about ``bcrypt.hash(this.password, AUTH_CONFIG.AUTH_ENCRYPT_PWD_SALT);`` **and** ``bcrypt.compare(enteredPwd, this.password);`` used in [this](https://github.com/SidP919/MERN-MegaProject-01-FullStack-Ecommerce-App/blob/759b64aef16074254a465099dc231c612c710c99/ecommerce-backend/authentication/models/user.schema.js) file.

- [Click here](https://www.npmjs.com/package/jsonwebtoken) to know more about ``JWT.sign`` method used in [this](https://github.com/SidP919/MERN-MegaProject-01-FullStack-Ecommerce-App/blob/759b64aef16074254a465099dc231c612c710c99/ecommerce-backend/authentication/models/user.schema.js) file.

- [Click here](https://stackoverflow.com/a/25292026) to know more about ``crypto.randomBytes(32).toString('hex');`` used in [this](https://github.com/SidP919/MERN-MegaProject-01-FullStack-Ecommerce-App/blob/759b64aef16074254a465099dc231c612c710c99/ecommerce-backend/authentication/models/user.schema.js) file.

- [Click here](https://stackoverflow.com/a/9408217) to know more about ``crypto.createHash("sha256").update(forgotToken).digest('hex');`` used in [this](https://github.com/SidP919/MERN-MegaProject-01-FullStack-Ecommerce-App/blob/759b64aef16074254a465099dc231c612c710c99/ecommerce-backend/authentication/models/user.schema.js) file.

***

Thanks for the read👍

[🔼 Back to top](https://github.com/SidP919/MERN-MegaProject-01-FullStack-Ecommerce-App/tree/Main/ecommerce-backend/authentication#backend-api-for-authentication-in-our-full-stack-ecommerce-application)

#

Developed By:

**Sidharth Pandey**

[![Email](https://img.shields.io/badge/Email-6EC72D)](mailto:Sidp0008@gmail.com) [![LinkedIn](https://img.shields.io/badge/LinkedIn-1B98F5)](https://linkedin.com/in/sidp919)


**Happy Learning!** ☺️