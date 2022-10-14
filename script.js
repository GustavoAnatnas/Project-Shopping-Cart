const cartItems = document.querySelector('.cart__items');
const cartItens = document.querySelector('ol.cart__items');
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}
function calculateTotalPrice() {
  const listItems = document.querySelectorAll('.cart__item');
  const totalPrice = document.querySelector('.total-price');
  let total = 0;
  listItems.forEach((item) => {
    const price = item.innerText.split('$');
    total += parseFloat(price[1]);
  });
  totalPrice.innerText = `Total da Compra: R$ ${total}`;
}

function loading() {
  const itemLoading = document.querySelector('.items');
  const newParagraph = document.createElement('p');
  newParagraph.className = 'loading';
  newParagraph.innerText = 'Carregando...';
  itemLoading.appendChild(newParagraph);
}
loading();

function removeLoading() {
  const itemLoading = document.querySelector('.items');
  const newParagraph = document.querySelector('.loading');
  itemLoading.removeChild(newParagraph);
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

const saveCartLocal = () => {
localStorage.setItem('cartItems', cartItems.innerHTML);
};

function cartItemClickListener(event) {
  event.target.remove();
  saveCartLocal();
}

function emptyCart() {
  const emptyCar = document.querySelector('.empty-cart');
  emptyCar.addEventListener('click', function () {
    cartItems.innerHTML = '';   
    saveCartLocal();
  });
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  saveCartLocal();
  calculateTotalPrice();
  return li;
}

const getProductByID = async (event) => {
  const getId = event.target.parentNode.firstChild.innerText;
  const productId = await fetchItem(getId);

    const produts = createCartItemElement({
      sku: productId.id, 
      name: productId.title, 
      salePrice: productId.price,
      image: productId.thumbnail,
     });
     cartItems.appendChild(produts); 
     saveCartLocal();
     calculateTotalPrice();
  };

function createProductItemElement({ sku, name, image, price }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('span', 'item__price', `R$ ${price}`));
  const addButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  addButton.addEventListener('click', getProductByID);
  section.appendChild(addButton);
  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

const getElements = async () => {
  const products = await fetchProducts('computador');
  const { results } = products;
  results.forEach((produtos) => {
      const { id, title, thumbnail, price } = produtos;
      const produts = {
         sku: id, 
         name: title, 
         image: thumbnail,
         price,
        };
        const section = document.querySelector('.items');
      section.appendChild(createProductItemElement(produts));
    });
};

const sumValue = () => { 
  const total = document.querySelector('.total-price');
  total.innerText = 'Total da Compra:';
};

const loadLocalStorage = () => {
  const listItem = localStorage.getItem('cartItems');
  cartItems.innerHTML = listItem;
};

const removeItemAfterLoad = (remov) => {
  cartItens.addEventListener('click', remov);
};

window.onload = async () => {  
  await getElements();
  emptyCart();
  sumValue();
  loadLocalStorage();
  removeItemAfterLoad(cartItemClickListener);
  removeLoading();
  };
