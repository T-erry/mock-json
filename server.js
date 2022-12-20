const jsonServer = require(json-server);
const server = jsonServer.creat();
const router = jsonServer.router('db.json');


const middlewares = jsonServer.default();
const port = process.env.PORT || 3000;
server.use(middlewares);

server.use(router);
server.listen(port);