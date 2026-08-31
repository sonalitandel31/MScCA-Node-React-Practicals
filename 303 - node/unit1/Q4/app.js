const axios = require("axios");

axios
.get("https://jsonplaceholder.typicode.com/users123")
.then((response)=>{
    console.log(response.data);
})
.catch((error)=>{
    if(error.response){
        console.log("Status :",error.response.status);
        if(error.response.status==404){
            console.log("404 Not Found");
        }
        else if(error.response.status==500){
            console.log("500 Internal Server Error");
        }
    }
});