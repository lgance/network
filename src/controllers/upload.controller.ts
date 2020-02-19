import * as express from 'express';
import * as multer from 'multer';
import Controller from '../interface/controller.interface'


const upload = multer({dest:'../uploads/'});

class UploadController implements Controller {
  public path='/upload';
  public router = express.Router();

  constructor(){
    this.initializeRoutes();
  }

  private initializeRoutes(){
    this.router.post(this.path,this.uploadControllerIndexPost);
    this.router.get(this.path,this.uploadControllerIndex);
  }

  private uploadControllerIndex = async (req:express.Request,res:express.Response)=>{
      res.send('UploadController Index');
  }

  private uploadControllerIndexPost = async(req:express.Request,res:express.Response)=>{
      res.send('UploadController Post Index');
  }
}
export default UploadController;


