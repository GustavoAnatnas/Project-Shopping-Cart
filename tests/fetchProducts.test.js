require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('Teste a função fecthProducts', () => {
  it('1 - Teste se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('2 - Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada;', async () => {
    fetchProducts("computador");
    expect(fetch).toHaveBeenCalled();
  });
  it('3 - Teste se, ao chamar a função fetchProducts com o argumento "computador" ', async () => {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=computador`
    fetchProducts("computador");
    expect(fetch).toHaveBeenCalledWith(url);
  });
  it('4 - Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    expect(await fetchProducts ('computador')).toEqual(computadorSearch);
  });
  it('5 - Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    try {
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });
});
