/**
 * @swagger
 * /login:
 *   get:
 *     description: login
 *     responses:
 *       200:
 *         description: login
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './../Model/teacherSchema.json'
 * 
 * */
const express = require("express");
const router = express.Router();
const loginController = require("./../Controllers/auth.js");

router.get("/login", loginController.login);

module.exports = router;