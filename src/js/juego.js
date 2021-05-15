import {listaJugadores } from "..";
const _ = require('underscore');

const divCartasJugadores = document.querySelector('.cartas-jugadores'),
      divGanador         = document.querySelector('.div-ganador'),
      btnPedir           = document.querySelector('#btnPedir'),
      btnDetener         = document.querySelector('#btnDetener'),
      btnNuevo           = document.querySelector('#btnNuevo');

let deck               = [],
    jugadoresDetenidos = 0,
    turnoJugador       = 0;

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

        jugadores.sort(function(a, b){return b - a});

        ganador = noPerdedores.find(elemento => elemento.puntos === jugadores[0]);

        divGanador.classList.remove('hidden');

        const puntajeGanador     = document.querySelector('h2'),
              fraseGanador       = document.querySelector('.h1ganador');

        fraseGanador.innerHTML = `El ganador es: ${ganador.nombre} <span class="red">¡Felicitaciones!</span>`;
        puntajeGanador.innerText = `Con una puntuación de: ${ganador.puntos} puntos`;

        btnPedir.disabled = true;
        btnDetener.disabled = true;

    }
    
}

btnPedir.addEventListener('click', () => {

    console.log(turnoJugador);

    const puntosHTML = document.querySelectorAll('small');
    const divImg     = document.querySelectorAll('.div-carta');

    const carta = pedirCarta(),
          valor = valorCarta(carta);

    const imgCarta = document.createElement('img');

    imgCarta.src = `assets/cartas/${carta}.png`;

    imgCarta.classList.add('carta');

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

        }

    }

    (turnoJugador < listaJugadores.lista.length - 1) ? turnoJugador ++
                                                     : turnoJugador = 0;

    determinarGanador();

})

btnDetener.addEventListener('click', () => {

    const jugadorDetenidoHTML = document.querySelectorAll('small');

    if (listaJugadores.lista[turnoJugador].detenido === false) {
    
        jugadorDetenidoHTML[turnoJugador].innerText += ' (Detenido)';
        jugadoresDetenidos++;
    
    } else {

        alert(`${jugadorDetenidoHTML[turnoJugador].innerText} está detenido, por favor presiona "Detener" nuevamente para proceder con el siguiente turno (hazlo hasta dar con el siguiente turno que no esté detenido :) )`);
        
    }

    listaJugadores.lista[turnoJugador].detenido = true;

    (turnoJugador < listaJugadores.lista.length - 1) ? turnoJugador ++
                                                     : turnoJugador = 0;

    determinarGanador();
                                                        
})

btnNuevo.addEventListener('click', () => {

    location.reload();

})