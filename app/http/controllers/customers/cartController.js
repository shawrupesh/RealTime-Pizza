


function cartConttroller()
{

return{

          cart(req,res)
          {
              res.render('customer/cart')

              
          },
         update(req,res)
         {
            if(!req.session.cart)
            {
                req.session.cart ={
                    items:{},
                    totalQty:0,
                    totalPrice:0
                }

              
            }

            let cart= req.session.cart
            //check if item does not exist in cart
            if(!cart.items[req.body._id]){
                cart.items[req.body._id] ={
                    item: req.body,
                    qty  :1
                }
              
                cart.totalqty =cart.totalqty +1
                cart.totalPrice = cart.totalPrice +req.body.price
             
          }    else{
             cart.items[req.body._id].qty  = cart.items[req.body._id].qty +1
             cart.totalqty =cart.totalqty +1
          cart.totalPrice=cart.totalPrice +req.body.price
      }
         

           return   res.json({totalQty:req.session.cart.totalqty})
           
         }
         
        
     
}

}
module.exports=cartConttroller;