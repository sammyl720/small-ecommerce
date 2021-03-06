const cart = new Cart()

if(cart.cartQty === 0){
  qtyCircle.style.opacity = '0';
  qtyCircle.style.display = 'hidden';
}

function slideCartWindow (toggle = false, close = false) {
  if(toggle && cartItemsEl.childElementCount){
    cartEl.classList.toggle('open-cart');
    return;
  }
  if(cartItemsEl.childElementCount && !close){
    cartEl.classList.add('open-cart');
  } else {
    cartEl.classList.remove('open-cart');
  }
}
cartBtn.addEventListener('click', () => {
  slideCartWindow(true, false)
})

cartClose.addEventListener('click', () => {
  slideCartWindow(true)
})

for(let i = 0; i < products.length;i++){
  addProductToDom(products[i])
}

document.addEventListener('click', (e) => {
  if(e.target.matches('.qty-btn')){
    e.target.firstElementChild.click()
  }
  if(e.target.matches('i.fa-sort-up')){
    adjustCartItemCount(e.target, cart, true);
  } else if(e.target.matches('i.fa-sort-down')){
    adjustCartItemCount(e.target, cart, false);
  } else if(e.target.matches('.btn.checkout')){
    slideCartWindow(false, true);
    addCartToCheckout(cart);
  }
})