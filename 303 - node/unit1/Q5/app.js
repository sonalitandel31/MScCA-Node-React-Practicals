const express = require("express");

const app = express();
app.set("view engine","ejs");
app.get("/",(req,res)=>{
    const user={
        name:"Sonali",
        age:21,
        course:"MSc Computer Application"
    };
    res.render("index",{user});
});
app.listen(3000,()=>{
    console.log("Server Running");
});