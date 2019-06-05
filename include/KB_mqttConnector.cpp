#include "KB_mqttConnector.h"
#include <MqttConnector.h>

extern MqttConnector *mqtt;

extern int relayPinState;
extern int relayPin;
extern int LED_PIN;

extern char myName[];

static void readSensor();

extern String DEVICE_NAME;
extern int PUBLISH_EVERY;

extern String MQTT_HOST;
extern String MQTT_USERNAME;
extern String MQTT_PASSWORD;
extern String MQTT_CLIENT_ID;
extern String MQTT_PREFIX;
extern int MQTT_PORT;
extern int PUBLISH_EVERY;
extern int MQTT_CONNECT_TIMEOUT;

extern void register_publish_hooks();
extern void register_receive_hooks();

/* ######## MQTT BEGIN ########*/
void KB_mqttConnector::beginMqtt(void)
{
  init_hardware();
  init_wifi();
  init_mqtt();
}

void KB_mqttConnector::init_hardware()
{
  pinMode(relayPin, OUTPUT);
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(relayPin, relayPinState);
}

void KB_mqttConnector::init_wifi()
{
  WiFi.disconnect();
  delay(20);
  WiFi.mode(WIFI_STA);
  delay(50);
  const char *ssid = WIFI_SSID.c_str();
  const char *pass = WIFI_PASSWORD.c_str();
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.printf("Connecting to %s:%s\r\n", ssid, pass);
    delay(300);
  }
  Serial.println("WiFi Connected.");
  digitalWrite(2, HIGH);
}

/* ######## MQTT INITIALIZER ########*/
void init_mqtt()
{
  mqtt = new MqttConnector(MQTT_HOST.c_str(), MQTT_PORT);
  mqtt->on_connecting([&](int counter, bool *flag) {
    Serial.printf("[%lu] MQTT CONNECTING.. \r\n", counter);
    if (counter >= MQTT_CONNECT_TIMEOUT)
    {
      ESP.restart();
    }
    delay(1000);
  });

  mqtt->on_prepare_configuration([&](MqttConnector::Config *config) -> void {
    MQTT_CLIENT_ID = String(WiFi.macAddress());
    config->clientId = MQTT_CLIENT_ID;
    config->channelPrefix = MQTT_PREFIX;
    config->enableLastWill = true;
    config->retainPublishMessage = false;
    /*
        config->mode
        ===================
        | MODE_BOTH       |
        | MODE_PUB_ONLY   |
        | MODE_SUB_ONLY   |
        ===================
    */
    config->mode = MODE_BOTH;
    config->firstCapChannel = false;

    config->username = String(MQTT_USERNAME);
    config->password = String(MQTT_PASSWORD);

    // FORMAT
    // d:quickstart:<type-id>:<device-id>
    //config->clientId  = String("d:quickstart:esp8266meetup:") + macAddr;
    config->topicPub = MQTT_PREFIX + String(myName) + String("/status");
  });

  mqtt->on_after_prepare_configuration([&](MqttConnector::Config config) -> void {
    String humanTopic = MQTT_PREFIX + myName + String("/$/+");
    Serial.printf("[USER] HOST = %s\r\n", config.mqttHost.c_str());
    Serial.printf("[USER] PORT = %d\r\n", config.mqttPort);
    Serial.printf("[USER] USER = %s\r\n", config.username.c_str());
    Serial.printf("[USER] PASS  = %s\r\n", config.password.c_str());
    Serial.printf("[USER] PUB  = %s\r\n", config.topicPub.c_str());
    Serial.printf("[USER] SUB  = %s\r\n", config.topicSub.c_str());
    Serial.printf("[USER] SUB  = %s\r\n", humanTopic.c_str());
    Serial.printf("[USER] RETAIN = %d\r\n", config.retainPublishMessage);
    Serial.printf("[USER] ENABLE LWT = %d\r\n", config.enableLastWill);
    Serial.printf("[USER] PUBLISH_EVERY = %dms\r\n", PUBLISH_EVERY);

    // sub->add_topic(MQTT_PREFIX + "/" + myName + "/$/+");
    // sub->add_topic(MQTT_PREFIX + "/" + MQTT_CLIENT_ID + "/$/+");
  });

  register_publish_hooks();
  register_receive_hooks();

  mqtt->connect();
}

/* ######## MQTT PUBLISH ########*/
void register_publish_hooks()
{
  strcpy(myName, DEVICE_NAME.c_str());
  mqtt->on_prepare_data_once([&](void) {
    Serial.println("initializing sensor...");
  });

  mqtt->on_before_prepare_data([&](void) {
    readSensor();
  });

  mqtt->on_prepare_data([&](JsonObject *root) {
    JsonObject &data = (*root)["d"];
    JsonObject &info = (*root)["info"];
    data["myName"] = myName;
    data["millis"] = millis();
    data["relayState"] = relayPinState;
    data["updateInterval"] = PUBLISH_EVERY;
  },
                        PUBLISH_EVERY);
  mqtt->on_after_prepare_data([&](JsonObject *root) {
    /**************
      JsonObject& data = (*root)["d"];
      data.remove("version");
      data.remove("subscription");
    **************/
  });

  mqtt->on_published([&](const MQTT::Publish &pub) {
    Serial.println("Published.");
  });
}

static void readSensor()
{
  // perform reading sensor
  Serial.println("Perform reading sensor...");
}

/* ######## MQTT RECEIVEH ########*/
void register_receive_hooks()
{
  mqtt->on_subscribe([&](MQTT::Subscribe *sub) -> void {
    Serial.printf("myName = %s \r\n", myName);
    sub->add_topic(MQTT_PREFIX + myName + "/$/+");
    sub->add_topic(MQTT_PREFIX + MQTT_CLIENT_ID + "/$/+");
  });

  mqtt->on_before_message_arrived_once([&](void) {});

  mqtt->on_message([&](const MQTT::Publish &pub) {});

  mqtt->on_after_message_arrived([&](String topic, String cmd, String payload) {
    Serial.printf("topic: %s\r\n", topic.c_str());
    Serial.printf("cmd: %s\r\n", cmd.c_str());
    Serial.printf("payload: %s\r\n", payload.c_str());
    if (cmd == "$/command")
    {
      if (payload == "ON")
      {
        digitalWrite(relayPin, HIGH);
        digitalWrite(LED_PIN, LOW);
        relayPinState = HIGH;
      }
      else if (payload == "OFF")
      {
        digitalWrite(relayPin, LOW);
        digitalWrite(LED_PIN, HIGH);
        relayPinState = LOW;
      }
    }
    else if (cmd == "$/reboot")
    {
      ESP.restart();
    }
    else
    {
      // another message.
    }
  });
}
