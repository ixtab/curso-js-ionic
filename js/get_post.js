xmlHttp = new XMLHttpRequest();

function procesarEventosRecibir(){
    if  (xmlHttp.readyState == 4 && xmlHttp.status == 200){
    recibido = xmlHttp.responseText; 
    
    } 
    else {
        recibido = "ERROR";
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
    xmlHttp.open('GET', DIR_SERV_REC, true); 
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(null);
}

function enviar(){
    xmlHttp.onreadystatechange = procesarEventos;
    xmlHttp.open('POST', DIR_SERV_ENV,true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(json);
    
}