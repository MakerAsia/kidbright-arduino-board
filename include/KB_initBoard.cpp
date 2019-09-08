#include "KB_initBoard.h"

void KB_board::begin(void) {
    pinMode(KB_BUTTON1, INPUT_PULLUP);
    pinMode(KB_BUTTON2, INPUT_PULLUP);

    pinMode(KB_OUTPUT1, OUTPUT);
    pinMode(KB_OUTPUT2, OUTPUT);
    pinMode(KB_USB, OUTPUT);


    pinMode(KB_LED_BT, OUTPUT);
    pinMode(KB_LED_WIFI, OUTPUT);
    pinMode(KB_LED_NTP, OUTPUT);
    pinMode(KB_LED_IOT, OUTPUT);

    digitalWrite(KB_LED_BT, HIGH);
    digitalWrite(KB_LED_WIFI, HIGH);
    digitalWrite(KB_LED_NTP, HIGH);
    digitalWrite(KB_LED_IOT, HIGH);

    //ledcSetup(0, 5000, 13);
    //ledcAttachPin(KB_BUZZER, 0);
}

void KB_board::pinWrite(int pin, bool state) {
    digitalWrite(pin, !state);
}

//bool KB_board::pinReadDigital(int pin) {
//    return digitalRead(pin);
//}
//
//uint16_t KB_board::pinReadAnalog(int pin) {
//    return analogRead(pin);
//}
