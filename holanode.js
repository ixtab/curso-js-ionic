function darVuelta(cadena) {
    var cadenaReves = "";
    var longitud = cadena.length - 1;
    while (longitud >= 0) {
        cadenaReves = cadenaReves + cadena.charAt(longitud);
        longitud--;
        console.log(cadenaReves);
    }
    
    return cadenaReves;
}
console.log (darVuelta("Hola Node"));
