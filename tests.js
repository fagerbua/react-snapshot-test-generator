import 'should'
import * as f from "./lib/functions"
import * as t from "./lib/templates"

console.log('Running tests ...')
f.parseDefinitions({
  'path/to/somewhere': [
    ['FirstComponent', [{prop1: "value1", prop2: "value2"},
                        {prop3: "value3", prop4: "value4"}],
    ]],
  'path/to/elsewhere': [
    'ThirdComponent',
    ['FourthComponent', [{prop7: "value7", prop8: "value8"}]],
  ],
}).should.deepEqual([
  { path: 'path/to/somewhere',
    components: [
      {
        name: 'FirstComponent',
        props: [
          {prop1: "value1", prop2: "value2"},
          {prop3: "value3", prop4: "value4"},
        ],
      },
    ],
  },
  { path: 'path/to/elsewhere',
    components: [
      {
        name: 'ThirdComponent',
        props: [{}],
      },
      {
        name: 'FourthComponent',
        props: [{prop7: "value7", prop8: "value8"}],
      },
    ],
  },
])

f.flatten([["this", "that"], ["something", "else"]]).should.equal("this\nthat\nsomething\nelse")

t.jestReactMock("Module").should.equal("jest.mock('Module', () => 'Module')")

f.jestReactMocks(["Module1", "Module2"]).should.equal("jest.mock('Module1', () => 'Module1')\njest.mock('Module2', () => 'Module2')")

t.componentImport('here/there', 'TestComponent').should.equal("import TestComponent from '../here/there/TestComponent'")

t.jsxProp('key', 'value').should.equal("key={value}")

f.jsxProps({key1: 'value1', key2: 'value2'}).should.equal("key1={value1} key2={value2}")

f.jsxProps({}).should.equal("")

t.jsxTag("Test", "key={val}").should.equal('<Test key={val} />')

t.jsxTag("Test", "").should.equal('<Test />')

t.testDescription("TestComponent", "key={value} key2={anotherValue}").should.equal(`
describe(\`<TestComponent key={value} key2={anotherValue} />\`, () => {
  it('renders correctly', () => {
    snapshotTest(<TestComponent key={value} key2={anotherValue} />)
  })
})`)

t.testDescription("TestComponent", "").should.equal(`
describe(\`<TestComponent />\`, () => {
  it('renders correctly', () => {
    snapshotTest(<TestComponent />)
  })
})`)

console.log("All tests passed!")
