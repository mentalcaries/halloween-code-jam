const express = require('express')
const {spawn} = require('child_process');
const app = express()
const PORT = 3001


app.get('/', (req, res) => {
 
 let dataToSend;
 // spawn new child process to call the python script
 const python = spawn('python3', ['scripts/ml.py']);
 // collect data from script
 python.stdout.on('data', function (data) {
  console.log('Pipe data from python script ...');
  dataToSend = data.toString();
 });
 // in close event we are sure that stream from child process is closed
 python.on('exit', (code) => {
 console.log(`child process close all stdio with code ${code}`);
 // send data to browser
 res.send(dataToSend)
 });
 
})
app.listen(PORT, () => console.log(`Example app listening on port 
${PORT}!`))