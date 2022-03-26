const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('Teste a função saveCartItems', () => {
  it('1 - Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado', () => {
    saveCartItems("<ol><li>Item</li></ol>")
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('2 - Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro cartItems e o segundo sendo o valor passado como argumento para saveCartItems.', () => {
    saveCartItems("<ol><li>Item</li></ol>")
    expect(localStorage.setItem).toHaveBeenLastCalledWith('cartItems','<ol><li>Item</li></ol>');
  });
});
