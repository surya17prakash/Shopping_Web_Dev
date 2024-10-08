class Cart{
    constructor(items=[],totalQuantity=0,totalPrice=0){
        this.items=items;
        this.totalPrice=totalPrice;
        this.totalQuantity=totalQuantity;
    }

addItem(product){
    const cartItem={
        product:product,
        quantity:1,
        totalPrice:product.price
    }
    for(let i=0;i< this.items.length;i++){
        const item=this.items[i];
        if(item.product.id === product.id){
            cartItem.quantity =cartItem.quantity+1;
            cartItem.totalPrice =cartItem.totalPrice+product.price;
            this.item[i]=cartItem;
            this.totalQuantity++;
            this.totalPrice+=product.price;
            return;
        }
    }
    this.items.push(cartItem);
    this.totalQuantity++;
    this.totalPrice+=product.price;
}    
}

module.exports=Cart;