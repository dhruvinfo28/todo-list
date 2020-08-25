const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs');
const mongoose = require('mongoose')
const date = require(__dirname+'/date.js')
app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs');  // From ejs documentation
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser: true, useUnifiedTopology: true})
const itemSchema = mongoose.Schema({
    name: String
})
const Item = mongoose.model("Item",itemSchema);
const cookFood = new Item({
    name:"Use the + button to add new item"
})
const eatFood = new Item({
    name:"<-- Use this to delete"
})
// Item.insertMany([cookFood,eatFood],function(err){
//     if(err){
//         console.log(err)
//     }else{
//         console.log("Successfully added two items");
//     }
// })
app.get("/",(req,res)=>{
    var day = date.getDate(); //Code refactored here
    Item.find(function(err,data){
        if(err){
            console.log("read error: "+ err)
        }else{
            res.render("list",{dayName:day,newListItems:data})
          }
    })
})
app.post("/",(req,res)=>{
    var newItem = req.body.newItem
    if(newItem!=""){
      var newItem_add = new Item({
          name:newItem
      })
      newItem_add.save();
    }
    //Now we cant use res.render("list",{newListItem:newItem})
    //becasue when somebody makes a get request to our homepage we initially land in the codeblock above, and we render only dayName value, so the browser wont have a value of newListItem at that time , so now if we render it on the get request codeblock then we wont have the value of newItem, so we make newItem a global variable and set its value in the post request
    res.redirect("/");
})
app.post("/remove",(req,res)=>{
    let remove = req.body.remove;
    console.log(remove);
    Item.deleteOne({name:remove},function(err){
        if(err){
            console.log("Delete error :" + err)
        }else{
            console.log("Delete Successful")
        }
    })
    res.redirect("/") 
})
app.listen(3000,()=>{
    console.log("Server listening at port 3000")
})