// Main component
export { JsonSchemaForm } from './JsonSchemaForm';

// Registry
export {
  FieldRegistryContext,
  FieldRegistryProvider,
  useFieldRegistry,
  mergeConfigs,
  resolveFieldFromRegistry,
} from './registry';
export type {
  FieldComponent,
  FieldResolver,
  FieldRegistryConfig,
  FieldRegistryProviderProps,
} from './registry';

// Types
export type {
  Schema,
  SchemaType,
  JsonSchemaFormProps,
  BaseFieldProps,
  ObjectFieldProps,
  ArrayFieldProps,
  SchemaFieldProps,
} from './types';

// Field components (for advanced usage)
export {
  StringField,
  NumberField,
  BooleanField,
  EnumField,
  OneOfField,
  ObjectField,
  ArrayField,
  SchemaField,
} from './fields';

// Utilities
export { getDefaultValue, toDisplayString, toDisplayStringJson } from './utils';
