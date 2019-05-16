#include <Arduino.h>
#include <Wire.h>

class KB_LM73
{
 public:
  void begin(void);
  float readTemp();

 protected:
  float temp;

 private:
};
