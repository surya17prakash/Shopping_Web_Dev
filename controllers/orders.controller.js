const Order=require('../models/order.modal');
const User=require('../models/user.model');
async function addOrder(req,res,next){
    const cart=res.locals.cart;
    let userDocument;
    try{
     userDocument=await User.findById(res.locals.uid);
    }catch(error){
        return next(error);
    }
    const order=new Order(cart,userDocument);
    try{
    await order.save();
    }catch(error){
        next(error);
        return;
    }
    res.redirect('/orders');
}

module.exports={
    addOrder:addOrder
}