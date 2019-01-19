import path from "path";
import express from "express";
import enableMockServer from "./mock";

const app = express();

app.set("port", 3000);

enableMockServer(app);

app.use("/", express.static(path.join(__dirname, "../src")));

app.listen(app.get("port"), () => {
  console.log(`Server started: http://localhost:${app.get("port")}/`);
});
