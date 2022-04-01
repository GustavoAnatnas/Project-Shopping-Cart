const saveCartItems = (item) => {
  localStorage.setItem('cartItems', item);
  // console.log(item);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
