# react-form
该组件可以通过一个由jsonschema格式检查的json数据渲染出一个form表单

```shell script
npm i @kne/react-form-render
```

# 使用示例

```jsx
import FormRender from '@kne/react-form-render';
import '@kne/react-form-render/dist/style.scss';

export default () => {
  return (
    <FormRender schema={{
      title: '登录页',
      padding: [10, 20],
      children: [
        {
          type: 'field',
          tagName: 'Input',
          name: 'name',
          label: '姓名',
          rule: ['REQ']
        },
        {
          type: 'field',
          tagName: 'Input',
          name: 'pwd',
          label: '密码',
          rule: ['REQ', 'LEN-6-10'],
          props: {
            type: 'password'
          }
        },{
          type:'container',
          children:[
            {
              type: 'field',
              tagName: "Input",
              label: '字段0',
              name: 'field0',
              rule: ['REQ']
            },{
              type: 'field',
              tagName: "Input",
              label: '字段1',
              name: 'field1',
              rule: ['REQ']
            }
          ]
        },{
          type:'container',
          children:[
            {
              type: 'submitButton',
              children: '保存'
            },{
              type:'resetButton'
            }
          ]
        }
      ]
    }} onSubmit={(data)=>console.log(data)}/>
  );
};
```

# API

## FormRender

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |
| schema | json数据，必须符合预定义的jsonschema格式，参考 [form-schema.json](https://github.com/kne-union/react-form-render/blob/master/src/form-schema.json) | object | - |

其他属性参考 [@kne/react-form-antd](https://github.com/kne-union/react-form-antd)

## register

### register.appendField(name, Component)

name: 注册名，可以在schema数据的field里使用

Component: 组件对象，需要扩展的ReactComponent

### register.appendNode(name, Component)

name: 注册名，可以在schema数据的field里使用

Component: 组件对象，需要扩展的ReactComponent

### register.appendRule(name, func, schema)

name: 规则名，可以在schema数据的rule里使用

func: 规则函数 参考 [@kne/react-form](https://github.com/kne-union/react-form)

schema(可选):schema 规则，默认值为
```js
{
  title: `规则-${name}`,
  'type': 'string',
  'const': name
}
```

# Change Log