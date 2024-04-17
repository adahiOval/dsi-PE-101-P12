/**
 * Durante prácticas anteriores, debería haber escrito en alguna clase métodos para añadir, modificar, borrar y actualizar la información de una carta de la colección de un usuario:

    Escoja dos de esos métodos y haga uso de llamadas a los métodos del API asíncrona basada en promesas de Node.js para gestionar el sistema de ficheros.
    Haga que sus propios métodos devuelvan promesas.
    Modifique el código fuente que invoca a dichos métodos para gestionar las promesas devueltas por los mismos.
    Lleve a cabo pruebas de ambos métodos.
*/

import fs from 'fs/promises';
import path from 'path';

export interface Card {
    type: string,
    color: string,
    name: string
}

export const writeCardPromise = (user: string, card: Card) => {
    return new Promise<string>((resolve, reject) => {
        const __dirname = path.dirname(new URL(import.meta.url).pathname);
        const route = path.join(__dirname, `database/users/${user}/${card.name}.json`);

        fs.writeFile(route, JSON.stringify(card))
            .then(() => {
                resolve('Escritura realizada correctamente');
            })
            .catch(() => {
                reject('Error al escribir la carta.');
            });
    });
}

export const readCardPromise = (user: string, card: string) => {
    return new Promise<Card>((resolve, reject) => {
        const __dirname = path.dirname(new URL(import.meta.url).pathname);
        const route = path.join(__dirname, `database/users/${user}/${card}.json`);
    
        fs.readFile(route, 'utf-8')
            .then((card) => {
                resolve(JSON.parse(card));
            })
            .catch(() => {
                reject('Error al leer la carta')
            });
    });
}