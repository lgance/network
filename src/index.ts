
import App from './app';
import IndexController from './controllers/index.controller';
import TestController from './controllers/testData.controller';
import UploadController from './controllers/upload.controller';
const app = new App(
  [
    new IndexController(),
    new TestController(),
    new UploadController()
  ]
);
app.listen();

