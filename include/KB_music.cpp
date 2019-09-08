#include "KB_music.h"

void KB_music::begin(void) {
    //ledcSetup(TONE_CHANNEL, 5000, 13);
}

void KB_music::tone(unsigned int frequency, unsigned long duration)
{
    if (ledcRead(TONE_CHANNEL)) {
        log_e("Tone channel %d is already in use", ledcRead(TONE_CHANNEL));
        return;
    }
    ledcAttachPin(KB_BUZZER, TONE_CHANNEL);
    ledcWriteTone(TONE_CHANNEL, frequency);
    if (duration) {
        delay(duration);
        noTone();
    }
}

void KB_music::noTone()
{
    ledcDetachPin(KB_BUZZER);
    ledcWrite(TONE_CHANNEL, 0);
}

void KB_music::song(std::vector<int>notes,int duration)
{
    for(int freq : notes){
        if(freq == -1){
            noTone();
            delay(duration);
        }else{
            tone(freq,duration);
        }
    }
}