const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.resolve(__dirname, '../../../protos/auth.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const authProto = grpc.loadPackageDefinition(packageDefinition).auth;

class GRPCServer {
    constructor(authHandler) {
        this.authHandler = authHandler;
        this.server = new grpc.Server();
    }

    addServices() {
        this.server.addService(authProto.AuthService.service, {
            AuthenticateUser: this.authHandler.authenticate.bind(this.authHandler),
        });
    }

    start(port = 50051) {
        this.addServices();
        this.server.bindAsync(
            `0.0.0.0:${port}`,
            grpc.ServerCredentials.createInsecure(),
            (error, boundPort) => {
                if (error) {
                    console.error("Error starting gRPC server:", error);
                    return;
                }
                this.server.start();
                console.log(`gRPC server running on port ${boundPort}`);
            }
        );
    }
}

module.exports = GRPCServer
