# JsonSchemaForm

Auto-generated form from JSON Schema.

## Import

```tsx
import { JsonSchemaForm } from 'glass-ui-solid';
```

## Usage

### Basic

```tsx
const schema = {
  type: 'object',
  properties: {
    name: { type: 'string', title: 'Name' },
    email: { type: 'string', format: 'email', title: 'Email' },
    age: { type: 'integer', title: 'Age', minimum: 0 },
  },
  required: ['name', 'email'],
};

const [value, setValue] = createSignal({});

<JsonSchemaForm
  schema={schema}
  value={value()}
  onChange={setValue}
/>
```

### String Formats

```tsx
const schema = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    website: { type: 'string', format: 'uri' },
    date: { type: 'string', format: 'date' },
    time: { type: 'string', format: 'time' },
    datetime: { type: 'string', format: 'date-time' },
    password: { type: 'string', format: 'password' },
  },
};
```

### With Constraints

```tsx
const schema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      minLength: 3,
      maxLength: 20,
      pattern: '^[a-z0-9_]+$',
    },
    age: {
      type: 'integer',
      minimum: 18,
      maximum: 120,
    },
    price: {
      type: 'number',
      minimum: 0,
      multipleOf: 0.01,
    },
  },
};
```

### Enum (Select)

```tsx
const schema = {
  type: 'object',
  properties: {
    country: {
      type: 'string',
      title: 'Country',
      enum: ['us', 'uk', 'fr', 'de'],
    },
    status: {
      type: 'string',
      title: 'Status',
      enum: ['active', 'inactive', 'pending'],
    },
  },
};
```

### Nested Objects

```tsx
const schema = {
  type: 'object',
  properties: {
    user: {
      type: 'object',
      title: 'User Details',
      properties: {
        name: { type: 'string' },
        email: { type: 'string', format: 'email' },
      },
    },
    address: {
      type: 'object',
      title: 'Address',
      properties: {
        street: { type: 'string' },
        city: { type: 'string' },
        zip: { type: 'string' },
      },
    },
  },
};
```

### Arrays

```tsx
const schema = {
  type: 'object',
  properties: {
    tags: {
      type: 'array',
      title: 'Tags',
      items: { type: 'string' },
    },
    contacts: {
      type: 'array',
      title: 'Contacts',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          phone: { type: 'string' },
        },
      },
    },
  },
};
```

### Boolean Fields

```tsx
const schema = {
  type: 'object',
  properties: {
    newsletter: {
      type: 'boolean',
      title: 'Subscribe to newsletter',
    },
    terms: {
      type: 'boolean',
      title: 'Accept terms and conditions',
    },
  },
};
```

### With Descriptions

```tsx
const schema = {
  type: 'object',
  properties: {
    apiKey: {
      type: 'string',
      title: 'API Key',
      description: 'Your unique API key from the dashboard',
    },
  },
};
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `schema` | `Schema` | required | JSON Schema definition |
| `value` | `unknown` | required | Current form value |
| `onChange` | `(value: unknown) => void` | required | Value change callback |
| `required` | `boolean` | `false` | Mark as required |
| `path` | `string[]` | `[]` | Field path (for nested) |

## Supported Schema Features

### Types

- `string` - Text input
- `number` / `integer` - Number input
- `boolean` - Checkbox
- `array` - Dynamic list
- `object` - Nested form
- `null` - Nullable fields

### String Formats

- `email` - Email input
- `uri` - URL input
- `date` - Date picker
- `time` - Time picker
- `date-time` - DateTime picker
- `password` - Password input

### Constraints

- `minLength` / `maxLength` - String length
- `pattern` - Regex validation
- `minimum` / `maximum` - Number range
- `exclusiveMinimum` / `exclusiveMaximum`
- `multipleOf` - Number step
- `minItems` / `maxItems` - Array length
- `uniqueItems` - Unique array items
- `enum` - Select dropdown
- `const` - Fixed value
- `required` - Required fields
