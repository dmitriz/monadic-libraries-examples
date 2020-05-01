# monadic-libraries-examples



Usage examples with tests of various Monadic libraries

### Related projects
- [Examples with Functional JavaScript, following Professor Frisby's course](https://github.com/dmitriz/functional-examples)

### Libaries used
- [`ramda`](http://ramdajs.com/)
- [`ramda-fantasy`](https://github.com/ramda/ramda-fantasy)

### Usage examples
All examples are in the `examples` folder

### Tests
All test files have `_test.js` in their names and are placed next to the relevant example files for better cohesion. (There is no "test" folder.)

### Runing tests
Simply run any of those: 
```sh
npm test 
karma start
yarn test
```

### Testing tools used
Karma with Jasmine and Webpack.

### Why karma?
See here about the advantages of Karma:
https://github.com/dmitriz/min-karma#karma

### Configure
All tests inside `examples` folder should run out of the box.
To run tests from other folders, simply update the `files:` setting inside `karma.conf.js`

### Karma married with Webpack
See here for more information about Karma working with Webpack:
https://github.com/dmitriz/min-karma-webpack
