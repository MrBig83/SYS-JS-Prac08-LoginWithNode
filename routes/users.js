const express = require("express");
const router = express.Router();
const fs = require("fs");
const cors = require("cors");

router.use(cors());

router.get("/", function(req, res){
    fs.readFile("./json/users.json", function(err, data){
        if(err){
            console.log(err);
        }
        if(data == ""){
            res.status(404).send("Du försöker läsa ifrån en tom fil");
        } else {
            const users = JSON.parse(data)
            res.send(users)
        }
        
    })
    
})

router.post("/newUser", function(req, res){
    fs.readFile("./json/users.json", function(err, data){
        console.log("req.body = " + req.body)
        if(err){
            console.log(err)
        }
        if(data == ""){
            var users = [{"id":1, "userName":"Admin", "passWord":666}]
        } else {
            var users = JSON.parse(data)
        };
        const newUser = req.body;
        console.log(newUser);
        newUser.id = users.length +1;
        
        for(let i = 0; i < users.length; i++){
            if(newUser.id == users[i].id){
                newUser.id = newUser.id +1;
            }
        }
        users.push(newUser);

        fs.writeFile("./json/users.json", JSON.stringify(users, null, 2), function(err){
            if(err){
                console.log(err);
            }
        })
        res.status(201).send("User added");
        return;

    })
})




module.exports = router;