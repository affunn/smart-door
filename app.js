// ==========================
// MQTT CONFIG
// ==========================
const brokerUrl = "wss://broker.hivemq.com:8884/mqtt";
const topicControl = "pintu/control";
const topicStatus = "pintu/status";

// ==========================
// CONNECT MQTT
// ==========================
const client = mqtt.connect(brokerUrl);

client.on("connect", () => {
  console.log("MQTT Connected 🚀");
  client.subscribe(topicStatus);
});

client.on("error", (err) => {
  console.error("MQTT Error:", err);
});

// ==========================
// DOM ELEMENTS
// ==========================
const indicator = document.getElementById("indicator");
const btnOpen = document.getElementById("btnOpen");
const btnClose = document.getElementById("btnClose");

// ==========================
// BUTTON ACTIONS
// ==========================
btnOpen.addEventListener("click", () => {
  client.publish(topicControl, "OPEN");
});

btnClose.addEventListener("click", () => {
  client.publish(topicControl, "CLOSE");
});

// ==========================
// MQTT MESSAGE HANDLER
// ==========================
client.on("message", (topic, message) => {
  if (topic === topicStatus) {
    updateStatus(message.toString());
  }
});

// ==========================
// UPDATE UI STATUS
// ==========================
function updateStatus(status) {
  if (status === "OPEN") {
    indicator.innerText = "STATUS: TERBUKA";
    indicator.className =
      "mb-6 py-2 rounded-xl text-white font-semibold bg-green-500";
  } else if (status === "CLOSE") {
    indicator.innerText = "STATUS: TERTUTUP";
    indicator.className =
      "mb-6 py-2 rounded-xl text-white font-semibold bg-red-500";
  }
}
