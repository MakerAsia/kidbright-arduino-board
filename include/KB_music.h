#ifndef KB_MUSIC_h
#define KB_MUSIC_h

#include <Arduino.h>
#include "pins_arduino.h"
#include "vector"

#define TONE_CHANNEL 1
//static const uint8_t KB_BUZZER = 13;
class KB_music
{
 public:
  void begin(void);
  void tone(unsigned int frequency, unsigned long duration = 0);
  void noTone();
  void song(std::vector<int> notes,int duration);

 protected:
  uint16_t channel;
  uint16_t bit;

 private:
};

#endif /* KB_LDR_h */
