const amqp = require('amqplib');
const IMessageBroker = require("../../application/interfaces/IMessageBroker");

class MessageBroker extends IMessageBroker {
    constructor() {
        super();
        this.connection = null;
        this.channel = null;
    }

    async connect() {
        this.connection = await amqp.connect('amqp://localhost');
        this.channel = await this.connection.createChannel();
    }

    async publish(exchange, message) {

        console.log("loop from",message)
        if (!this.channel) {
            await this.connect();
        }
        // Assert the fanout exchange
        await this.channel.assertExchange(exchange, 'fanout', { durable: true });
        // Publish the message to the exchange
        this.channel.publish(exchange, '', Buffer.from(JSON.stringify(message)));
    }
}

module.exports = MessageBroker;