const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
    let token, decodedToken;
    try {
        
        token = request.get("Authorization").split(" ")[1];
        decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        console.log(token,decodedToken,jwt.verify(token, process.env.SECRET_KEY));
    } catch (error) {
        console.log(token,decodedToken,error);
        error.message="no authorized";
        error.status=403;
        next(error);
    }


    if (decodedToken !== undefined) {
        request.role = decodedToken.role;
        console.log(decodedToken.role);
        next();
    } else {
   
        const decodingError = new Error("Failed to decode token");
        decodingError.status = 403;
        next(decodingError);
    }
};