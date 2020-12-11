const productContainer = document.querySelector('.products-container')
console.log(products)
const cartBtn = document.querySelector('#cart-btn')
const cartEl = document.querySelector('.cart')
const cartClose = document.querySelector('.cart-close')

console.log(cartClose)
function slideCartWindow (open = true) {
  cartEl.style.transform = open ? 'translateY(0)' : 'translateY(-105%)';
}
cartBtn.addEventListener('click', () => {
  slideCartWindow()
})

cartClose.addEventListener('click', () => {
  console.log('clicked')
  slideCartWindow(false)
})
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
  prodImage.addEventListener('mouseenter', () => {
    cardContent.style.transform = 'translateY(-280px)';
    prodImage.classList.add('darken')
  })
  cardContent.addEventListener('mouseleave', () => {
    cardContent.style.transform = 'translateY(0)';
    prodImage.classList.remove('darken')

  })
  productContainer.appendChild(newProduct);
}

for(let i = 0; i < products.length;i++){
  addProductToDom(products[i])
}