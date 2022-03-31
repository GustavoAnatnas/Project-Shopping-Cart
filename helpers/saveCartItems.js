const saveCartItems = () => {
  const cartItems = document.querySelector('.cart__items');
  localStorage.setItem('cartItems', cartItems.innerHTML);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
