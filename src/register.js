import baseSchema from './form-schema.json';
import { fields as baseFields, presetRules } from '@kne/react-form-antd';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';

export const fields = { ...baseFields }, nodes = {}, formSchema = cloneDeep(baseSchema);

formSchema.definitions.fieldType.enum = Object.keys(fields);

export default {
  appendNode(name, Component) {
    if (nodes[name]) {
      throw new Error(`${name}已存在`);
    }
    nodes[name] = Component;
    formSchema.definitions.nodeType.enum.push(name);
  },
  appendRule(name, func, schema) {
    presetRules({
      [name]: func
    });
    const target = Object.assign({}, schema, {
      title: `规则-${name}`,
      'type': 'string',
      'const': name
    });

    if (!formSchema.fieldRule.oneOf.find((item) => isEqual(item, target))) {
      formSchema.fieldRule.oneOf.push(target);
    }
  },
  appendField(name, Component) {
    if (fields[name]) {
      throw new Error(`${name}已存在`);
    }
    fields[name] = Component;
    formSchema.definitions.fieldType.enum.push(name);
  }
};


