const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://0.0.0.0:27017/wikiDB");

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);


app.get("/article", (req, res) => {
    
    Article.find({}).then(function(foundArticles) {
        // console.log(foundArticles);
        res.send(foundArticles);
    }).catch((err)=>{
        res.send(err);
    });

});

app.post("/article", (req, res) => {

    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });

    newArticle.save().then(()=>{
        res.send("Added succesfully");
    }).catch((err)=>{
        res.send(err);
    });

});

app.delete("/article", (req, res) => {

    Article.deleteMany({}).then(()=>{
        res.send("Deleted all articles.");
    }).catch((err)=>{
        res.send(err);
    })

});


app.listen( PORT , () => {
    console.log(`Connected to PORT : ${PORT}`);
})