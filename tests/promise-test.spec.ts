import 'mocha';
import {expect} from 'chai';
import {writeCardPromise, readCardPromise, Card} from '../src/PromiseFunctions.js'

describe('Callback write and read Tests', () => {

  const card1: Card = {
    type: "land",
    color: "green",
    name: "The Greenery"
  }

  const card2: Card = {
    type: "planeswalker",
    color: "red",
    name: "The Red Boy"
  }

  const card3: Card = {
    type: "planeswalker",
    color: "red",
    name: "test1"
  }

  const expectedCard1: Card = {
    type: "land",
    color: "blue",
    name: "The Great Tester"
  }

  describe('ReadCard Tests', () => {
    it("readCard funciona correctamente, debería leer con éxito", () => {
      return readCardPromise('adahi', 'test1').then((response) => {
        expect(response).to.deep.eq(card3);
      })
    });

    it("Debería leer con éxito", () => {
      return readCardPromise('adahi', 'The Greenery').then((response) => {
        expect(response).to.deep.eq(card1);
      })
    });

    it("Debería leer con éxito una carta con espacios en el nombre", () => {
      return readCardPromise('adahi', 'The Great Tester').then((response) => {
        expect(response).to.deep.eq(expectedCard1);
      })
    });

    it("Debería leer con éxito una carta planeswalker", () => {
      return readCardPromise('adahi', 'The Red Boy').then((response) => {
        expect(response).to.deep.eq(card2);
      })
    });

    it("readCard funciona correctamente, debería saltar error cuando no se encuentra", () => {
      return readCardPromise('adahi', 'test12').catch((response) => {
        expect(response).to.deep.eq('Error al leer la carta');
      })
    });

    it("readCard funciona correctamente, debería saltar error cuando no existe el user", () => {
      return readCardPromise('pepito', 'test1').catch((response) => {
        expect(response).to.deep.eq('Error al leer la carta');
      })
    });

    it("readCard funciona correctamente, debería saltar error cuando no existe el user ni la carta", () => {
      return readCardPromise('fulanito', 'test123').catch((response) => {
        expect(response).to.deep.eq('Error al leer la carta');
      })
    });

  });

  describe('WriteCard Tests', () => {
    
    it("WriteCard funciona correctamente, debería escribir con éxito", () => {
      return writeCardPromise('adahi', card1).then((response) => {
        expect(response).to.eq('Escritura realizada correctamente');
      })
    });

    it("Debería escribir con éxito la carta 3", () => {
      return writeCardPromise('adahi', card3).then((response) => {
        expect(response).to.eq('Escritura realizada correctamente');
      })
    });

    it("Debería escribir con éxito un planeswalker", () => {
      return writeCardPromise('adahi', card2).then((response) => {
        expect(response).to.eq('Escritura realizada correctamente');
      })
    });

    it("Debería escribir con éxito un planeswalker", () => {
      return writeCardPromise('adahi', expectedCard1).then((response) => {
        expect(response).to.eq('Escritura realizada correctamente');
      })
    });

    it("WriteCard funciona correctamente, debería devolver error cuando el user no existe", () => {
      return writeCardPromise('pepito', card1).catch((response) => {
        expect(response).to.eq('Error al escribir la carta.');
      })
    });

    it("Debería devolver error cuando el user no existe y la carta sí", () => {
      return writeCardPromise('menganito', card3).catch((response) => {
        expect(response).to.eq('Error al escribir la carta.');
      })
    });

    it("Debería devolver error cuando la ruta es incorrecta", () => {
      return writeCardPromise('fulanito', card2).catch((response) => {
        expect(response).to.eq('Error al escribir la carta.');
      })
    });

  });

});