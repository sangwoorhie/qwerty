const express = require('express');
const router = express.Router();
const Authmiddleware = require("../middlewares/auth-middleware.js") 

const CommentReportController = require('../controllers/commentreport.controllers.js');
const commentReportController = new CommentReportController();


router.post('/', Authmiddleware, commentReportController.createReport)
router.delete('/', Authmiddleware, commentReportController.deleteReport)


module.exports = router;

