import * as express from "express";
import * as nunjucks from "nunjucks";
import * as cors from "cors";
import * as axios from "axios";
import * as favicon from "serve-favicon";
import * as moment from "moment";
import * as cron from "node-cron";
import { spawn, exec } from "child_process";
import * as path from "path";
import * as fs from "fs";

import "dotenv/config";

const app = express();

interface TQMError extends Error {
  status: number;
  data?: any;
}
const port = process.env.PORT || 9428;
app.use(cors());
app.set("port", port);

nunjucks.configure("dist/public/views", {
  autoescape: true,
  express: app
});

app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "/public/resource/fav", "favicon.ico")));

app.get("/", (req: express.Request, res: express.Response) => {
  res.render("index.html", { mainServer: "ppap" });
});

app.listen(app.get("port"), () => {
  console.log(`Example app listening on port ${port}`);
});

/** express 4xx middleware */
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let errorMsg: string =
      "Test Internal Server Error 4xx not matched API Address";

    console.log(errorMsg);

    res.status(404).send(errorMsg);
  }
);

/** express Server error handling middle ware - Internal Server Error 500  */
app.use(
  (
    err: TQMError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      data: err.data
    });
  }
);

/* PM2 Log Flush Schedule */
cron.schedule("* * * * 1", () => {
  console.log("Log Flush");
  const ls = spawn("pm2", ["flush"]);
  ls.stdout.on("data", data => {
    console.log(`stdout : ${data}`);
    console.log(moment().format("MMMM Do YYYY,h:mm:ss a"));
  });
});
