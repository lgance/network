/** Define Route */

import "dotenv/config";
import Controller from "./interface/controller.interface";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";
import * as nunjucks from "nunjucks";
import * as cors from "cors";
import * as favicon from "serve-favicon";
import * as moment from "moment";
import * as cron from "node-cron";
import * as cookieParser from "cookie-parser";
import { spawn, exec } from "child_process";

import errorMiddleware from "./middleware/error.middleware";
import exceptionController from "./middleware/controller.exception.middleware";

/** .env Properties
 * ! PORT=      // Server Listening Port Number
 * * DB_HOST='' // mySQL DataBase HOST
 * * DB_NAME='' // mySQL DataBase Name
 * ! DB_PORT='' // mySQL DataBase PORT
 * * DB_USERNAME='' // mySQL DataBase USERNAME
 * ! DB_PASSWORD = '' // mySQL DataBase PassWord
*/

interface IError extends Error {
  status: number;
  data?: any;
}
class App {
  public app: express.Application;
  public port: string | number;
  constructor(controllers: Controller[]) {
    this.app = express();
    this.port = process.env.PORT || 80;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }
  private LoggerMiddleware(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {
    console.log(`${request.method} ${request.path}`);
    next();
  }
  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());

    this.app.use(this.LoggerMiddleware);
    this.app.set("port", this.port);

    nunjucks.configure("dist/public/views", {
      autoescape: true,
      express: this.app,
    });
    this.app.use(express.static(path.join(__dirname, "public")));
    this.app.use(
      favicon(path.join(__dirname, "/public/resource/fav", "favicon.ico"))
    );

   // ? Pm2 log Flush  -> Delete All Log 
    cron.schedule("30 1 * * 1", () => {
      console.log("Log Flush");
      const ls = spawn("pm2", ["flush"]);
      ls.stdout.on("data", (data) => {
        console.log(`stdout : ${data}`);
        console.log(moment().format("MMMM Do YYYY,h:mm:ss a"));
      });
    });
  }
  private initializeErrorHandling() {
    // ? express 4xx middleware 
    this.app.use(exceptionController);

    // ? express Server error handling middle ware - Internal Server Error 500  
    this.app.use(errorMiddleware);
  }
  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  // ! Server Listen Port 
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }
  public getServer() {
    return this.app;
  }
}
export default App;
