import axios from 'axios'

import Noty from 'noty';

import {initAdmin} from './admin'

 

let addtocart = document.querySelectorAll('.add-to-cart')

let cartCounter = document.querySelector('#cartCounter')

function updateCart(pizza){

  axios.post('/update-cart',pizza).then(res =>{
    
    cartCounter.innerText =res.data.totalQty

    new Noty({
      type:"success",
      timeout:1000,
      text: 'Item added in cart'
  }).show();

  }).catch(err =>{

    new Noty({
      type:"error",
      timeout:1000,
      text: 'something went wrong'
  }).show();



  })

}

addtocart.forEach((btn) => {
btn.addEventListener('click', (e)=>{
  let pizza = JSON.parse(btn.dataset.pizza) 
  //console.log(pizza)
  updateCart(pizza)
})

})

//Remove alert message fter x seconds

const alertMsg = document.querySelector('#success-alert')
   if(alertMsg)
   {
     setTimeout(() => {
       alertMsg.remove()
     },2000);
   }

   initAdmin()