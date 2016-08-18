import { jestReactMock, jsxProp } from './templates'

export const parseDefinitions = (definitions) =>
  Object.keys(definitions)
        .map(path => ({path, components: definitions[path]}))
        .map(({path, components}) => ({
          path,
          components: components.map(component => (
            typeof(component) === 'string' ? {name: component, props: [{}] } :
            {name: component[0], props: component[1]}
          ))}))

export const flatten = (nested, separator="\n") => nested.map(array => array.join(separator)).join(separator)
export const jestReactMocks = (mocks) => mocks.map(name => jestReactMock(name)).join("\n")
export const jsxProps = (props) => Object.keys(props)
                                  .map(name => jsxProp(name, props[name]))
                                         .join(" ")

export const transformDefinitions = (definitions, transformer) => flatten(parseDefinitions(definitions).map(transformer))

export default transformDefinitions
