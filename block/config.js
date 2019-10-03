module.exports = {
  blocks: [ // use "blocks : [ " in normally situation but this need to override base block from esp-idf platforms
    {
      name: "Display",
      color: "230",
      icon: "/static/icons/icons8_picture_96px_1.png",
      blocks: [
        "display_led16x8",
        "display_led16x8_clr",
        { xml: `<block type="display_led16x8_print">
                <value name="VALUE">
                    <shadow type="basic_string">
                      <field name="VALUE">Hello world!</field>
                    </shadow>
                </value>
              </block>` },
        { xml: `<block type="display_led16x8_scroll">
                <value name="VALUE">
                    <shadow type="basic_string">
                      <field name="VALUE">Hello world!</field>
                    </shadow>
                </value>
              </block>` },
        'basic_string'
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
    }
  ]
};
