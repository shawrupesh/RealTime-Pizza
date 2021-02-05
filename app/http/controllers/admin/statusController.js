const Order = require('../../../models/order')

function statusController() {
    return {
        update(req, res) {
            Order.updateOne({_id: req.body.orderId}, { status: req.body.status }, (err, data)=> {
                if(err) {
                    
                    return res.redirect('/admin/orders')
                    console.log("not updated")
                }

                else{
                    return res.redirect('/admin/orders')
                    console.log("updated")
                }

            } ) 
        }     

    }    

}

module.exports=statusController