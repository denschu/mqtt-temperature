
#!/usr/bin/env node
var mqtt = require('mqtt');
var logger = require('npmlog');
var optimist = require('optimist');
var url = require('url');

var argv = optimist
  .usage('mqtt-temperature: Publishes temperature over MQTT\n \
    Usage: mqtt-temperature -h <broker-url>')
  .options('h', {
      describe: 'broker url'
    , default: 'mqtt://localhost:1883'
  })
  .argv;

// Parse url
var mqtt_url = url.parse(argv.h || process.env.MQTT_BROKER_URL);
var auth = (mqtt_url.auth || ':').split(':');

//Creating the MQTT Client Connection
logger.info("Creating client for: " + mqtt_url.hostname + ":" + mqtt_url.port);
c = mqtt.createClient(mqtt_url.port, mqtt_url.hostname, {
  username: auth[0],
  password: auth[1]
});

c.publish('/home/device/room/temperature', '36', true);