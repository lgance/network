import * as express from 'express';
import Controller from '../interface/controller.interface'

class IndexController implements Controller {
  public path='/test';
  public router = express.Router();

  constructor(){
    this.initializeRoutes();
  }

  private initializeRoutes(){
    this.router.get(this.path,this.dashboardIndex);
  }

  private dashboardIndex = async (req:express.Request,res:express.Response)=>{
      res.send('testDataController Index');
  }
}
export default IndexController;


