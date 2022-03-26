const fetchProducts = async (produto) => {
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  const result = await fetch(url);
  // console.log(result);
  const data = await result.json();
    console.log(data);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
