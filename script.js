
const cart = new Cart()

if(cart.cartQty === 0){
  qtyCircle.style.opacity = '0';
  qtyCircle.style.display = 'hidden';
}

function slideCartWindow (toggle = false) {
  if(toggle){
    cartEl.classList.toggle('open-cart');
    return;
  }
  if(cartItemsEl.childElementCount){
    cartEl.classList.add('open-cart');
  } else {
    cartEl.classList.remove('open-cart');
  }
}
cartBtn.addEventListener('click', () => {
  slideCartWindow()
})

cartClose.addEventListener('click', () => {
  slideCartWindow(true)
})

for(let i = 0; i < products.length;i++){
  addProductToDom(products[i])
}

document.addEventListener('click', (e) => {
  if(e.target.matches('i.fa-sort-up')){
    adjustCartItemCount(e.target, cart, true);
  } else if(e.target.matches('i.fa-sort-down')){
    adjustCartItemCount(e.target, cart, false);
  }
})