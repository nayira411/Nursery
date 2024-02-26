const express = require("express");
const server = express();
const mongoose = require('mongoose');
const teacherRouter = require("./Routes/teacherRoutes");
const childRouter = require("./Routes/childRoutes");
const authRouter = require("./Routes/authoRoute");
const bodyParser = require("body-parser");
const multer = require("multer");
const path=require("path");
const { login } = require("./Controllers/auth.js");
require('dotenv').config();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const dbUrl = process.env.DB_URL;
const port = process.env.PORT;



server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(dbUrl)
    .then(() => {
        console.log("Connected to database");
        server.listen(port, () => { console.log("Server is listening on port 8080") });
    })
    .catch(error => {
        console.error("Error connecting to database:", error);
    });

server.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', "*");
    response.header('Access-Control-Allow-Methods', "GET, POST, DELETE, UPDATE");
    response.header('Access-Control-Allow-Headers', "Content-Type, Authorization");
    next();
});

const storage=multer.diskStorage({
    destination:(request,file,cb)=>{
        cb(null,path.join(__dirname,"images"))
    },
    filename:(request,file,cb)=>{
        cb(null,request.body.name+file.originalname);
    }
})

//why this filter is not executted and deny enter file 
const filefilter = (request, file, cb) => {
    console.log('Mimetype:', file.mimetype); 
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg'
    ) {
        cb(null, true);
    } else {
        console.log('Rejected file:', file.originalname); 
        cb(null, false);
    }
};
const upload=multer({storage,filefilter})

server.use(upload.single("image"));

//================setting==========================
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Your API Name',
        description: 'Description of your API',
        version: '1.0.0',
      },
    },
    // Specify the paths to your route files containing Swagger annotations
    apis: ['./Routes/*.js'],
  };
  
const specs = swaggerJsdoc(options);
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
server.use(authRouter);
server.use(teacherRouter);
server.use(childRouter);


//=================not found====================
server.use((request, responce) => {
    responce.status(404).json({ message: "Not found" });
})

//===================error==========================
server.use((error, request, responce, next) => {
    responce.status(500).json({ message: error + "" });
})