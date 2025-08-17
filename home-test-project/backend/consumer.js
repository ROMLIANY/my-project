const kafka = require('kafka-node');
const log = require('./utils/log');
require('dotenv').config();

const kafkaHost = process.env.KAFKA_BROKER || 'kafka:9092';
const topic = process.env.CDC_TOPIC || 'ticdc_test_changefeed'; // make sure matches changefeed target

const client = new kafka.KafkaClient({ kafkaHost });
const consumer = new kafka.Consumer(
  client,
  [{ topic }],
  { autoCommit: true }
);

consumer.on('message', (message) => {
  try {
    // message.value may be Buffer/string
    const payload = typeof message.value === 'string' ? message.value : message.value.toString();
    log.info(JSON.stringify({
      timestamp: new Date().toISOString(),
      source: 'cdc-consumer',
      topic: message.topic,
      partition: message.partition,
      offset: message.offset,
      value: payload
    }));
  } catch (err) {
    console.error('consumer error', err);
  }
});

consumer.on('error', (err) => {
  console.error('Kafka consumer error', err);
});
