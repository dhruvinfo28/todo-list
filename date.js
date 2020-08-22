exports.getDate = function(){  //exports is a javascript object, so we can return various functions from here by assigning them to different properties
    var date = new Date();
     var options = {
         weekday:"long",
         month:"long",
         day:"numeric"
     }
     return  date.toLocaleDateString("en-US",options)
}