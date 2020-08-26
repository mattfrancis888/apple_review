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

server.post("/reviews", (req, res) => {
    if (req.method === "POST") {
        console.log(db.reviews);
        //Set auto increment ID
        const lastItem = db.reviews[db.reviews.length - 1];
        const incrementId = lastItem.id + 1;

        req.body.id = incrementId;

        db.reviews.push(req.body);
        //Must write to db in order to update db.json for local db.json
        //other wise it's stored in a cache database. Will be on database
        //for a while before it's deleted.
        //  router.db.write();
    }
    res.status(200).jsonp(req.body);
});

server.use(router);
server.listen(port, () => {
    console.log("JSON Server is running");
});
