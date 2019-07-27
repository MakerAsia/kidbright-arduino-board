#ifndef KB_MUSIC_h
#define KB_MUSIC_h

#include <Arduino.h>
#include "pins_arduino.h"

#define TONE_CHANNEL 0

class KB_music
{
 public:
  void begin(void);
  void tone(unsigned int frequency, unsigned long duration = 0);
  void noTone();

 protected:
  uint16_t channel;
  uint16_t bit;

 private:
};

#endif /* KB_LDR_h */
