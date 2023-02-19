export function getItemCount(cartItems) {
    return cartItems.reduce((sum, cartItem) => { return cartItem.quantity + sum }, 0);
}

export function getSubtotal(cartItems) {
    // console.log(cartItems);
    return cartItems.reduce((sum, {product:cartItem,quantity}) => { return quantity * cartItem.price + sum }, 0);
}