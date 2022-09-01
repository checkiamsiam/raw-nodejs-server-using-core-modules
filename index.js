const http = require("http");
const url = require("url");
const fs = require("fs");
const events = require("events");

const eventEmitter = new events.EventEmitter();

eventEmitter.on("exampleEvent", ({ res, name, roll }) => {
  res.write(`the roll of ${name} is ${roll}`);
  res.end();
});

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (req.url === "/" && req.method === "GET") {
    fs.readFile("./welcome.html", (err, data) => {
      if (data) {
        res.write(data);
        res.end();
      } else {
        res.write(err);
        res.end();
      }
    });
  } else if ((req.url === "/get-body", req.method === "POST")) {
    const data = [];
    req.on("data", (chunk) => {
      data.push(chunk);
    });
    req.on("end", () => {
      const parsedData = Buffer.concat(data).toString();
      const name = JSON.parse(parsedData).name;
      res.write(name);
      res.end();
    });
  } else if (parsedUrl.query.checkUrl) {
    res.write("url module is working");
    res.end();
  } else if (req.url === "/readme") {
    fs.readFile("./myself.json", (err, data) => {
      if (data) {
        res.write(data);
        res.end();
      } else {
        res.write(err);
        res.end();
      }
    });
  } else if (req.url === "/create-junk") {
    fs.writeFile("./junk.txt", "siam", (err) => {
      if (err) {
        res.write(err);
        res.end();
      }
    });
    res.end();
  } else if (req.url === "/delete-junk") {
    fs.unlink("./junk.txt", (err) => {
      if (err) {
        res.write(err);
        res.end();
      }
    });
  } else if (req.url === "/event") {
    eventEmitter.emit("exampleEvent", { res, name: "siam", roll: 559718 });
  } else {
    res.write("unknown route");
    res.end();
  }
});

server.listen(5000);

// stream throw fs

// const readme = fs.createReadStream("./myself.json");

// const data = [];
// readme.on("data", (chunk) => {
//   data.push(chunk);
// });
// readme.on("end", () => {
//   const parsedData = Buffer.concat(data).toString();
//   const name = JSON.parse(parsedData).name;
//   res.write(name);
//   res.end();
// });
