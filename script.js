const cartItems = document.querySelector('.cart__items');
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// const saveCartItensStorage = () => {
//   localStorage.setItem('carrinho', cartItems.innerHTML);
// };

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems();
}

function emptyCart() {
  const emptyCar = document.querySelector('.empty-cart');
  emptyCar.addEventListener('click', function () {
    cartItems.innerHTML = '';
    saveCartItems();
  });
}
function createCartItemElement({ sku, name, salePrice, image }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.appendChild(createProductImageElement(image));
  li.addEventListener('click', cartItemClickListener);
  saveCartItems();
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
     saveCartItems();
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
  total.innerText = 'Total da Compra:`';
};

window.onload = async () => {  
  await getElements();
  emptyCart();
  sumValue();
  getSavedCartItems();
  };
