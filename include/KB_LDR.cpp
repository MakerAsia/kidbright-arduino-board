#include "KB_LDR.h"

void KB_LDR::begin(void) {
    pinMode(LDR_PIN, INPUT_PULLUP);
}

uint16_t KB_LDR::getLDR() {
    return analogRead(LDR_PIN);
}

uint16_t KB_LDR::mapLDR() {
    uint16_t readLDR;
    readLDR = analogRead(LDR_PIN);
    if(readLDR <= 0) {
        readLDR = 0;
    } else if(readLDR >= 500) {
        readLDR = 500;
    }
    ldr = map(readLDR, 0, 500, 100, 0);
    return ldr;
}