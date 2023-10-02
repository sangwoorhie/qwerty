const express = require('express')
const router = express.Router();
const Authmiddleware = require("../middlewares/auth-middleware.js")

const PostReportController = require('../controllers/postreport.controllers.js')
const postReportController = new PostReportController();


router.post('/', Authmiddleware, postReportController.createReport)
router.delete('/', Authmiddleware, postReportController.deleteReport)


module.exports = router;