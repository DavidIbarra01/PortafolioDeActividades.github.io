let btnIniciarJuego = document.getElementById("btnIniciarJuego");
let PoderGirarCarta = true;
let cartasVolteadas = [];

function CompararCartas(){

    let [carta1, carta2] = cartasVolteadas
    if (carta1.getAttribute("data-ReferenciaReal") == carta2.getAttribute("data-ReferenciaReal")) {
        PoderGirarCarta = true;
        cartasVolteadas = [];
    }else{
        setTimeout(() => {
            carta1.src = "./Figures/CartaReverso.png";
            carta2.src = "./Figures/CartaReverso.png";
            cartasVolteadas = []; // vaciamos
            PoderGirarCarta = true;
        }, 1000);// 1 segundo
        
    }
}

// Al hacer clic en una carta:
function prueba(event) {
    let carta = event.target;

    if (PoderGirarCarta == true) {
        cartasVolteadas.push(carta);
    }
        
    // Si está mostrando el reverso, muéstrala

    if (carta.src.includes("CartaReverso.png") && PoderGirarCarta == true) {
        carta.src = carta.getAttribute("data-ReferenciaReal");
    } 

if (cartasVolteadas.length >= 2) {
    PoderGirarCarta = false;
    CompararCartas();
    }

    // Ejemplo visual (solo para probar interactividad)
    btnIniciarJuego.style.backgroundColor = "red";
}
