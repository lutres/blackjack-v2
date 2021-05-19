import {listaJugadores } from "..";
import { Computadora } from "../classes/jugador-class";
import { divLogin } from "./login"
const _ = require('underscore');

const divCartasJugadores = document.querySelector('.cartas-jugadores'),
      divGanador         = document.querySelector('.div-ganador'),
      btnPedir           = document.querySelector('#btnPedir'),
      btnDetener         = document.querySelector('#btnDetener'),
      btnNuevo           = document.querySelector('.btnNuevo'),
      btnNuevoFinal      = document.querySelector('#btnNuevoFinal'),
      btnReiniciar       = document.querySelectorAll('.btnReiniciar'),
      btnCerrarModal     = document.querySelector('#cerrar-modal');

let deck               = [],
    jugadoresDetenidos = 0,
    turnoJugador       = 0,
    computadora        = false;

const tiposCartas      = ['C', 'D', 'H', 'S'],
      cartasEspeciales = ['A', 'J', 'Q', 'K'];

export const aggJugadorHTML = () => {

    for (let i = 0; i < listaJugadores.lista.length; i++) {
       
        divCartasJugadores.innerHTML += 
        `
        <div class="jugador">
            <div class="div-informacion">
                <h1>${listaJugadores.lista[i].nombre} -  <small>${listaJugadores.lista[i].puntos}</small></h1>
            </div>
            <div class="div-carta">
    
            </div>
        </div>
        ` 
           
       }

}

export const crearDeck = () => {

    deck = [];

    for (let i = 2; i <= 10; i++) {
        
        for (const tipo of tiposCartas) {
            deck.push(i + tipo)
        }
        
    }

    for (const especial of cartasEspeciales) {
        for (const tipo of tiposCartas) {
            deck.push(especial + tipo);
        }
        
    }

    deck = _.shuffle(deck);

}

const pedirCarta = () => {

    if (deck.length === 0) {
        alert('No hay más cartas en la baraja');
    }

    return deck.shift();

}

const valorCarta = (carta) => {

    let valor = carta.substring(0, carta.length - 1);

    //Si la carta es especial, asigna un valor entre 11 a 10 cuando es A o J,Q,K, respectivamente. Si no, convierte el valor de la carta a un valor numérico
    return (isNaN(valor))
            ? valor === 'A' ? valor = 11 : valor = 10
            : valor = valor * 1;

}

const determinarGanador = () => {

        if (jugadoresDetenidos === listaJugadores.lista.length) {

        let noPerdedores = listaJugadores.lista.filter(jugadores => jugadores.puntos <= 21),
            jugadores    = [],
            ganador;

        for (let i = 0; i < noPerdedores.length; i++) {
            
            jugadores.push(noPerdedores[i].puntos);
            
        }

        if (jugadores.length === 0) {

            setTimeout(() => {

                divGanador.classList.remove('hidden');
    
                const puntajeGanador     = document.querySelector('h2'),
                      fraseGanador       = document.querySelector('.h1ganador');
    
                fraseGanador.innerHTML   = `¡Nadie ganó!`;
                puntajeGanador.innerText = `Todos los jugadores tienen más de 21 puntos`;
    
            }, 350);
            
        } else {

            jugadores.sort(function(a, b){return b - a});

            ganador = noPerdedores.find(elemento => elemento.puntos === jugadores[0]);

            btnPedir.disabled   = true;
            btnDetener.disabled = true;

            setTimeout(() => {

                divGanador.classList.remove('hidden');

                const puntajeGanador     = document.querySelector('h2'),
                    fraseGanador       = document.querySelector('.h1ganador');

                fraseGanador.innerHTML   = `El ganador es: ${ganador.nombre} <span class="red">¡Felicitaciones!</span>`;
                puntajeGanador.innerText = `Con una puntuación de: ${ganador.puntos} puntos`;

            }, 350);

        }

    }

}

btnPedir.addEventListener('click', () => {

    const puntosHTML = document.querySelectorAll('small');
    const divImg     = document.querySelectorAll('.div-carta');

    const carta = pedirCarta(),
          valor = valorCarta(carta);

    const imgCarta = document.createElement('img');

    imgCarta.src = `assets/cartas/${carta}.png`;

    imgCarta.classList.add('carta');

    if (computadora === false) {

        for (const jugador of listaJugadores.lista) {
        
            if (jugador.turno === turnoJugador && jugador.detenido === false && jugador.puntos < 21) {
    
                divImg[jugador.turno].append(imgCarta);
                
                listaJugadores.lista[jugador.turno].puntos += valor;
    
                puntosHTML[jugador.turno].innerText = listaJugadores.lista[jugador.turno].puntos;
    
                if (jugador.puntos > 21) {
                    
                    puntosHTML[jugador.turno].innerText += ' ¡Has perdido!';
                    listaJugadores.lista[turnoJugador].detenido = true;
                    jugadoresDetenidos++;
    
                } else if (jugador.puntos === 21) {
    
                    puntosHTML[jugador.turno].classList.add('red');
                    puntosHTML[jugador.turno].innerText = `¡${listaJugadores.lista[jugador.turno].puntos}!`
                    listaJugadores.lista[turnoJugador].detenido = true;
                    jugadoresDetenidos++;
                    
                }
    
                break;
                
            } else if (jugador.turno === turnoJugador && jugador.detenido === true) {
    
                (turnoJugador < listaJugadores.lista.length - 1) ? turnoJugador ++
                                                                 : turnoJugador = 0;
    
            } else if (jugador.turno === turnoJugador && jugador.puntos > 21) {
    
                (turnoJugador < listaJugadores.lista.length - 1) ? turnoJugador ++
                                                                 : turnoJugador = 0;
    
            } else if (jugador.turno === turnoJugador && jugador.puntos === 21) {

                (turnoJugador < listaJugadores.lista.length - 1) ? turnoJugador ++
                                                                 : turnoJugador = 0;

            }
    
        }
    
        (turnoJugador < listaJugadores.lista.length - 1) ? turnoJugador ++
                                                         : turnoJugador = 0;

        determinarGanador();
        
    } else {

        divImg[0].append(imgCarta);
                
        listaJugadores.lista[0].puntos += valor;
    
        puntosHTML[0].innerText = listaJugadores.lista[0].puntos;
        
        if (listaJugadores.lista[0].puntos === 21) {
            
            puntosHTML[0].classList.add('red');
            puntosHTML[0].innerText = `¡${listaJugadores.lista[0].puntos}!`

        }
            
        if (listaJugadores.lista[0].puntos > 21 || listaJugadores.lista[0].detenido === true || listaJugadores.lista[0].puntos === 21) {

           turnoComputadora(listaJugadores.lista[0].puntos);
          
        }

    }

})

btnDetener.addEventListener('click', () => {

    const jugadorDetenidoHTML = document.querySelectorAll('small');

    if (computadora === false) {

        if (listaJugadores.lista[turnoJugador].detenido === false) {
    
            jugadorDetenidoHTML[turnoJugador].innerText += ' (Detenido)';
            jugadoresDetenidos++;
        
        } else {
    
            do {

                (turnoJugador < listaJugadores.lista.length - 1) ? turnoJugador ++
                                                                 : turnoJugador = 0;
                
            } while (listaJugadores.lista[turnoJugador].detenido === true);

            jugadorDetenidoHTML[turnoJugador].innerText += ' (Detenido)';
            jugadoresDetenidos++;
            
        }
    
        listaJugadores.lista[turnoJugador].detenido = true;
    
        (turnoJugador < listaJugadores.lista.length - 1) ? turnoJugador ++
                                                         : turnoJugador = 0;

        determinarGanador();
    
        
    } else {

        jugadorDetenidoHTML[0].innerText += ' (Detenido)';
        listaJugadores.lista[0].detenido = true;
        turnoComputadora(listaJugadores.lista[0].puntos);
        
    }

})

btnNuevo.addEventListener('click', () => {

    location.reload();
    sessionStorage.clear();

})

btnNuevoFinal.addEventListener('click', () => {

    location.reload();
    sessionStorage.clear();

})

export const activarComputadora = () => {

    computadora = true;
    const turnoComputadora = new Computadora;
    listaJugadores.nuevoJugador(turnoComputadora);

}

const turnoComputadora = (puntosMinimos) => {

    do {

        const puntosHTML = document.querySelectorAll('small');
        const divImg     = document.querySelectorAll('.div-carta');
    
        const carta = pedirCarta(),
              valor = valorCarta(carta);
    
        const imgCarta = document.createElement('img');
    
        imgCarta.src = `assets/cartas/${carta}.png`;
    
        imgCarta.classList.add('carta');

        divImg[1].append(imgCarta);

        listaJugadores.lista[1].puntos += valor;

        puntosHTML[1].innerText = listaJugadores.lista[1].puntos;

        if (puntosMinimos > 21) break;
        
    } while (listaJugadores.lista[1].puntos <= 21 && puntosMinimos > listaJugadores.lista[1].puntos);

    btnPedir.disabled   = true;
    btnDetener.disabled = true;

    setTimeout(() => {

        divGanador.classList.remove('hidden');

        const puntajeGanador     = document.querySelector('h2'),
            fraseGanador       = document.querySelector('.h1ganador');

        if (listaJugadores.lista[1].puntos > 21) {

            fraseGanador.innerHTML = `¡Ganaste! <span class="red">¡Felicitaciones!</span>`;
            puntajeGanador.innerText = `Con una puntuación de: ${listaJugadores.lista[0].puntos} puntos`;

        } else if (listaJugadores.lista[1].puntos <= 21 && listaJugadores.lista[1].puntos > puntosMinimos) {

            fraseGanador.innerHTML = `¡Ganó la computadora! ¡Vuelve a intentarlo!`;
            puntajeGanador.innerText = `Con una puntuación de: ${listaJugadores.lista[1].puntos} puntos`;

        } else if(listaJugadores.lista[1].puntos === puntosMinimos) {

            fraseGanador.innerHTML = `<span class="red">¡Empate!</span>`;
            puntajeGanador.innerText = `Con una puntuación de: ${listaJugadores.lista[0].puntos} puntos`;

        } else if (puntosMinimos > 21) { 
            
            fraseGanador.innerHTML = `¡Ganó la computadora! ¡Vuelve a intentarlo!`;
            puntajeGanador.innerText = `Con una puntuación de: ${listaJugadores.lista[1].puntos} puntos`;

        }

    }, 350);

}

const reiniciarPartida = () => {

    divCartasJugadores.innerHTML = '';
    listaJugadores.cargarSessionStorage();
    btnPedir.disabled   = false;
    btnDetener.disabled = false;
    jugadoresDetenidos  = 0;
    turnoJugador        = 0;
    crearDeck();
    aggJugadorHTML();

}

btnReiniciar[0].addEventListener('click', () => {

    reiniciarPartida();

})

btnReiniciar[1].addEventListener('click', () => {

    reiniciarPartida();
    divGanador.classList.add('hidden');
    
})

btnCerrarModal.addEventListener('click', () => {

    divGanador.classList.add('hidden');

})