const RASP_RESPONSE = "tp04/g03/mqtt/response/rasp/value"
const RASP_REQUEST = "tp04/g03/mqtt/request/rasp/value"
const APP_RESPONSE = "tp04/g03/mqtt/response/app/value"
const APP_HISTORY = "tp04/g03/app/history"

const ledIcon = document.querySelector(".led-icon")
const switchLed = document.querySelector(".led-button-item")
const checkboxLed = document.getElementById("switch-led")
const nodeIndicator = document.getElementById("node-indicator")
const brokerIndicator = document.getElementById("broker-indicator")

let brokerIsConnected = false;
let nodeIsConnected = false;
let nextStateLed = false;

const btt_settings = document.getElementById("settings");

btt_settings.addEventListener("click", () => {
  modal.classList.toggle("active");
});

switchLed.addEventListener("click", () => {
  if (brokerIsConnected && nodeIsConnected) {
    if (nextStateLed) {
      client.send(TOPIC_REQUEST, "0x06", 2);
    } else {
      client.send(TOPIC_REQUEST, "0x07", 2);
    }
  }
});

let pahoConfig = {
  hostname: "10.0.0.101", //The hostname is the url, under which your FROST-Server resides.
  port: 9001, //The port number is the WebSocket-Port,
  // not (!) the MQTT-Port. This is a Paho characteristic.
  clientId: "APP-TP04/G03", //Should be unique for every of your client connections.
};

let client = new Paho.MQTT.Client(
  pahoConfig.hostname,
  Number(pahoConfig.port),
  pahoConfig.clientId
);
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

client.connect({
  userName: "aluno",
  password: "@luno*123",
  onSuccess: onConnect,
  onFailure: onFailureConnect,
  reconnect: true,
});

function onFailureConnect() {
  console.log("Falha ao tentar se conectar");
}

function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("Conexão estabelecida");
  client.subscribe(RASP_REQUEST);
  client.subscribe(RASP_RESPONSE);
  client.subscribe(APP_HISTORY);
  brokerIsConnected = true;
  setConnectionStatus(brokerIndicator, brokerIsConnected);
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
  brokerIsConnected = false;
  setConnectionStatus(brokerIndicator, brokerIsConnected);
}

function onMessageArrived(message) {
  console.log(message.destinationName);
  console.log(message.payloadString);

  if (message.destinationName == RASP_RESPONSE) {
    if (message.payloadString == "l0") {
      checkboxLed.checked = true;
      nextStateLed = false;
      ledIcon.style.color = "#ffcc00";
    } else if (message.payloadString == "l1") {
      checkboxLed.checked = false;
      nextStateLed = true;
      ledIcon.style.color = "#fff";
    } else if (message.payloadString == "n0") {
      nodeIsConnected = true;
    } else if (message.payloadString == "n1") {
      nodeIsConnected = false;
    }
  } else if (message.destinationName == RASP_REQUEST) {
    if (message.payloadString == "0x0A") {
      client.send(APP_RESPONSE, "0x201");
    }
  }
}

function setConnectionStatus(element, status) {
  if (status) {
    element.classList.remove("disconnected");
    element.classList.add("connected");
  } else {
    element.classList.remove("connected");
    element.classList.add("disconnected");
  }
}
