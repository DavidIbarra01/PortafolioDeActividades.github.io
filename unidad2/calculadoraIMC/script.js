
//MIS VARIABLES

//Inputs

let SMTButton = document.getElementById("submit");

//Funcion que se llama al pulsar el boton de enviar.
SMTButton.addEventListener("click", function(){
    let imagenTipo = document.getElementById("img_Entidad");

let inputEstatura = document.getElementById("input_Estatura");
let inputPeso = document.getElementById("input_Peso");

let peso = parseFloat(inputPeso.value);
let estatura = parseFloat(inputEstatura.value);

    let IMC = peso/ (estatura * estatura);
   
    if (IMC <= 18.49) {
         imagenTipo.setAttribute("src", "./img/infrapeso.png");

    }
    if (IMC >= 18.50 && IMC <= 24.99) {
        imagenTipo.setAttribute("src", "./img/normal.png");
    }

    if (IMC >= 25 && IMC <= 29.99) {
        imagenTipo.setAttribute("src", "./img/sobrepeso.png");
    }

    if (IMC >= 30 && IMC <= 34.99) {
        imagenTipo.setAttribute("src", "./img/obesidad.png");
    }

    if (IMC >= 35 && IMC <= 39.99) {
        imagenTipo.setAttribute("src", "./img/obesidadM.png");
    }

    if (IMC >= 40) {
        imagenTipo.setAttribute("src", "./img/Venezolano.gif  ");
    }
})
