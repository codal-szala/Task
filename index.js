const express = require("express");
const app = express();



const users = [
    {id:1,name:'user1'},
    {id:2,name:'user2'},
    {id:3,name:'user3'},
    {id:4,name:'user4'},
    {id:5,name:'user5'},
    {id:6,name:'user6'},
    {id:7,name:'user7'},
    {id:8,name:'user8'},
    {id:9,name:'user9'},
    {id:10,name:'user10'},
    {id:11,name:'user11'},
    {id:12,name:'user12'},
    {id:13,name:'user13'},
    {id:14,name:'user14'},

]



app.get("/users",paginatedResult(users),(req,res) =>{  
    res.json(res.paginatedResult);
   
})
function paginatedResult(model){
    return(req,res,next)=>{
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
    
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const results = {}
    
        if(endIndex<users.length)
        {
            results.next ={
                page:page+1,
                limit:limit
            }
        }
       
    
        if(startIndex>0)
        {
            results.previous ={
                page:page - 1,
                limit:limit
            }
        }
        
    
        results.results = users.slice(startIndex,endIndex);
        res.paginatedResult = results;
        next();

    }

}
app.listen(3000,()=>{
        console.log("SERVER LISTEN");
})