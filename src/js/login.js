import _ from "underscore";
import { Jugador } from "../classes/jugador-class";
import {listaJugadores} from '../index'
import { activarComputadora, aggJugadorHTML, crearDeck, turnoComputadora } from "./juego";


const jug1 = document.querySelector('#uno'),
      jug2 = document.querySelector('#dos'),
      jug3 = document.querySelector('#tres'),
      jug4 = document.querySelector('#cuatro'),
      jug5 = document.querySelector('#cinco'),
      jug6 = document.querySelector('#seis'),
      jug7 = document.querySelector('#siete');

export const divLogin         = document.querySelector('.div-login'),
             txtInputJugador  = document.querySelector('#nombrejugador'),
             lista            = document.querySelector('ul'),
             divJugadoresHTML = document.querySelector('.listajugadores'),
             divBotones       = document.querySelector('.div-botones'),
             btnModificar     = document.querySelector('#modificar'),
             btnConfirmar     = document.querySelector('#confirmar');

let cantidadJugadores = 0,
    turno = 0;

btnConfirmar.disabled = true;
btnModificar.disabled = true;

const mostrarJugadorHTML = (jugador) => {

    const jugadorHTML =
    `
    <li>${jugador.nombre}</li>
    `;

    lista.innerHTML += jugadorHTML;
    
}

const eliminarDatos = () => {

    txtInputJugador.removeAttribute('disabled');
    listaJugadores.lista = [];
    lista.innerHTML = '';

}

const evaluarCambioJugadores = (nuevoNumero) => {

    if (cantidadJugadores !== nuevoNumero) {
        eliminarDatos();
    }
    
}

jug1.addEventListener('click', () => {

    evaluarCambioJugadores(1);
    cantidadJugadores = 1;

})

jug2.addEventListener('click', () => {

    evaluarCambioJugadores(2);
    cantidadJugadores = 2;

})

jug3.addEventListener('click', () => {

    evaluarCambioJugadores(3);
    cantidadJugadores = 3;

})

jug4.addEventListener('click', () => {

    evaluarCambioJugadores(4);
    cantidadJugadores = 4;

})

jug5.addEventListener('click', () => {

    evaluarCambioJugadores(5);
    cantidadJugadores = 5;

})

jug6.addEventListener('click', () => {

    evaluarCambioJugadores(6);
    cantidadJugadores = 6;

})

jug7.addEventListener('click', () => {

    evaluarCambioJugadores(7);
    cantidadJugadores = 7;

})

txtInputJugador.addEventListener('keyup', (event) => {

    if (event.keyCode === 13 && txtInputJugador.value.length > 0) {
        
        const nuevoJugador = new Jugador(txtInputJugador.value, turno);
    
        listaJugadores.nuevoJugador(nuevoJugador);

        mostrarJugadorHTML(nuevoJugador);

        divJugadoresHTML.classList.remove('hidden');

        txtInputJugador.value = '';

        turno++;

        if (listaJugadores.lista.length === cantidadJugadores) {

            txtInputJugador.setAttribute('disabled', "");
            btnModificar.disabled = false;
            btnConfirmar.disabled = false;
            
        }

    }
    
})

btnModificar.addEventListener('click', () => {

    eliminarDatos();

})

btnConfirmar.addEventListener('click', () => {

    if (cantidadJugadores === 1) {

        activarComputadora();
        
    }

    aggJugadorHTML();
    crearDeck();
    divLogin.classList.add('hidden');
    divBotones.classList.remove('hidden');

})