import { NextFunction,Request,Response } from 'express';

function exceptionController(req:Request,res:Response,next:NextFunction){
    let errorMsg: string =
      "Test Internal Server Error 4xx not matched API Address";
    res.status(404).send(errorMsg);
}

export default exceptionController;