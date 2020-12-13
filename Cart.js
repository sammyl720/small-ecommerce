class Cart{
  cart = [];
  cartQty = 0;
  taxRate = 0.0889;
  taxTotal
  subTotal = 0;
  total = 0;
  constructor(product = null, qty = 1){
    if(product){
      this.cart.push({...product, qty})
    }
  }

  addProductToCart(product){
    const productExists = this.cart.findIndex((prod) => prod.id === product.id)
    if(productExists !== -1){
      this.cart[productExists].qty++;
    } else {
      this.cart.push({...product, qty: 1 })
    }
    return this.getCartQty()
  }
  
  adjustProductQty(id, amount){
    let product = this.getProductById(id)
    if(product){
      product.qty += amount;
    } else {
      return null;
    }
    if(product.qty < 1){
      this.removeProductFromCart(product, 0);
    }

    return product;
  }

  getProductById(id) {
    const productExists = this.cart.findIndex((prod) => prod.id === id)
    if(productExists !== -1){
      return this.cart[productExists]
    } else {
      return null;
    }
  }
  getCartQty(){
    this.cartQty = 0;
    this.cart.forEach(p => this.cartQty += p.qty);
    return this.qty;
  }
  removeProductFromCart(product, qty){
    const productExists = this.cart.findIndex((prod) => prod.id === product.id)
    if(productExists !== -1){
      this.cart[productExists].qty -= qty;
      if(this.cart[productExists].qty <= 0){
        this.cart = this.cart.filter((p, idx) => idx !== productExists)
      }
    } else {
      console.log('Product was not found on the cart')
    }

  }

  getCartTotal(){
    this.getCartQty()
    this.subTotal = 0;
    this.cart.forEach(product => {
      this.subTotal += product.price * product.qty;
    })
    this.taxTotal = this.subTotal * this.taxRate;
    this.total = (this.subTotal) + (this.taxTotal);
    return { total:this.total, subTotal:this.subTotal, taxTotal: this.taxTotal }
  }
}