const passport = require('passport')
const User =require('../../models/user')
const bcrypt=require('bcrypt')

function authConttroller()
{

   const _getRedirectUrl =(req)=>{
           return req.user.role=== 'admin' ? '/admin/orders' : '/customers/orders'

   }



return{

          login(req,res)
          {
            res.render('auth/login')

              
          },

            postLogin(req,res,next){
    
                passport.authenticate('local',(err,user,info)=>{
                  if(err)
                  {
                    req.flash('error',info.message)
                  }

                 if(!user)
                   {

                        req.flash('error',info.message)
                        return res.redirect('/login')
                   }

                    req.login(user, (err)=>{
                           if(err)
                           {
                             req.flash('error',info.message)
                             return next(err)
                           }
                             return res.redirect(_getRedirectUrl(req))
                    })
                }) (req,res,next)
 
            },
         


          register(req,res)
          {
            res.render('auth/register')
              
          },

        async  postregister(req,res)
          {
            const {name,email,password}=req.body
            console.log(req.body)

            //validating user
              if(!name || !email || !password)

                     {
                       req.flash('error',"All field are required")
                       req.flash('name',name)
                       req.flash('email',email)
        
                       return res.redirect('/register')

                      }
           
                  //check if email exist
              User.exists( {email:email} ,(error,result)=>{

                           if(result)
                                   {

                                    req.flash('error',"Email already taken")
                                    req.flash('name',name)
                                    req.flash('email',email)
                     
                                    return res.redirect('/register')

                                   }


        
                              }  )

     //hash passpord     
     
        const hashedPassword = await bcrypt.hash(password,10)
               
                 const user = new User({
                   name,
                   email,
                   password:hashedPassword


                 })
              
              
              
                  user.save().then((user) => {

                      //login
                      return res.redirect('/')


                  }).catch(err =>{

                    req.flash('error',"something is wrong")
                   
                   return res.redirect('/register')

                  })
         
         
                },

                logout(req,res)
                {
                  req.logout()
                  return res.redirect('/')
      
                    
                },
      
     

       }

}
module.exports=authConttroller;