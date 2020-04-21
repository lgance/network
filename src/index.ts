import App from "./app";
import IndexController from "./controllers/index.controller";
import TestController from "./controllers/testData.controller";
import UploadController from "./controllers/upload.controller";
import TransactionController from "./controllers/transaction.controller";
const app = new App([
  new IndexController(),
  new TestController(),
  new UploadController(),
  new TransactionController(),
]);
app.listen();
