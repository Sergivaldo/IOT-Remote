const TOPIC_RESPONSE = "tp04/g03/mqtt/response/value"
const TOPIC_NODE_CONECTION = "tp04/g03/node/status"
const TOPIC_REQUEST = "tp04/g03/mqtt/request/value"

const ledIcon = document.querySelector(".led-icon")
const switchLed = document.querySelector(".led-button-item")
const checkboxLed = document.getElementById("switch-led")
const nodeIndicator = document.getElementById("node-indicator")
const brokerIndicator = document.getElementById("broker-indicator")
let brokerIsConnected = false
let nodeIsConnected = false
let nextStateLed = false

switchLed.addEventListener("click",()=>{
    if(brokerIsConnected && nodeIsConnected){
        if(nextStateLed){
            client.send(TOPIC_REQUEST,"0x06",2)
        }else{
            client.send(TOPIC_REQUEST,"0x07",2)
        }
    }
})

let pahoConfig = {
    hostname: "broker.hivemq.com",  //The hostname is the url, under which your FROST-Server resides.
    port: 8000,           //The port number is the WebSocket-Port,
                            // not (!) the MQTT-Port. This is a Paho characteristic.
    clientId: "ClientId"    //Should be unique for every of your client connections.
}

client = new Paho.MQTT.Client(pahoConfig.hostname, Number(pahoConfig.port), pahoConfig.clientId);
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

client.connect({
    onSuccess: onConnect,
    onFailure:onFailureConnect,
    reconnect:true,
})

function onFailureConnect(){
    console.log("Falha ao tentar se conectar")
}

function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Conexão estabelecida");
    brokerIsConnected = true
    client.subscribe(TOPIC_RESPONSE)
    client.subscribe(TOPIC_NODE_CONECTION)
    setConnectionStatus(brokerIndicator,brokerIsConnected)
    client.send(TOPIC_REQUEST,"0x08")
}

function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
    brokerIsConnected = false
    setConnectionStatus(brokerIndicator,brokerIsConnected)
}

function onMessageArrived(message) {
    console.log(message.destinationName)
    console.log(message.payloadString)
    if(message.destinationName == TOPIC_RESPONSE){
        if(message.payloadString == "l0"){
            checkboxLed.checked = true
            nextStateLed = false
            ledIcon.style.color="#ffcc00"
        }else if(message.payloadString == "l1"){
            checkboxLed.checked = false
            nextStateLed = true
            ledIcon.style.color="#fff"
        }
    }else if(message.destinationName == TOPIC_NODE_CONECTION){
        if(message.payloadString == "0x200"){
            if(!nodeIsConnected){
                nodeIsConnected = true
                setConnectionStatus(nodeIndicator,nodeIsConnected)
                client.send(TOPIC_REQUEST,"0x09")
            }
        }
    }
}

function setConnectionStatus(element,status){
    if(status){
        element.classList.remove("disconnected")
        element.classList.add("connected")
    }else{
        element.classList.remove("connected")
        element.classList.add("disconnected")
    }
    
}

function checkNodeConnection(){
    client.send(TOPIC_NODE_CONECTION,"0x08")
}


