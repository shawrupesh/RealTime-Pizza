
const Order =require('../../../models/order')
const moment=require('moment')

function orderController()
{

return {

      store(req,res)
      {   
//validate 1st

     const{phone, Address}=req.body
     
     if(!phone || !Address)
            {
                req.flash('error','All fields are required')
                return res.redirect('/cart')
            }      

               const order =new Order({

                        customerId:req.user._id,
                        items:req.session.cart.items,
                        phone,
                        Address
               })

               order.save().then(result =>{
                         req.flash('success','Orders Placed Successfully')
                          delete req.session.cart
                         return res.redirect('customers/orders')
                         console.log(result)
               }).catch(err =>{
                   req.flash('error',"somethingh went wrong")
                   return res.redirect('/cart')
               })

      },


      async index(req,res){

        const orders = await Order.find({customerId: req.user._id},null,{sort:{'createdAt':-1}})
        res.header('Cache-Control', 'no-store')
        res.render('customer/order',{order:orders,moment:moment})
        
      }


}



}

module.exports=orderController