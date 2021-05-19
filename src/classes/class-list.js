export class ListaJugadores {

    constructor() {

        this.cargarSessionStorage();

    }

    nuevoJugador(jugador) {

        this.lista.push(jugador);
        this.guardarSessionStorage();

    }

    guardarSessionStorage() {

        sessionStorage.setItem('lista', JSON.stringify(this.lista));

    }

    cargarSessionStorage() {

        this.lista = (sessionStorage.getItem('lista')) ? this.lista = JSON.parse(sessionStorage.getItem('lista'))
                                                       : this.lista = [];


    }
    
}
