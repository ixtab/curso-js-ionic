/* 
var mi_cadena = new String ("Jose");
console.log (mi_cadena);
console.log (mi_cadena.valueOf());
console.log (mi_cadena.toUpperCase());
var n_aleatorio = Math.random();
console.log (n_aleatorio);
*/

function Dni (numero1) // Función constructura, crea el tipo. 
{
    this.numero = numero1;
    this.mitad = numero1 / 2;
}
Dni.prototype = // Define el prototipo. ("Herencia")
{
    calcularLetra : function ()
    {
        var letra = '';
        var LETRAS_DNI = "TRWAGMYFPDXBNJZSQVHLCKE";
        letra = LETRAS_DNI.charAt(this.numero%23);
        return letra;
    }    
}

// metodo estatico
Dni.esValido = function (cadena)
    {
        var  valido = false;

      /*  if (isNaN(cadena)){
            valido = false;
        }
        else {
            valido = true;
        }        */
        valido = !isNaN(cadena)&&(cadena>0);

        return valido;
    }


var dni = new Dni (52366841);

console.log (dni.numero);
console.log (dni.mitad);
console.log (dni.__proto__);
var letra = dni.calcularLetra();
console.log (letra);

console.log (Dni.esValido(4));
console.log (Dni.esValido(4.4));
console.log (Dni.esValido('4'));
console.log (Dni.esValido("cuatro"));