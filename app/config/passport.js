
const User= require('../models/user')
const bcrypt=require('bcrypt')


const LocalStratigies=require('passport-local').Strategy

 function init(passport) {

  passport.use(new  LocalStratigies ({usernameField:'email'},async (email,password,done)=>{
          
     //check if email exist
      const user=   await User.findOne({email: email})
      
      if(!user)
      {
          return done(null,false,{message:'No User with this Email exist'})
      }
        
      bcrypt.compare(password,user.password).then(match =>{
            if(match)
            {
                return done (null,user,{message:'logged in successfully'})
            }
            return done (null,false,{message:'Password Incorrect'})
      }).catch(err =>{
        return done (null,false,{message:'Something went wrong'})
      })

  }))


   passport.serializeUser((user,done) =>{
        done(null,user._id)
   })

   passport.deserializeUser((id,done) =>{
       User.findById(id,(err,user)=>{

        done(err,user)
       })
   })

}

module.exports=init