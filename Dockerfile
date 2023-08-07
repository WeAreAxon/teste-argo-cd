FROM keymetrics/pm2:18-alpine

ARG mysql_host
ARG mysql_database
ARG mysql_user
ARG mysql_password
ARG mongodb_uri
ARG mail_host
ARG nodemailer_user
ARG nodemailer_pass
ARG jwt_secret

ENV MYSQL_HOST $mysql_host
ENV MYSQL_DATABASE $mysql_database
ENV MYSQL_USER $mysql_user
ENV MYSQL_PASSWORD $mysql_password
ENV MONGODB_URI $mongodb_uri
ENV MAIL_HOST $mail_host
ENV NODEMAILER_USER $nodemailer_user
ENV NODEMAILER_PASS $nodemailer_pass
ENV JWT_SECRET $jwt_secret

WORKDIR /app
COPY . .

# RUN pm2 install pm2-auto-pull
# RUN pm2 set pm2-auto-pull:interval 120000
RUN npm install -g typescript

WORKDIR /app/server
RUN npm install && npm run build
WORKDIR /app/ui
RUN npm install && npm run build

WORKDIR /app/.deploy

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]
