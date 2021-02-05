const homeController=require('../app/http/controllers/homeController')
const authController=require('../app/http/controllers/authController')
const cartController=require('../app/http/controllers/customers/cartController')
const orderController=require('../app/http/controllers/customers/orderController')
const adminOrderController=require('../app/http/controllers/admin/orderController')
const adminStatusController=require('../app/http/controllers/admin/statusController')



//middlewares 
const guest=require('../app/http/middleware/guest')
const auth=require('../app/http/middleware/auth')
const admin=require('../app/http/middleware/admin')



function initRoutes(app) {

app.get('/',homeController().index)

app.get('/login', guest,authController().login)
app.post('/login',authController().postLogin)
app.post('/logout',authController().logout)

app.get('/register', guest, authController().register)
app.post('/register',authController().postregister)

app.get('/cart',cartController().cart)

app.post('/update-cart',cartController().update)

//customers routes
app.post('/orders', auth,orderController().store)
app.get('/customers/orders', auth, orderController().index)

//admin routes
app.get('/admin/orders', admin,  adminOrderController().index)
app.post('/admin/orders/status', admin,  adminStatusController().update)

}

module.exports=initRoutes;