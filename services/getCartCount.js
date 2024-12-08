const Cart = require("../models/cart")


const getCartCount = async (userId)=>{
    const carts = await Cart.find({user:userId});
   const count =  carts.reduce((acc,current) => acc+current.quantity , 0)
    return  count
}

module.exports = {getCartCount}