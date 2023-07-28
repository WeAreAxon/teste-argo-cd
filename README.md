# Axon Connect - Cloud

Aplicação conteinerizada com todos os serviços necessários rodando no PM2.

Para esta aplicação funcionar corretamente, ela precisa dos seguintes recursos:

- Instância do **Node-red**, que chamará o endpoint do Connect
- Banco de dados **MongoDB**
- Banco de dados **MySQL**

Além disso, é necessário configurar previamente o PM2 através do arquivo `pm2.json`.
