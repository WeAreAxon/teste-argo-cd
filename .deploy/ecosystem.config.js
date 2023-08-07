module.exports = {
  apps: [
    {
      name: "connect-api:5800",
      script: "../server/dist/api/server-refac.js",
      exec_mode: "fork",
      instances: 1,
      env: {
        NODE_ENV: "connectelopment",
        MYSQL_HOST: process.env.MYSQL_HOST,
        MYSQL_PORT: "3306",
        MYSQL_USER: process.env.MYSQL_USER,
        MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
        MYSQL_DATABASE: process.env.MYSQL_DATABASE,
        MONGODB_URI: process.env.MONGODB_URI,
        MAIL_HOST: process.env.MAIL_HOST,
        NODEMAILER_USER: process.env.NODEMAILER_USER,
        NODEMAILER_PASS: process.env.NODEMAILER_PASS,
        JWT_SECRET: process.env.JWT_SECRET,
        BACK_END_ROUTE: "http://localhost:5800",
        QUEUEHANDLER_ROUTE: "http://localhost:3050",
        PORT_API_CAPTURE: 5800
      },
      watch: true,
      min_uptime: 5000
    },
    {
      name: "connect-translate-signals",
      script: "../server/dist/translate-signals/index.js",
      exec_mode: "fork",
      instances: 1,
      min_uptime: 5000,
      watch: true,
      env: {
        NODE_ENV: "connectelopment",
        MYSQL_HOST: process.env.MYSQL_HOST,
        MYSQL_PORT: "3306",
        MYSQL_USER: process.env.MYSQL_USER,
        MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
        MYSQL_DATABASE: process.env.MYSQL_DATABASE,
        MONGODB_URI: process.env.MONGODB_URI
      }
    },
    {
      name: "connect-webhook-mqtt:5100",
      script: "../server/dist/webhook-mqtt/server.js",
      exec_mode: "fork",
      instances: 1,
      min_uptime: 5000,
      watch: true,
      env: {
        NODE_ENV: "connectelopment",
        MYSQL_HOST: process.env.MYSQL_HOST,
        MYSQL_PORT: "3306",
        MYSQL_USER: process.env.MYSQL_USER,
        MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
        MYSQL_DATABASE: process.env.MYSQL_DATABASE,
        MONGODB_URI: process.env.MONGODB_URI,
        PORT: 5100
      }
    }
  ]
};
