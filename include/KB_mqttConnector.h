#include <Arduino.h>
#include <WiFi.h>
#include <ArduinoJson.h>
#include <MqttConnector.h>
#include <Wire.h>
#include <SPI.h>

/* BOARD INFO */
String DEVICE_NAME = "KBPRO-001" //_DEVICE_NAME; //"YOUR-DEVICE-NAME-001";

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
digitalWrite(LED_PIN, HIGH);