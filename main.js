const mainEl = document.querySelector('main');

const products = [];

const cart = [];

const cartEl = document.querySelector('#cart')

let lastId = 0;

function Product(title, price, img) {
  this.id = lastId++;
  this.title = title;
  this.price = price;
  this.img = img;
  this.quantity = 0;
}

function Cart(product){
  this.title = product.title;
  this.price = product.price;
  this.quantity = product.quantity;
}

Array.prototype.sum = function () {
  let total = 0
  for ( let i3 = 0, _len = this.length; i3 < _len; i3++ ) {
      total += this[i3].price * this[i3].quantity;
  }
  return total
}

function refreshCart(cart){
  if (cart.length == 0){
    cartEl.textContent = 'Корзина пуста';
  }
  else{
    let amount = 0;
    for (i4 = 0; i4 < cart.length; i4++){
      amount += cart[i4].quantity;
    }
    cartEl.textContent = 'В корзине ' + String(amount) + ' товаров на сумму ' + String(cart.sum() + ' рубл(я/ей)');
  }
}

function addToCart(product, cart){
  let trigger = false;
  if (cart.length == 0){
    cart.push(new Cart(product));
  }
  else{
    for (i2 = 0; i2 < cart.length; i2++){
      if (cart[i2].title == product.title){
        cart[i2].quantity++;
        trigger = true;
      }
    }
    if (trigger != true)
      {
        cart.push(new Cart(product));
      }
  }
}

function loadProducts() {
  const entity = ['Shirt', 'Shoes', 'Hat', 'Pants', 'Skirt', 'Jacket'];
  const colors = ['Red', 'White', 'Black', 'Green', 'Yellow'];
  for(let i = 0; i < 9; i++) {
    const title = entity[_.random(0, entity.length - 1)] + ' ' + colors[_.random(0, colors.length - 1)]
    products.push( new Product(title, _.random(10, 999), `img/${i + 1}.png`) );
  }
}

function drawProductCard(product) {
  const cardEl = document.createElement('DIV');
  const imgEl = document.createElement('IMG');
  const titleEl = document.createElement('P');
  const priceEl = document.createElement('P');
  const btnEl = document.createElement('BUTTON')

  cardEl.classList.add('product-card');
  imgEl.classList.add('product-card__img');
  titleEl.classList.add('product-card__title');
  priceEl.classList.add('product-card__price');
  btnEl.classList.add('product-card__btn');

  imgEl.setAttribute('src', product.img);
  titleEl.textContent = product.title;
  priceEl.textContent = product.price + '$';
  btnEl.textContent = 'В Корзину';
  btnEl.setAttribute('data-id', product.id)

  cardEl.append(imgEl);
  cardEl.append(titleEl);
  cardEl.append(priceEl);
  cardEl.append(btnEl);

  mainEl.append(cardEl);
}

function drawProducts() {
  for(let product of products) {
    drawProductCard(product)
  }
}

loadProducts();
drawProducts();
refreshCart(cart);

mainEl.addEventListener('click', function (e){
  for (i = 0; i < products.length; i++){  
    if (e.target == document.querySelector('[data-id="'+String(i)+'"]')){
      products[i].quantity++;
      addToCart(products[i],cart);
      refreshCart(cart);
    }
  }
}, true)