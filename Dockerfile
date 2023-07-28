FROM keymetrics/pm2:18-alpine

ARG mysql_host
ARG mysql_database
ENV MYSQL_HOST $mysql_host
ENV MYSQL_DATABASE $mysql_database

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

CMD [ "pm2-runtime", "start", "pm2.json" ]
