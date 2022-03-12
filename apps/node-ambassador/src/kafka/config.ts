import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'email-consumer',
  brokers: ['localhost:9092'],
  ssl: false,
});

export const producer = kafka.producer();
