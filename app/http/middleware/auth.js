function auth(req,res,next)
{
    if(req.isAuthenticated())
   {
      return  next()
   }
      else
      {

       return res.render('auth/login')
      }    

}

module.exports=auth;