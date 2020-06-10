import * as express from 'express';
import Controller from '../interface/controller.interface'

import * as os from 'os';

class IndexController implements Controller {
  public path='/';
  public router = express.Router();

  constructor(){
    this.initializeRoutes();
  }

  private initializeRoutes(){
    this.router.get(this.path,this.dashboardIndex);
  }

  private dashboardIndex = async (req:express.Request,res:express.Response)=>{
    let hostname=os.hostname();
    console.log('render for index.html');
      res.render('index.html',
      {
        mainServer:hostname
      });
  }
}
export default IndexController;


