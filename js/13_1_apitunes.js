"use strict";
var xmlHttp;
var url; 
var lista;
var tabla;
var precio_total;
var canciones_pedidas;
const DIR_SERV_ENVIAR = "http://10.1.2.10:8080/appwebprofe/Comprar";

onload = inicio;

function inicio(){
    xmlHttp = new XMLHttpRequest();
    tabla = document.getElementById("tabla");
    precio_total = 0;
    canciones_pedidas = new Array();
}

function procesarEventosRecibir(){
    if  (xmlHttp.readyState == 4 && xmlHttp.status == 200){
    lista = xmlHttp.responseText; 
    lista = JSON.parse(lista);
    lista = lista.results;
    console.log(lista);
    imprimirLista();
    } 
    else {
        lista = "ERROR";
    } 
}

function procesarEventosEnviar(){
    console.log("Procesar eventos Invocado Enviar " + xmlHttp.readyState + ". Status " + xmlHttp.status);
    console.log(xmlHttp.getAllResponseHeaders());
    if  (xmlHttp.readyState == 4 && xmlHttp.status == 200){
        document.getElementById("tabla").innerHTML = "Pedido enviado";
        document.getElementById("boton_compra").hidden = true;
        window.open("https://www.paypal.com/signin?country.x=ES&locale.x=es_ES", "new");
        
    } 
    else {
        document.getElementById("tabla").innerHTML = "Error de conexión. Pedido no enviado";
    }
}


function obtenerListaRemota(){
    buscando();
    xmlHttp.onreadystatechange = procesarEventosRecibir;
    xmlHttp.open('GET', url, true); 
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(null);
}

function buscarCancion(){
    busqueda = document.getElementById("caja").value;
    url = "https://itunes.apple.com/search?term=" + busqueda + "&media=music&limit=20";
    console.log(url);
    obtenerListaRemota();
}

function imprimirLista() {
    document.getElementById("gif").hidden = true;
    
    var cancion;
    array_fila = new Array();
    var array_campos = ["Título", "Artista","Imagen","Preview", "Precio", "Seleccionar"];

    if (lista.length > 0){
            crearCabecera(array_campos);

        for(i = 0; i < lista.length; i++){
            cancion = document.createElement("TR");
            cancion.id = "cancion" + i;
            if ( i%2 == 0){
                cancion.style.background = "#DFF0FF";
            }
            else {
                cancion.style.background = "#DFFFF0";
            }
            tabla.appendChild(cancion);
            array_fila = [
                        lista[i].trackName, 
                        lista[i].artistName,
                        "<img src=" +lista[i].artworkUrl100 +">",
                        "<audio src=" + lista[i].previewUrl + " controls>",
                        (lista[i].trackPrice + 2) + " " + lista[i].currency,
                        "<input type='checkbox' name ='comprar' id = 'checkbox" + i + "' value='" + lista[i].trackId + "'>"
                        ];
            crearFila(i, array_fila);
            document.getElementById("boton_compra").hidden = false;
        }
    }
    else {
        tabla.innerHTML = "No hay resultados para tu busqueda";
    }

}

function buscando(){

    document.getElementById("gif").hidden = false;
    document.getElementById("tabla").innerHTML = "";
}

function crearCabecera(array){
    var cab;
    for (i=0; i < array.length; i++){
        cab = document.createElement("TH");
        cab.innerHTML = array[i];
        tabla.appendChild(cab);
    }
}

function crearFila(fila_num, array){
    var celda;
    var fila = document.getElementById("cancion" + fila_num);
    var i;
    for (i = 0; i < array.length ; i++) {
        celda = document.createElement("TD");
        celda.innerHTML = array[i];
        fila.appendChild(celda);
    }
}

function comprar(){
    var i;
    precio_total = 0;
    canciones_pedidas = [];
    for (i=0; i < lista.length; i++){
        checkbox = document.getElementById("checkbox"+i);
        if (checkbox.checked){
            precio_total = precio_total + lista[i].trackPrice + 2;
           canciones_pedidas.push(checkbox.value);
        }
        console.log (precio_total);
        console.log (canciones_pedidas);
    }
    if (precio_total > 0){
        enviarCompra();
    }
    else {
        alert ("No has seleccionado ninguna canción");
    }
}

function enviarCompra(){
    
    precio_total = precio_total.toFixed(2);
    var pedido = {
        precio_pedido:precio_total,
        lista_ids:canciones_pedidas
    };
    var pedido_json = JSON.stringify(pedido);
    xmlHttp.onreadystatechange = procesarEventosEnviar;
    xmlHttp.open('POST', DIR_SERV_ENVIAR,true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(pedido_json);
 }