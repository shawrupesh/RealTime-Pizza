const menu = require('../../models/menu');
const Menu=require('../../models/menu')
function homeConttroller()
{

return{

        async  index(req,res)
          {
              const pizzas=await Menu.find()
              //console.log(pizzas)
              return  res.render('home' ,{pizzas:pizzas})
            
            
            //Menu.find().then(function(pizzas){
             // return  res.render('home' ,{pizzas:pizzas})


              //})

             
              
          }
       }

}
module.exports=homeConttroller;