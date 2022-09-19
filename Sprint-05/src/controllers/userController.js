const fs = require('fs');
const multer = require('multer');
const { json } = require('body-parser');
const path = require('path');

let usersFilePath = path.join(__dirname, '../../data/users.json');
let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const userController={
    profile: (req, res)=>{
        const idUrl = req.params.id;
        console.log(idUrl)
        let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'))
         
        for(let user of users){
            if(parseInt(user.id) == parseInt(idUrl)){ 
              res.render('profile',{user: user}); 
           }
       }
      },
      
      upload: function(req,res){
        let filenameVar;
        
         if(req.file !== undefined){
           filenameVar = req.file.filename
         }else{
    
           let jsonData = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    
           for(let user of jsonData){
             if(parseInt(req.body.id) == parseInt(user.id)){
              
              filenameVar = user.image
           }
        }
           filenameVar = req.body.image
         }
        
         let jsonData = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    
         let userUpdate ={
           id: req.body.id,                
           firstName: req.body.firstName,
           lastName: req.body.lastName,
           email: req.body.email,
           image: filenameVar,
           category: req.body.category
           
       }
         for(let user of jsonData){
          
             if(parseInt(userUpdate.id) == parseInt(user.id)){
               user.firstName = userUpdate.firstName,
               user.lastName = userUpdate.lastName,
               user.email = userUpdate.email,
               user.image = userUpdate.image
               user.category = userUpdate.category
             
             req.session.userLogged = userUpdate
          
             jsonData = JSON.stringify(jsonData); //lo convierto a json
      
             fs.writeFileSync(usersFilePath,  jsonData); //lo grabo en el json
    
             // lo convierto a js para poder recorrerlo en la vista
            jsonData = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'))
    
                res.render('userDetail',{user: userUpdate})
               }else{
                res.send('no lo actualizo porque no encontro')
           }
        }
    },
}

module.exports=userController