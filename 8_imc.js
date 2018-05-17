function textoImc(imc){
    if (imc < 16){
        document.getElementById("resuNomi").value = "Estás desnutrido";
        document.getElementById("imagen").src = "https://www.portaleducativo.net/biblioteca/esqueleto_en%20movimiento.jpg";
    }
    else if (imc >= 16 && imc < 18){ // sse podría poner solo else if (imc < 18), en el siguiente else if < 25 ...
        document.getElementById("resuNomi").value = "Estás delgado";
        document.getElementById("imagen").src = "http://i.espectaculos.televisa.com/2017/10/delgado.jpg";
    }
    else if (imc >= 18 && imc < 25){
        document.getElementById("resuNomi").value = "Estás normal";
        document.getElementById("imagen").src = "https://st2.depositphotos.com/2451847/6843/i/950/depositphotos_68430311-stock-photo-stomach-of-children-with-normal.jpg";
    }
    else if (imc >= 25 && imc < 31){
        document.getElementById("resuNomi").value = "Tienes sobrepeso";
        document.getElementById("imagen").src = "https://marcianosmx.com/wp-content/uploads/2011/10/de_musculoso_a_gordo_antes_despues_640_56.jpg";
    }
    else {
        document.getElementById("resuNomi").value = "Estás obeso";
        document.getElementById("imagen").src = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Jabba_the_Hutt_%2810585038414%29.jpg/1200px-Jabba_the_Hutt_%2810585038414%29.jpg";
    }
}

function Persona (peso, altura)
{
    this.peso = peso;
    this.altura = altura;
    this.imc = peso/(altura*altura);
    var a = peso/(altura*altura);
    this.textoImc = textoImc(a);
}

pedro = new Persona(80, 1.80);
console.log(pedro.peso);
console.log(pedro.altura);
console.log(pedro.imc);
console.log(pedro.textoImc);

function calculaImc(){

    persona = new Persona (document.getElementById("peso").value, document.getElementById("altura").value);
    document.getElementById("numerico").value = persona.imc;
}