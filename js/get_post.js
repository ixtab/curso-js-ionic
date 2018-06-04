xmlHttp = new XMLHttpRequest();

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

        
    } 
    else {
        document.getElementById("tabla").innerHTML = "Error de conexión.";
    }
}

function obtener(){

    xmlHttp.onreadystatechange = procesarEventosRecibir;
    xmlHttp.open('GET', url, true); 
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(null);
}

function enviar(){
    busqueda = document.getElementById("caja").value;
    url = "https://itunes.apple.com/search?term=" + busqueda + "&media=music&limit=20";
    console.log(url);
    
}