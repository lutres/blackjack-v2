export class Jugador {

    constructor(jugador, turno) {

        this.nombre   = jugador;
        this.detenido = false;
        this.puntos   = 0;
        this.turno    = turno;

    }

}
export class Computadora {

    constructor() {

        this.nombre   = 'Computadora';
        this.activo   = false;
        this.detenido = false;
        this.puntos   = 0;

    }
}