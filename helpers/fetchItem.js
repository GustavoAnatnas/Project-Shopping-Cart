const fetchItem = async (id) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${id}`;
  const result = await fetch(url);
  console.log(result);
  const data = await result.json();
  console.log(data);
  };

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
