export default class Config {
  static mongoUri: string = '';
  static port: number = 4000;
  static isProd: boolean = false;
}

export class RabbitMQ {
  host: string =  'amqp://localhost:5672';
  queue_name: string = 'msgQueue';
  exchange_name: string = 'hermesExchange';
}
