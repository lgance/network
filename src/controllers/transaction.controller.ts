import * as express from "express";
import Controller from "../interface/controller.interface";

class TransactionController implements Controller {
  public path = "/transaction";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.TransactionControllerIndex);
  }

  private TransactionControllerIndex = async (
    req: express.Request,
    res: express.Response
  ) => {
    res.send(
      "Transaction Index Router [ Called SendServer IP and RecvServer IP ] "
    );
  };
}
export default TransactionController;
