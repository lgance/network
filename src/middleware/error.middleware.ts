import { NextFunction,Request,Response } from 'express';

class HttpException extends Error {
  public status: number;
  public message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

/** Internal Server Error */

function errorMiddleware(error:HttpException,req:Request,res:Response,next:NextFunction){
  const status = error.status || 500;
  const message = error.message || `Test Internal Server Error ${status} not matched API Address`;
  res
    .status(status)
    .send({
      message,
      status
    });
}

export default errorMiddleware