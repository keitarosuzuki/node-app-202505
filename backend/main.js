const module_test = require('./module_test');
const path = require('path');
const fs = require('fs').promises;

let imageName = 'guitar_effector.png';
let filepath = path.join(__dirname, 'hoge', imageName);

console.log('start');

const fspromise = async () => {
  try{
    const data = await fs.readFile('./test.txt', 'utf-8');
    console.log(data);
    console.log('end')
  } catch (err) {
    console.log(err);
  }
}

fspromise();

// console.log(module_test.add(100, 200));
// console.log(module_test.sub(100, 200));

// console.log(filepath)