const express = require('express');
const {handleShortUrl}= require("../controllers/url")
const router = express.Router();
const {handleAnalytics}= require("../controllers/url")

router.post("/",handleShortUrl)
router.get("/analytics/:shortId",handleAnalytics)

module.exports=router;