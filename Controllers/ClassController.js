const { validationResult } = require("express-validator");
const classes = require("./../Model/classSchema.js");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

exports.getallClasses = (request, responce, next) => {
    let errors = validationResult(request);
    console.log("get the data froom the Class")
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 500;
        error.message = errors.array().reduce((current, object) => { current + object.msg, "" });
        throw error;
    }
    if(request.role=="Admin" )
    {
        classes.find({})
        .then((data) => {
            responce.status(200).json({ message: "get Class data", data });
        })
        .catch((error) => {
            next(error);
        });
    }
    else{
        next(new Error("not authorized")); 
    }
   
};
exports.insertclass = (request, responce, next) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => { current + object.msg, "" });
        throw error;
    }
    if(request.role=="Admin" )
    {
    bcrypt.genSalt(10, (error, salt) => {
        if (error) {
            error.status = 500;
            error.message = "can not decrupt the pass";
            throw error;
        }
        bcrypt.hash(request.body.password, salt, (error, hash) => {
            if (error) {
                error.status = 500;
                error.message = "can not decrupt the pass";
                throw error;
            }
            let object = new classes({
                name: request.body.name,
                supervisor: request.body.supervisor,
                children: request.body.children
            });
            object.save()
                .then((data) => {
                    responce.status(200).json({ message: "insert class data", data });
                })
                .catch((error) => {

                    next(error);
                })

        })
    
    })
}
else 
{
    next(new Error("not authorized"));
}

};
exports.updateClass = (request, responce, next) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 500;
        error.message = errors.array().reduce((current, object) => { current + object.msg, "" });
        throw error;
    }
    if(request.role=="Admin")
    {

    bcrypt.genSalt(10, (error, salt) => {
        if (error) {
            error.status = 500;
            error.message = "can not decrupt the pass";
            throw error;
        }
        bcrypt.hash(request.body.password, salt, (error, hash) => {
            if (error) {
                error.status = 500;
                error.message = "can not decrupt the pass";
                throw error;
            }
            classes.findByIdAndUpdate(request.body._id, {
                $set: {
                    name: request.body.name,
                    supervisor: request.body.supervisor,
                    children: request.body.children
                }
            })
                .then((data) => {
                    responce.status(200).json({ message: "update class data", data });
                })
                .catch((error) => {

                    next(error);
                });
        })
    })
}
else{
    next (new Error("not authorized"));

}
};
exports.deleteClass = (request, responce, next) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 500;
        error.message = errors.array().reduce((current, object) => { current + object.msg, "" });
        throw error;
    }
    if(request.role=="Admin")
    {

        classes.findByIdAndDelete(request.body._id)
        .then((data) => {
            responce.status(200).json({ message: "deleted Class data", data });
        })
        .catch((error) => {

            next(error);
        });
    }
    else{
        next(new Error("not authorized"));

    }
};

