const TOPIC_RESPONSE = "node/response"
const TOPIC_NODE_CONECTION = "node/status"
const TOPIC_REQUEST = "node/request"

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
            client.send(TOPIC_REQUEST,"1")
        }else{
            client.send(TOPIC_REQUEST,"0")
        }
    }
})

let pahoConfig = {
    hostname: "broker.emqx.io",  //The hostname is the url, under which your FROST-Server resides.
    port: 8083,           //The port number is the WebSocket-Port,
                            // not (!) the MQTT-Port. This is a Paho characteristic.
    clientId: "ClientId"    //Should be unique for every of your client connections.
}

client = new Paho.MQTT.Client(pahoConfig.hostname, Number(pahoConfig.port), pahoConfig.clientId);
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

client.connect({
    onSuccess: onConnect,
    reconnect:true,
});

function onConnect() {
// Once a connection has been made, make a subscription and send a message.
console.log("Conexão estabelecida");
brokerIsConnected = true
client.subscribe(TOPIC_RESPONSE)
client.subscribe(TOPIC_NODE_CONECTION)
setConnectionStatus(brokerIndicator,brokerIsConnected)
client.send(TOPIC_NODE_CONECTION,"000")
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
        if(message.payloadString == "led_on"){
            checkboxLed.checked = true
            nextStateLed = false
            ledIcon.style.color="#ffcc00"
        }else if(message.payloadString == "led_off"){
            checkboxLed.checked = false
            nextStateLed = true
            ledIcon.style.color="#fff"
        }
    }else if(message.destinationName == TOPIC_NODE_CONECTION){
        if(message.payloadString == "200"){
            nodeIsConnected = true
            setConnectionStatus(nodeIndicator,nodeIsConnected)
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
    client.send(TOPIC_NODE_CONECTION,"000")
}


