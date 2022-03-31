const getSavedCartItems = () => {
  const cartItems = document.querySelector('.cart__items');
  const listItens = localStorage.getItem('cartItems');
  cartItems.innerHTML = listItens;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
