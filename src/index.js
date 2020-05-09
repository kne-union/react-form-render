import React, { useMemo, createElement } from 'react';
import Form, { SubmitButton, ResetButton } from '@kne/react-form-antd';
import { Space, Alert } from 'antd';
import register$, { formSchema, fields, nodes } from './register';
import classnames from 'classnames';
import { validate, ValidationError } from 'jsonschema';
import ErrorBoundary from '@kne/react-error-boundary';
import '@kne/react-form-antd/dist/style.scss';
import './style.scss';

const renderChildren = (children) => {
  return children.map(({ type, ...props }, index) => {
    const MappingComponent = mapping[type];
    return <MappingComponent key={index} {...props}/>;
  });
};

const Field = ({ tagName, rule, name, label, props }) => {
  const TargetComponent = fields[tagName];
  return <TargetComponent name={name} label={label} {...props} rule={rule.join(' ')}/>;
};

const Node = ({ tagName, props }) => {
  if (nodes[tagName]) {
    const TargetComponent = nodes[tagName];
    return <TargetComponent {...props}/>;
  }
  return createElement(tagName, props);
};

const List = ({ title, children }) => {
  return <div className="list">
    <div className="title">{title}</div>
    <div className="list-content">{renderChildren(children)}</div>
  </div>;
};

const Container = ({ title, padding, children, props }) => {
  return <div className="container">
    {title ? <div className="container-title">{title}</div> : null}
    <Space className="container-content" {...props} style={{
      padding: (padding || [0, 0]).map((num) => num + 'px').join(' ')
    }}>{renderChildren(children)}</Space>
  </div>;
};

const mapping = {
  'field': Field,
  'node': Node,
  'list': List,
  'container': Container,
  'submitButton': ({ children, props }) => <SubmitButton block
                                                         type="primary" {...props}>{children || '提交'}</SubmitButton>,
  'resetButton': ({ children, props }) => <ResetButton block {...props}>{children || '重置'}</ResetButton>
};

const FormRender = ({ schema: _schema, ...props }) => {
  const schema = useMemo(() => {
    const schemaValidate = validate(_schema, formSchema);
    if (!schemaValidate.valid) {
      throw schemaValidate.errors;
    }
    return schemaValidate.instance;
  }, [_schema]);

  return (
    <Form {...props} className={classnames('form-render', schema.className)} type={schema.type}
          scrollToError={schema.scrollToError} enterSubmit={schema.enterSubmit} size={schema.size}>
      <div style={{
        padding: (schema.padding || [0, 0]).map((num) => num + 'px').join(' ')
      }} className="content">
        {renderChildren(schema.children)}
      </div>
    </Form>
  );
};

export default (props) => {
  return <ErrorBoundary errorRender={(error) => {
    console.error(error);
    if (Array.isArray(error) && error[0] instanceof ValidationError) {
      return <Alert
        message="表单渲染失败"
        description={error.map((item) => `${item.message}，请检查「${JSON.stringify(item.instance)}」处数据是否符合jsonschema规则`).join(',')}
        type="error"
      />;
    }
    return null;
  }}><FormRender {...props}/></ErrorBoundary>;
};

export const register = register$;

export const schema = formSchema;
