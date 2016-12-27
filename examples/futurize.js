const Task = require('data.task'),
  futurize = require('futurize').futurize,
  future = futurize(Task)

// plain function
const helloAsync = (name, cb) => {
  setTimeout(() => {
    return cb(null, `Hello, ${name}`)
  }, 700)
}

const hello = future(helloAsync)

console.log("Wait a moment!")

hello('futurize!!!!')
  .fork(
    error => {
      console.error(error)
    }, 
    data => {
      console.log(data)
      //=> Hello, futurize!!!!
    }
)

const fs = require('fs')
const read = future(fs.readFile)

const decode = buffer => 
  buffer
    .map(a => a.toString('utf-8'))

decode(read('README.md'))
.fork(
  error => console.error(error)
  , 
  data => console.log(data)
)


