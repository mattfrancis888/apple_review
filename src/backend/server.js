//note for me! refer to: https://spin.atomicobject.com/2018/10/08/mock-api-json-server/
//TYPESCRIPT NOT IMPLEMENTED FOR EXPRESS THAT USES JSON SERVER FRAMEWORK
const jsonServer = require("json-server");

var path = require("path");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 5000;

const router = jsonServer.router(path.join(__dirname, "db.json"));
const db = router.db.getState();

const server = jsonServer.create();
server.use(middlewares);
server.use(jsonServer.bodyParser); //needed for other methods besides GET

server.get("/reviews", (req, res) => {
    res.status(200).jsonp(db);
});

server.use(router);
server.listen(port, () => {
    console.log("JSON Server is running");
});
