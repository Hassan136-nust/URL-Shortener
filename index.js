const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
const urlRoute = require("./routes/url");
const {connectDB} = require("./connect");
const URL = require("./models/url");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB("mongodb://localhost:27017/url-shortener").then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log("Error connecting to DB",err);
});

app.use("/url",urlRoute)

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const urlData = await mongoose.model("url").findOne({ shortId });
    if (urlData) {
        urlData.visitHistory.push({ timestamp: Date.now() });
        await urlData.save();
        return res.redirect(urlData.redirectUrl);
    } else {
        return res.status(404).json({ error: "Short URL not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}   );