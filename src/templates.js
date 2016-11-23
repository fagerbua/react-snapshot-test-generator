export const componentImport = (path, name) => `import ${name} from '../${path}/${name}'`

export const jestReactMock = (mock) => `jest.mock('${mock}', () => '${mock}')`

export const jsxProp = (name, value) => `${name}={${value}}`

export const jsxTag = (name, props) => props.length > 0 ? `<${name} ${props} />` : `<${name} />`

export const testDescription = (componentName, componentProps) => `
describe(\`${jsxTag(componentName, componentProps)}\`, () => {
  it('renders correctly', () => {
    snapshotTest(${jsxTag(componentName, componentProps)})
  })
})`
