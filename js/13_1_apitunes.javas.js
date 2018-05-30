var xmlHttp;
var url; 
var lista;
var tabla;

onload = inicio;

function inicio(){
    xmlHttp = new XMLHttpRequest();
    tabla = document.getElementById("tabla");
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
    var array_fila = new Array;
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
                        "<input type='checkbox' name ='comprar' value='" + lista[i].trackId + "'>"
                        ]
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
