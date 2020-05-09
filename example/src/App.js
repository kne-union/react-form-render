import React from 'react';
import FormRender from '@kne/react-form-render';
import '@kne/react-form-render/dist/style.scss';
import 'antd/dist/antd.css';

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
        },
        {
          type: 'field',
          tagName: 'Input',
          name: 'email',
          label: '邮箱',
          rule: ['REQ', 'EMAIL']
        },
        {
          type: 'field',
          tagName: 'Select',
          name: 'work',
          label: '职业',
          rule: ['REQ']
        },
        {
          type: 'field',
          tagName: 'DatePicker',
          label: '生日',
          name: 'birthday',
          rule: ['REQ']
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
    }}/>
  );
};
