module.exports.rabbitmq = {
  host: 'amqp://localhost:5672',
  queue_name: 'msgQueue',
  exchange_name: 'hermesExchange',
};

export class Config {
  static mongoUri: string = '';
  static port: number = 4000;
  static isProd: boolean = false;
}
