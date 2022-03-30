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

function cartItemClickListener(event) {
  event();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__items';
  li.innerText = `${sku} ${name} \n $${salePrice} \n\n`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const getProductByID = async (event) => {
  const getId = event.target.parentNode.firstChild.innerText;
  const productId = await fetchItem(getId);

    const produts = createCartItemElement({
      sku: productId.id, 
      name: productId.title, 
      salePrice: productId.price,
     });
     const cartItems = document.querySelector('.cart__items');
     cartItems.appendChild(produts); 
  };

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
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
      const { id, title, thumbnail } = produtos;
      const produts = {
         sku: id, 
         name: title, 
         image: thumbnail,
        };
        const section = document.querySelector('.items');
      section.appendChild(createProductItemElement(produts));
  });
};

window.onload = async () => { 
  await getElements();
};
