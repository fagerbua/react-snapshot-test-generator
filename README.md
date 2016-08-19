# react-snapshot-test-generator
![Travis build status](https://travis-ci.org/fagerbua/react-snapshot-test-generator.svg?branch=master)

Automatically generate boilerplate for React component snapshot tests

## Rationale

[React Tree Snapshot Testing](https://facebook.github.io/jest/blog/2016/07/27/jest-14.html) is great, but defining the tests generates a fair bit of boilerplate. If your code structure follows some simple conventions, `react-snapshot-test-generator` can do the work for you.

## Getting started

### Requirements
If you're new to snapshot testing with [React](https://facebook.github.io/react) and [Jest](https://facebook.github.io/jest), check out the official tutorials ([React](https://facebook.github.io/jest/docs/tutorial-react.html), [React Native](https://facebook.github.io/jest/docs/tutorial-react-native.html)) and get your first test working before continuing.

The generator expects the component `<MyComponent />` to be available as the default export of a file named `MyComponent.js`. If your code has a different structure, you may want to modify the generator script accordingly.

### Installation
Once you have the test renderer working with Jest, run
```
npm install --save-dev react-snapshot-test-generator
```
in your project folder.

### Configuration
Before generating tests, you need to specify your components. Create a file named `snapshotTestConfig.js` in your project root folder that looks like this:

```javascript
module.exports = {
  componentDefinitions: {
    'components': [
      'MySimpleConstantComponent', // Causes './components/MySimpleConstantComponent' to be imported
                                   // and generates a snapshot test for <MySimpleConstantComponent />
    ],
    'widgets': [
      'MySimpleWidget', // Causes './widgets/MySimpleWidget' to be imported and generates a snapshot
                        // test for <MySimpleWidget />
      ['MyComplexWidget', [ // Props are specified as plain objects. The enclosing array is mandatory.
        {aBooleanProp: false, aStringProp: "value"},
        {aBooleanProp: true, aStringProp: "value"},
      ]], // Causes './widgets/MyComplexWidget' to be imported and generates snapshot tests for
          // <MyComplexWidget aBooleanProp={false} aStringProp={"value"} /> as well as
          // <MyComplexWidget aBooleanProp={true} aStringProp={"value"} />
    ],
  },
  autoMocks: ['TextInput'], // Optional: automatically generate simple mocks. Particularly useful
                            // for React Native.
}
```

In `package.json`, add scripts like the following for easy test generation:
```json
scripts: {
  "generateTests": "react-snapshot-test-generator",
  "test": "npm run generateTests && jest"
}
```

### Generating tests
Simply running `npm run generateTests` will read the configuration from `snapshotTestConfig.js` and generate a test file in `__tests__/snapshotTests.js`.

The test generation can be customized. Run `npm run generateTests -- -h` to get information about the available command line options. Note in particular the `-n` flag for generating React Native tests.

## Credits
Development of this tool is supported by the University of Oslo.

## License

[MIT](LICENSE)
