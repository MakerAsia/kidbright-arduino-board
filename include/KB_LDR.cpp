#include "KB_LDR.h"
#include "esp_system.h"
#include "driver/adc.h"
#define MAX_LDR_VALUE	3400 // calibated value
#define AVG_SAMPLE      20 // 100 sample
#define SMOOTH_DELAY    1   //  ms delay
void KB_LDR::begin(void) {
    analogSetPinAttenuation(KB_LDR_PIN, ADC_0db);
}

uint16_t KB_LDR::getLDR() {
    return analogRead(KB_LDR_PIN);
}

uint16_t KB_LDR::mapLDR() {
    //uint16_t readLDR;
    uint32_t value = 0;
    for(int i=0; i < AVG_SAMPLE; i++){
        value += analogRead(KB_LDR_PIN);
        delay(SMOOTH_DELAY);
    }
    value = value / AVG_SAMPLE;
    Serial.println(value);
    if (value > MAX_LDR_VALUE) {
        value = MAX_LDR_VALUE;
    }
    ldr = ((MAX_LDR_VALUE - value) * 100) / MAX_LDR_VALUE;
    return ldr;
}