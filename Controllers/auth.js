const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Teacher = require("./../Model/teacherSchema.js");
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

exports.login = (request, response, next) => {
    const { email, password } = request.body; 
    Teacher.findOne({ email })
        .then((teacher) => {
            if (!teacher) {
              next( new Error( "Unauthorized: User not found" ));
            }
            bcrypt.compare(password, teacher.password, (err, result) => {
                if (err) {
                   return  next(err);
                }
                if (!result) {
                    return next(new Error("Unauthorized: Incorrect password"));
                }
                
                const token = jwt.sign({
                    _id: teacher._id,
                    role: teacher.role
                },secretKey, { expiresIn: "1hr" });

                response.status(200).json({ token });
            });
        })
        .catch(next); 
};
exports.CheckLoggedInUser = (request, response, next) => {
    try {
        const token = request.get("authorization").split(" ")[1];
        const decode = jwt.verify(token, secretKey);
        next(); 
    } catch (error) {
        next(new Error("Please login first")); 
    }
};
exports.authorize = (request, response, next) => {
    try {
        const token = request.get("authorization").split(" ")[1];
        const decode = jwt.verify(token, secretKey);
        request.role = decode.role; 
        next();
    } catch (error) {
        return next(new Error("Unauthorized: Invalid token"));
    }



};
