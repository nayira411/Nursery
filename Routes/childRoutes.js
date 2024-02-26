/**
 * @swagger
 * /child:
 *   get:
 *     description: Returns a list of child
 *     responses:
 *       200:
 *         description: A list of child
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './../Model/childSchema.json'
 *   post:
 *     description: Insert data into child
 *     responses:
 *       201:
 *         description: Inserted data in child
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: './../Model/childSchema.json'
 *   put:
 *     description: Update child
 *     responses:
 *       200:
 *         description: Updated child
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: './../Model/childSchema.json'
 * delete:
 *     description: delete child
 *     responses:
 *       200:
 *         description: delete child
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: './../Model/childSchema.json'
 */

const express = require("express");
const controller = require("../Controllers/childControllers");
const { body, param, query } = require("express-validator");
const { authorize ,CheckLoggedInUser,login} = require("../Controllers/auth.js");
const router = express.Router();

router.route("/child")
    .get(authorize,controller.getAllChild)
    .post(authorize,
        [body("name").isAlpha().withMessage("please enter a valid name")
        ,body("teacher").isAlphanumeric().withMessage("please enter a valid teacher")
        ],controller.insertChild)
    .put(authorize,[body("name").isAlpha().withMessage("please enter a valid name")
        , body("teacher").isAlphanumeric().withMessage("please enter a valid teacher")
    ], controller.UpdateChild)
    .delete(authorize,controller.DeletChild)

   

module.exports = router;