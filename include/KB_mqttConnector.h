#ifndef KB_MQTT_CONNECTOR_h
#define KB_MQTT_CONNECTOR_h

#include <Arduino.h>
#include <WiFi.h>
#include <ArduinoJson.h>
#include <Wire.h>
#include <SPI.h>
#include <pins_arduino.h>

#include <MqttConnector.h>
// #include "cmmc_config.h"
// #include "cmmc_init_mqtt.h"
// #include "cmmc_publish.h"
// #include "cmmc_receive.h"

MqttConnector *mqtt;

class KB_mqttConnector
{
public:
  void beginMqtt(void);
  // int relayPin = KB_OUTPUT1; // pin 26
  // int relayPinState = HIGH;
  // int LED_PIN = KB_LED_BT; // pin 17

  // /* BOARD INFO */
  // String DEVICE_NAME = "KBPRO-001"; //_DEVICE_NAME; //"YOUR-DEVICE-NAME-001";

  // /* WIFI INFO */
  // String WIFI_SSID = "ampere";   //_WIFI_SSID; //"ampere";
  // String WIFI_PASSWORD = "espertap"; //_WIFI_PASSWORD; //"espertap";

  // /* MQTT INFO */
  // String MQTT_HOST = "mqtt.cmmc.io";
  // String MQTT_USERNAME = "";
  // String MQTT_PASSWORD = "";
  // String MQTT_CLIENT_ID = "";

  // String MQTT_PREFIX = "KBPRO/"; //bufferPrefix; //"WORKSHOP/";

  // int MQTT_PORT = 1883;
  // int PUBLISH_EVERY = 10L * 1000;
  // int MQTT_CONNECT_TIMEOUT = 10;

protected:
  // void init_hardware(void);
  // void init_wifi(void);
  // void init_mqtt(void);

private:
};

#endif /* KB_mqttConnector_h */