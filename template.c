#include <Arduino.h>
#include <vector>
#include <WiFi.h>
#include <Wire.h>
#include "SPI.h"
#include "Adafruit_GFX.h"
#include "Adafruit_LEDBackpack.h"
#include <Adafruit_ILI9341.h>

// #define TFT_DC 18
// #define TFT_CS 19
// #define TFT_RST 27
// #define TFT_MOSI 21
// #define TFT_MISO 32
// #define TFT_CLK 22

// Adafruit_ILI9341 tft = Adafruit_ILI9341(TFT_CS, TFT_DC, TFT_MOSI, TFT_CLK, TFT_RST, TFT_MISO);

${EXTINC}

#include "KB_initBoard.h"
#include "KB_music.h"
#include "KB_LDR.h"
#include "KB_LM73.h"
#include "KB_ht16k33.h"
// #include "KB_tft.h"
// #include "KB_mqttConnector.h"


#include <WiFi.h>
#include <ArduinoJson.h>
#include <MqttConnector.h>
#include <Wire.h>
#include <SPI.h>
MqttConnector *mqtt; 


KB_board board = KB_board();
KB_music music = KB_music();
KB_LDR ldr = KB_LDR();
KB_LM73 lm73 = KB_LM73();
KB_8x16Matrix matrix = KB_8x16Matrix();
// KB_TFT tftScreen = KB_TFT();

typedef int Number;
typedef int Boolean;

using namespace std;

${VARIABLE}

${FUNCTION}

void init_hardware();
void init_wifi();
void init_mqtt();
void readSensor();

/* BOARD INFO */
String DEVICE_NAME = "KBPRO-001"; //_DEVICE_NAME; //"YOUR-DEVICE-NAME-001";

    /* WIFI INFO */
String WIFI_SSID = "ampere";   //_WIFI_SSID; //"ampere";
String WIFI_PASSWORD = "espertap"; //_WIFI_PASSWORD; //"espertap";

/* MQTT INFO */
String MQTT_HOST = "mqtt.cmmc.io";
String MQTT_USERNAME = "";
String MQTT_PASSWORD = "";
String MQTT_CLIENT_ID = "";

String MQTT_PREFIX = "KBPRO/"; //bufferPrefix; //"WORKSHOP/";

int MQTT_PORT = 1883;
int PUBLISH_EVERY = 10L * 1000;
int MQTT_CONNECT_TIMEOUT = 10;

int relayPin = KB_OUTPUT1; // pin 26
int relayPinState = HIGH;
int LED_PIN = KB_LED_BT; // pin 17
char myName[40];

void setup()
{
  board.begin();
  //music.begin();
  lm73.begin();
  matrix.displayBegin();
  // tft.begin();
  // tftScreen.begin();
  // mqttCon.beginMqtt();

  init_hardware();
  init_wifi();
  init_mqtt();

  ${SETUP_CODE}
  ${BLOCKSETUP}
}
void loop()
{
  ${LOOP_CODE}
  ${LOOP_EXT_CODE}

  mqtt->loop();
  // while(1);
}

void init_hardware()
{
  pinMode(relayPin, OUTPUT);
  pinMode(LED_PIN, OUTPUT);

  digitalWrite(relayPin, relayPinState);;
  // serial port initialization
  Serial.begin(115200);
  delay(10);
  Serial.println();
  Serial.println("Starting...");
}

void init_wifi() {
  WiFi.disconnect();
  delay(20);
  WiFi.mode(WIFI_STA);
  delay(50);
  const char* ssid =  WIFI_SSID.c_str();
  const char* pass =  WIFI_PASSWORD.c_str();
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.printf ("Connecting to %s:%s\r\n", ssid, pass);
    delay(300);
  }
  Serial.println("WiFi Connected.");
  digitalWrite(2, HIGH);
}


// MQTT PUBLISH
void register_publish_hooks() {
  strcpy(myName, DEVICE_NAME.c_str());
  mqtt->on_prepare_data_once([&](void) {
    Serial.println("initializing sensor...");
  });

  mqtt->on_before_prepare_data([&](void) {
    readSensor();
  });

  mqtt->on_prepare_data([&](JsonObject *root) {
    JsonObject& data = (*root)["d"];
    JsonObject& info = (*root)["info"];
    data["myName"] = myName;
    data["millis"] = millis();
    data["relayState"] = relayPinState;
    data["updateInterval"] = PUBLISH_EVERY;
  }, PUBLISH_EVERY);
  mqtt->on_after_prepare_data([&](JsonObject * root) {
    /**************
      JsonObject& data = (*root)["d"];
      data.remove("version");
      data.remove("subscription");
    **************/
  });

  mqtt->on_published([&](const MQTT::Publish & pub) {
      Serial.println("Published.");
  });
}

void readSensor() {
  // perform reading sensor 
  Serial.println("Perform reading sensor...");
}


// MQTT RECEIVE
void register_receive_hooks() {
  mqtt->on_subscribe([&](MQTT::Subscribe *sub) -> void {
    Serial.printf("myName = %s \r\n", myName);
    sub->add_topic(MQTT_PREFIX + myName + "/$/+");
    sub->add_topic(MQTT_PREFIX + MQTT_CLIENT_ID + "/$/+");
  });

  mqtt->on_before_message_arrived_once([&](void) { });

  mqtt->on_message([&](const MQTT::Publish & pub) { });

  mqtt->on_after_message_arrived([&](String topic, String cmd, String payload) {
    Serial.printf("topic: %s\r\n", topic.c_str());
    Serial.printf("cmd: %s\r\n", cmd.c_str());
    Serial.printf("payload: %s\r\n", payload.c_str());
    if (cmd == "$/command") {
      if (payload == "ON") {
        digitalWrite(relayPin, HIGH);
        digitalWrite(LED_PIN, LOW);
        relayPinState = HIGH;
      }
      else if (payload == "OFF") {
        digitalWrite(relayPin, LOW);
        digitalWrite(LED_PIN, HIGH);
        relayPinState = LOW;
      }
    }
    else if (cmd == "$/reboot") {
      ESP.restart();
    }
    else {
      // another message.
    }
  });
}


// MQTT INITIALIZER
void init_mqtt()
{
  mqtt = new MqttConnector(MQTT_HOST.c_str(), MQTT_PORT); 
  mqtt->on_connecting([&](int counter, bool *flag) {
    Serial.printf("[%lu] MQTT CONNECTING.. \r\n", counter);
    if (counter >= MQTT_CONNECT_TIMEOUT) {
      ESP.restart();
    }
    delay(1000);
  });

  mqtt->on_prepare_configuration([&](MqttConnector::Config *config) -> void {
    MQTT_CLIENT_ID = String(WiFi.macAddress());
    config->clientId  = MQTT_CLIENT_ID;
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
    config->topicPub  = MQTT_PREFIX + String(myName) + String("/status");
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