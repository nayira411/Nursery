const { validationResult } = require("express-validator");
const teacher = require("./../Model/teacherSchema.js");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

exports.getallteachears = (request, responce, next) => {
    let errors = validationResult(request);
    console.log("get the data froom the teacher")
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 500;
        error.message = errors.array().reduce((current, object) => { current + object.msg, "" });
        throw error;
    }
    if(request.role=="Admin" )
    {
        teacher.find({})
        .then((data) => {
            responce.status(200).json({ message: "get teacher data", data });
        })
        .catch((error) => {
            next(error);
        });
    }
    else{
        next(new Error("not authorized")); 
    }
   
};
exports.insertteachear = (request, responce, next) => {
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
            let object = new teacher({
                _id: uuidv4(),
                name: request.body.name,
                email: request.body.email,
                password: hash,
                role:"Teacher",
                image: request.file.filename,
            });
            object.save()
                .then((data) => {
                    responce.status(200).json({ message: "insert teacher data", data });
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
exports.updateteachear = (request, responce, next) => {
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
            teacher.findByIdAndUpdate(request.body._id, {
                $set: {
                    name: request.body.name,
                    email: request.body.email,
                    password: hash,
                    role:"Teacher",
                    image: request.file.filename,
                }
            })
                .then((data) => {
                    responce.status(200).json({ message: "update teacher data", data });
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
exports.deleteTeachear = (request, responce, next) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 500;
        error.message = errors.array().reduce((current, object) => { current + object.msg, "" });
        throw error;
    }
    if(request.role=="Admin")
    {

    teacher.findByIdAndDelete(request.body._id)
        .then((data) => {
            responce.status(200).json({ message: "deleted teacher data", data });
        })
        .catch((error) => {

            next(error);
        });
    }
    else{
        next(new Error("not authorized"));

    }
};
exports.checkMatchTheold = async (request, response, next) => {
    try {
        const oldpass = request.body.oldpassword;
        const newpass = request.body.newpassword;
        
        const data = await teacher.findOne({ _id: request.body._id });
        
        if (!data) {
            let error = new Error();
            error.message="No user found";
            error.status=500;
            next(error);
        }

        const result = await bcrypt.compare(oldpass, data.password);
        if (!result) {
            let error = new Error();
            error.message="Password not matched";
            error.status=500;
            next(error);
        }

        const hashedNewPassword = await bcrypt.hash(newpass, 10);
        await teacher.updateOne({ _id: request.body._id }, { $set: { password: hashedNewPassword } });
        
        next();
    } catch (error) {
        next(error);
    }
};
