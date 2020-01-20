
import App from './app';
import IndexController from './controllers/index.controller';
import TestController from './controllers/testData.controller';
const app = new App(
  [
    new IndexController(),
    new TestController()
  ]
);
app.listen();

