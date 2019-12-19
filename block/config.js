module.exports = {
  blocks: [ // use "blocks : [ " in normally situation but this need to override base block from esp-idf platforms
    {
      name: "Display",
      color: "230",
      icon: "/static/icons/icons8_picture_96px_1.png",
      blocks: [
        "display_led16x8",
        "display_led16x8_clr",
        {
          xml: `<block type="display_led16x8_print">
                <value name="VALUE">
                    <shadow type="basic_string">
                      <field name="VALUE">Hello world!</field>
                    </shadow>
                </value>
              </block>` },
        {
          xml: `<block type="display_led16x8_scroll">
                <value name="VALUE">
                    <shadow type="basic_string">
                      <field name="VALUE">Hello world!</field>
                    </shadow>
                </value>
              </block>`
        },
        'basic_string',
        {
          xml: `<sep gap="32"></sep><label text="Advanced 16x8 Display" web-class="headline"></label>`
        },
        {
          xml: `<block type="display_led16x8_drawPixel">
                <value name="X">
                    <shadow type="math_number">
                      <field name="NUM">0</field>
                    </shadow>
                </value>
                <value name="Y">
                    <shadow type="math_number">
                      <field name="NUM">0</field>
                    </shadow>
                </value>
                </block>`
        },
        {
          xml: `<block type="display_led16x8_drawline">
                <value name="X0">
                    <shadow type="math_number">
                      <field name="NUM">0</field>
                    </shadow>
                </value>
                <value name="Y0">
                    <shadow type="math_number">
                      <field name="NUM">0</field>
                    </shadow>
                </value>
                <value name="X1">
                    <shadow type="math_number">
                      <field name="NUM">15</field>
                    </shadow>
                </value>
                <value name="Y1">
                    <shadow type="math_number">
                      <field name="NUM">7</field>
                    </shadow>
                </value>
                </block>`
        },
        {
          xml: `<block type="display_led16x8_drawRect">
                <value name="X">
                    <shadow type="math_number">
                      <field name="NUM">5</field>
                    </shadow>
                </value>
                <value name="Y">
                    <shadow type="math_number">
                      <field name="NUM">1</field>
                    </shadow>
                </value>
                <value name="W">
                    <shadow type="math_number">
                      <field name="NUM">6</field>
                    </shadow>
                </value>
                <value name="H">
                    <shadow type="math_number">
                      <field name="NUM">6</field>
                    </shadow>
                </value>
                </block>`
        },
        {
          xml: `<block type="display_led16x8_drawcircle">
                <value name="X">
                    <shadow type="math_number">
                      <field name="NUM">7</field>
                    </shadow>
                </value>
                <value name="Y">
                    <shadow type="math_number">
                      <field name="NUM">3</field>
                    </shadow>
                </value>
                <value name="R">
                    <shadow type="math_number">
                      <field name="NUM">2</field>
                    </shadow>
                </value>
                </block>`
        },
        {
          xml: `<block type="display_led16x8_drawTriangle">
                <value name="X0">
                    <shadow type="math_number">
                      <field name="NUM">3</field>
                    </shadow>
                </value>
                <value name="Y0">
                    <shadow type="math_number">
                      <field name="NUM">6</field>
                    </shadow>
                </value>
                <value name="X1">
                    <shadow type="math_number">
                      <field name="NUM">13</field>
                    </shadow>
                </value>
                <value name="Y1">
                    <shadow type="math_number">
                      <field name="NUM">6</field>
                    </shadow>
                </value>
                <value name="X2">
                    <shadow type="math_number">
                      <field name="NUM">8</field>
                    </shadow>
                </value>
                <value name="Y2">
                    <shadow type="math_number">
                      <field name="NUM">1</field>
                    </shadow>
                </value>
                </block>`
        }
        // 'basic_TFT_setRotation',
        // 'basic_TFT_fillScreen',
        // 'basic_TFT_setTextSize',
        // 'basic_TFT_print'
      ]
    },
    {
      name: "Sensor",
      color: "58",
      icon: "/static/icons/icons8_thermometer_96px.png",
      blocks: [
        "sensor_ldr",
        "sensor_lm73",
        "sensor_switch1",
        "sensor_switch2"
      ]
    },
    {
      name: "GPIO",
      color: "19",
      icon: "/static/icons/icons8_electronics_96px.png",
      blocks: [
        {
          xml: `<sep gap="32"></sep><label text="KidBright GPIO" web-class="headline"></label>`
        },
        "output_write",
        "output_toggle",
        "output_read",
        "usbsw_write",
        "usbsw_toggle",
        "usbsw_read",
        "input_read"
      ]
    },
    {
      name: "Music",
      color: "330",
      icon: "/static/icons/SVG/c6.svg",
      blocks: [
        "music_note",
        "music_notes",
        {
          xml:
            `<block type="music_play_notes">
                        <value name="note">                    
                            <block type="music_notes">
                                <field name="notes">C4,B4,E4</field>
                            </block>
                        </value>
                    </block>`
        },
        'music_song_mario_underworld',
        'music_song_jingle_bell',
        'music_song_cannon_rock'
        // 'music_rest',
        // 'music_scale',
        // 'music_set_volume',
        // 'music_get_volume'
      ]
    },
    {
      name: "Time",
      color: "330",
      icon: "/static/icons/SVG/c6.svg",
      blocks: [
        {
          xml:
            `<block type="time_delay">
                        <value name="delay">
                            <shadow type="math_number">
                                <field name="NUM">1000</field>
                            </shadow>
                        </value>
                    </block>`
        },
        {
          xml:
            `<block type="time_delay_microsec">
                        <value name="delay">
                            <shadow type="math_number">
                                <field name="NUM">1000</field>
                            </shadow>
                        </value>
                    </block>`
        },
        {
          xml: `<sep gap="32"></sep><label text="Real Time Clock" web-class="headline"></label>`
        },
        "mcp7941_rtc_set_datetime",
        "mcp7941_rtc_get_dayOfWeek",
        "mcp7941_rtc_get_hour",
        "mcp7941_rtc_get_minute",
        "mcp7941_rtc_get_second",
        "mcp7941_rtc_get_day",
        "mcp7941_rtc_get_month",
        "mcp7941_rtc_get_year"
      ]
    }
  ]
};
