const { validationResult } = require("express-validator");
const child = require("./../Model/childSchema.js");
const teacher = require("./../Model/teacherSchema.js");
const { v4: uuidv4 } = require('uuid');

exports.getAllChild = (request, responce, next) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 500;
        error.message = errors.array().reduce((current, object) => { current + object.msg, "" });
        throw error;
    }
    if(request.role=="Teacher" || request.role=="Admin" )
    {
        child.find({}).populate({ path: "teacher" ,model: teacher})
        .then((data) => {
            responce.status(200).json({ message: "get child data", data });
        })
        .catch((error) => {
            next(error);
        });
   
    }
    else
    {
        next (new Error("Not Authorized"));

    }


};
exports.insertChild = (request, responce, next) => {

    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 500;
        error.message = errors.array().reduce((current, object) => { current + object.msg, "" });
        throw error;
    }
    if(request.role=="Admin")
    { 
    let object = new child({
        _id: uuidv4(),
        name: request.body.name,
        image: request.file.filename,
        teacher: request.body.teacher,
        age: request.body.age,
        level:request.body.level,
        role:"student",
        address:{city:request.body.city,street:request.body.street,building:request.body.building}
    });
    object.save()
        .then((data) => {
            responce.status(200).json({ message: "insert child data", data });
        })
        .catch((error) => {
            next(error);
        });
    }
    else
    {
        next (new Error("not authorized"));
    }
};
exports.UpdateChild = (request, responce, next) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 500;
        error.message = errors.array().reduce((current, object) => { current + object.msg, "" });
        throw error;
    }
    if(request.role=="Admin")
    {
    child.findByIdAndUpdate(request.body._id, {
        $set: {
            name: request.body.name,
            image: request.file.filename,
            teacher: request.body.teacher,
            age: request.body.age,
            level:request.body.level,
            role:"student",
            address:{city:request.body.city,street:request.body.street,building:request.body.building}
        }
    })
        .then((data) => {
            responce.status(200).json({ message: "update child data", data });
        })
        .catch((error) => {
            next(error);
        });
    }
    else
    {
        next (new Error("not authorized"));
    }
};
exports.DeletChild = (request, responce, next) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 500;
        error.message = errors.array().reduce((current, object) => { current + object.msg, "" });
        throw error;
    }
    if(request.role=="Admin")
    {
    child.findByIdAndDelete({ _id: request.body._id })
        .then((data) => {
            responce.status(200).json({ message: "deleted child data", data });
        })
        .catch((error) => {
            next(error);
        });
    }
    else
    {
        next(new Error("not authorized"));
    }
};
