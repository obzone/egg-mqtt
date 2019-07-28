const mqtt = require('mqtt')

module.exports = app => {
  app.addSingleton('mqtt', createMQTT)
}

async function createMQTT(config, app) {
  const mqttClient = mqtt.connect(config.host, {
    clientId: config.clientId,
    protocolId: 'MQTT',
    protocolVersion: 4,
    rejectUnauthorized: false,
    ...config.options,
  });

  mqttClient.on('connect', () => {
    app.coreLogger.info('[egg-mqtt] connected %s@%s:%s', config.host, config.username, config.clientId);
  });
  mqttClient.on('error', error => {
    app.coreLogger.error('[egg-mqtt] error clientid:%s', config.clientId);
    app.coreLogger.error(error);
  });
  mqttClient.on('offline', () => {
    app.coreLogger.error('[egg-mqtt] offline clientid:%s', config.clientId);
  });
  mqttClient.on('reconnect', () => {
    app.coreLogger.error('[egg-mqtt] reconnect clientid:%s', config.clientId);
  });
  mqttClient.on('packetsend', (packet) => {
    app.coreLogger.info('[egg-mqtt] sends packet:%s', packet);
  });
  mqttClient.on('packetreceive', (packet) => {
    app.coreLogger.info('[egg-mqtt] receives packet:%s', packet);
  });

  return mqttClient
}