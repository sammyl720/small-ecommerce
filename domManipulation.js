const mainEl = document.querySelector('#main')
const productContainer = document.querySelector('.products-container')
const cartBtn = document.querySelector('#cart-btn')
const cartEl = document.querySelector('.cart')
const cartItemsEl = document.querySelector('.cart-items')
const cartClose = document.querySelector('.cart-close')
const qtyCircle = document.querySelector('.nav .circle')

function updateCartDom() {
  const {total, subTotal, taxTotal} = cart.getCartTotal()
  cartItemsEl.innerHTML = '';
  if(cart.cartQty === 0){
    qtyCircle.style.opacity = '0';
    qtyCircle.style.display = 'hidden';
    slideCartWindow(false)
    return;
  }else{
    qtyCircle.style.opacity = '1';
    qtyCircle.style.display = 'flex';
    qtyCircle.classList.add('pop')
    setTimeout(() => {
      qtyCircle.classList.remove('pop')
    }, 600);
    qtyCircle.innerHTML = cart.cartQty;
  }
  cart.cart.forEach(cartItem => {
    let itemEl = document.createElement('div')
    itemEl.classList.add('cart-item')
    itemEl.dataset.id = cartItem.id;
    itemEl.innerHTML = `
    <div style="background-image: url(${cartItem.product_image});" class="cart-item-img"></div>
      <div class="cart-item-name">${cartItem.name}</div>
        <div class="cart-item-dets">
          <div class='cart-qty-toolkit'>
            <button class='cart-qty-increase qty-btn' id='incre-prod-${cartItem.id}'>
              <i class='fas fa-sort-up'></i>
            </button>
            <span class="cart-item-qty">${cartItem.qty}</span>
            <button class='cart-qty-decrease qty-btn'>
              <i class='fas fa-sort-down'>
</i>
            </button>
          </div>
          <span class="cart-item-price">$${parseInt(cartItem.price)} <small>ea.</small></span>
        </div>
      </div>
    </div>
    `
    cartItemsEl.appendChild(itemEl)
  })
  cartItemsEl.innerHTML += `
  <div class="cart-sub-total">
      <small>Subtotal</small>
      <span>$${subTotal.toFixed(2)}</span>
    </div>
    <div class="cart-sub-taxs">
      <small>Tax</small>
      <span>$${taxTotal.toFixed(2)}</span>
    </div>
    <div class="cart-total">
      <span>Total</span>
      <span>$${total.toFixed(2)}</span>
    </div>
    <button class="btn checkout">Checkout</button>
  `
}

function addProductToCart(product){
  if(cart.cartQty === 0){
    qtyCircle.style.opacity = '0';
    qtyCircle.style.display = 'hidden';

  }
  cart.addProductToCart(product)
  updateCartDom();
}


function addProductToDom(product){
  const newProduct = document.createElement('div')
  newProduct.classList.add('card')
  newProduct.innerHTML = `
    <div class="card-image" style='background-image: url(${product.product_image});'>
      <div class='img-cover'>
        <h3>${product.name}</h3>
      </div>
    </div>
    <div class="card-content">
      <button class="content-close">
        <i class="fas fa-times"></i>
      </button>
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <div class="product-price">$${parseInt(product.price)}</div>
      </div>
      <p class="product-description">
        ${product.description}
      </p>
      <button class="btn btn-large add-to-cart">Add To Cart</button>
    </div>
  `

  const prodImage = newProduct.querySelector('.card-image');
  const cardContent = newProduct.querySelector('.card-content');
  const closeBtn = newProduct.querySelector('.content-close');
  const addToCartBtn = newProduct.querySelector('.add-to-cart')
  prodImage.addEventListener('click', () => {
    cardContent.style.transform = 'translateY(-280px)';
    prodImage.classList.add('darken')
  })

  closeBtn.addEventListener('click', () => {
    cardContent.style.transform = 'translateY(0)';
    prodImage.classList.remove('darken')
  })
  addToCartBtn.addEventListener('click', (e) => {
    addProductToCart(product)
    const {offsetX, offsetY} = e;
    const rippleCircle = document.createElement('span')
    rippleCircle.classList.add('ripple')
    rippleCircle.style.top = `${offsetY}px`
    rippleCircle.style.left = `${offsetX}px`
    addToCartBtn.appendChild(rippleCircle);
    setTimeout(() => {
      rippleCircle.remove()
    }, 500);
    console.log(offsetX, offsetY)
  })
  productContainer.appendChild(newProduct);
}

function adjustCartItemCount(target, cart, increase){
  let id = target.parentElement.parentElement.parentElement.parentElement.dataset.id;
  let prod = cart.adjustProductQty(id, increase ? 1: -1);
  console.log(prod);
  updateCartDom()
}