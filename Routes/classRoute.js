/**
 * @swagger
 * /class:
 *   get:
 *     description: Returns a list of class
 *     responses:
 *       200:
 *         description: A list of class
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './../Model/classSchema.json'
 *   post:
 *     description: Insert data into class
 *     responses:
 *       201:
 *         description: Inserted data in class
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: './../Model/classSchema.json'
 *   put:
 *     description: Update class
 *     responses:
 *       200:
 *         description: Updated class
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: './../Model/classSchema.json'
 * delete:
 *     description: delete class
 *     responses:
 *       200:
 *         description: delete class
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: './../Model/classSchema.json'
 */

const express = require("express");
const controller = require("../Controllers/ClassController.js");
const { body, param, query } = require("express-validator");
const { authorize ,CheckLoggedInUser,login} = require("../Controllers/auth.js");
const router = express.Router();

router.route("/class")
    .get(authorize,controller.getallClasses)
    .post(authorize,
        [body("name").isAlpha().withMessage("please enter a valid name")
        ,body("supervisor").isAlphanumeric().withMessage("please enter a valid supervisor")
        ,body("children").isInt().withMessage("please enter a valid children")],controller.insertclass)
    .put(authorize,[body("name").isAlpha().withMessage("please enter a valid name")
    ,body("supervisor").isAlphanumeric().withMessage("please enter a valid supervisor")
    ,body("children").isInt().withMessage("please enter a valid children")], controller.updateClass)
    .delete(authorize,controller.deleteClass)

   

module.exports = router;