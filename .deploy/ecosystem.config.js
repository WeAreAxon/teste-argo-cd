module.exports = {
    apps: 
    [
        {
            name: "connect-api:5800",
            script: "../server/dist/api/server-refac.js",
            exec_mode: "fork",
            instances: 1,
            env: {
                NODE_ENV: "connectelopment",
                MYSQL_HOST: "connect_mysql57",
                MYSQL_PORT: "3306",
                MYSQL_USER: "connect",
                MYSQL_PASSWORD: "bpWAE7eZlKPBJMP",
                MYSQL_DATABASE: process.env.MYSQL_DATABASE,
                MONGODB_URI: "mongodb://axon:3lirIlN43qdhjLRU@134.122.115.13:27017/?retryWrites=true&w=majority",
                MAIL_HOST: "smtp-mail.outlook.com",
                NODEMAILER_USER: "comunica@martiaco.com.br",
                NODEMAILER_PASS: "Cok42166",
                JWT_SECRET: "683OEWtQBb5758c1-c2efc4fd678IUGHt5bfa630d74-b8a004e342aa507b9f5PL",
                BACK_END_ROUTE: "http://localhost:5800",
                QUEUEHANDLER_ROUTE: "http://localhost:3050",
                PORT_API_CAPTURE: 5800
            },
            "watch": true,
            "min_uptime": 5000
        },
    ],
};