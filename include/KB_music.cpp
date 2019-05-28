#include "KB_music.h"

//static const uint8_t KB_BUZZER = 13;
//#define TONE_CHANNEL 0

//void KB_music::begin(void) {
//    ledcSetup(0, 5000, 8);
//    ledcAttachPin(KB_BUZZER, 0);
//    ledcWrite(0, 255);

//    ledcWriteTone(channel, 1);
//    ledcAttachPin(KB_BUZZER, channel);
//    delay(500);
//    ledcDetachPin(KB_BUZZER);
//    delay(500);
//}

//void KB_music::note(uint32_t keynote, uint16_t duration) {
//    ledcSetup(0, keynote, 8);
//    ledcAttachPin(KB_BUZZER, 0);
//    ledcWrite(0, 255);
//}

void KB_music::tone(unsigned int frequency, unsigned long duration)
{
    if (ledcRead(0)) {
        log_e("Tone channel %d is already in use", ledcRead(0));
        return;
    }
    ledcAttachPin(13, 0);
    ledcWriteTone(0, frequency);
    if (duration) {
        delay(duration);
        noTone();
    }
}

void KB_music::noTone()
{
    ledcDetachPin(13);
    ledcWrite(0, 0);
}