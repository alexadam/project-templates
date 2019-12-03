import express from 'express';
import Hello from './Hello'

const app = express();
const port = 8080;

app.get('/', (req, res) => {

  const helloMessage = Hello.getInstance().sayHello()
  
  res.send(helloMessage);
});

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});