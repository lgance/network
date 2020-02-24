import * as express from 'express';
import * as multer from 'multer';
import * as moment from 'moment';

import * as path from 'path';
import Controller from '../interface/controller.interface'


// const upload = multer({dest:'../../uploads/'});
const storage = multer.diskStorage({
  destination:function(req:Express.Request,file:Express.Multer.File,cb:Function){
    cb(null, 'uploads')
  },
  filename:function(req:Express.Request,file:Express.Multer.File,cb:Function){
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extName:string = path.extname(file.originalname);
    const createDate:string = moment().format('YYYY_MM_DD-HH_mm_ss');
    const fullPath:string = file.fieldname +'-'+ createDate +'_'+ uniqueSuffix.substring(0,4) + extName;
    cb(null, fullPath);
  }
})

const upload = multer({storage:storage}).array('dump');


class UploadController implements Controller {
  public path='/upload';
  public router = express.Router();

  constructor(){
    this.initializeRoutes();
  }

  private initializeRoutes(){
    // this.router.post(this.path,this.uploadControllerIndexPost);
    this.router.post(this.path,this.uploadControllerIndexPost);
    this.router.get(this.path,this.uploadControllerIndex);
  }

  private uploadControllerIndex = async (req:express.Request,res:express.Response,next:express.NextFunction)=>{
      console.log('upload Controller Index [GET]')
      res.send('UploadController Index');
  }

  private uploadControllerIndexPost = async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
      console.log(`[FILES] `);
      upload(req,res,function(err){
          if(err){
            console.log(err);
            return res.send('Upload Error');
          }
          console.log(req.files);
          let _files:string='';
          function isFile(data:{[fieldname: string]: Express.Multer.File[]} | Express.Multer.File[]) : data is Express.Multer.File[] {
             return Array.isArray(data);
          }
          if(isFile(req.files)){
              req.files.forEach((item:Express.Multer.File,index:number)=>{
                  _files = _files.concat(`${item.originalname} `);
              });
          }
          res.send(`Upload Complete is  [${_files}]`);
      });
  }
}
export default UploadController;