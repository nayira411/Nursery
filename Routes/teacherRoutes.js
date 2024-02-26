/**
 * @swagger
 * /teacher:
 *   get:
 *     description: Returns a list of teacher
 *     responses:
 *       200:
 *         description: A list of teacher
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './teacherSchema.json'
 *   post:
 *     description: Insert data into teacher
 *     responses:
 *       201:
 *         description: Inserted data in teacher
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: './teacherSchema.json'
 *   put:
 *     description: Update teacher
 *     responses:
 *       200:
 *         description: Updated teacher
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: './teacherSchema.json'
 * delete:
 *     description: delete teacher
 *     responses:
 *       200:
 *         description: delete teacher
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: './teacherSchema.json'
 */

/**
 * @swagger
 * /teacher/updatepass:
 *   get:
 *     description: update password of the teacher
 *     responses:
 *       200:
 *         description: update password of the teacher
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './teacherSchema.json'
 * 
 * */
const express = require("express");
const controller = require("../Controllers/teacherController");
const { body } = require("express-validator");
const { authorize ,CheckLoggedInUser,login} = require("../Controllers/auth.js");
const router = express.Router();
const Teacher = require("../Model/teacherSchema.js"); 

router.route("/teacher")
    .get(authorize,controller.getallteachears)
    .post(authorize, [
        body("name").isAlpha().withMessage("Please enter a valid name"),
        body("email").isEmail().withMessage("Please enter a valid email")
            .custom(async (value, { req }) => {
                const teacher = await Teacher.findOne({ email: req.body.email });
                if (teacher) {
                    throw new Error("Email is already in use");
                }
            }),
        body("password").isAlphanumeric().withMessage("Password must be alphanumeric")
    ], controller.insertteachear)
    .put(authorize, [
        body("name").isAlpha().withMessage("Please enter a valid name"),
        body("email").isEmail().withMessage("Please enter a valid email")
            .custom(async (value, { req }) => {
                const teacher = await Teacher.findOne({ email: req.body.email });
                if (teacher) {
                    throw new Error("Email is already in use");
                }
            }),
        body("password").isAlphanumeric().withMessage("Password must be alphanumeric")
    ], controller.updateteachear)
    .delete(authorize, controller.deleteTeachear);

router.route("/teacher/updatepass")
    .put(
        [body("oldpassword").isAlphanumeric().withMessage("Password must be alphanumeric")],
        controller.checkMatchTheold)
module.exports = router;
