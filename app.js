const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs');
const date = require(__dirname+'/date.js')
app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs');  // From ejs documentation
app.use(express.static("public"));
var newItems = [];
app.get("/",(req,res)=>{
    var day = date.getDate(); //Code refactored here
    res.render("list",{dayName:day,newListItems:newItems})

})
app.post("/",(req,res)=>{
    var newItem = req.body.newItem
    if(newItem!=""){
     newItems.push(newItem)
    }
    //Now we cant use res.render("list",{newListItem:newItem})
    //becasue when somebody makes a get request to our homepage we initially land in the codeblock above, and we render only dayName value, so the browser wont have a value of newListItem at that time , so now if we render it on the get request codeblock then we wont have the value of newItem, so we make newItem a global variable and set its value in the post request
    res.redirect("/");
})
app.post("/remove",(req,res)=>{
    let remove = req.body.remove;
    newItems.splice(newItems.indexOf(remove),1) ;
    res.redirect("/") 
})
app.listen(3000,()=>{
    console.log("Server listening at port 3000")
})