import { Card, CodeBlock, JsonSchemaForm, type Schema } from 'glass-ui-solid';
import { createSignal } from 'solid-js';
import {
  CodePill,
  DemoSection,
  PageHeader,
  PropsTable,
} from '../../components/demo';

// Simple user schema
const simpleUserSchema: Schema = {
  type: 'object',
  properties: {
    name: { type: 'string', title: 'Name' },
    email: { type: 'string', title: 'Email', format: 'email' },
    age: { type: 'integer', title: 'Age', minimum: 0, maximum: 150 },
  },
  required: ['name', 'email'],
};

// Schema with enum
const enumSchema: Schema = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
      title: 'Status',
      enum: ['active', 'inactive', 'pending'],
    },
    priority: {
      type: 'string',
      title: 'Priority',
      enum: ['low', 'medium', 'high', 'critical'],
    },
  },
};

// Schema with boolean
const settingsSchema: Schema = {
  type: 'object',
  properties: {
    notifications: { type: 'boolean', title: 'Enable Notifications' },
    darkMode: { type: 'boolean', title: 'Dark Mode' },
    newsletter: { type: 'boolean', title: 'Subscribe to Newsletter' },
  },
};

// Schema with array
const tagsSchema: Schema = {
  type: 'object',
  properties: {
    title: { type: 'string', title: 'Title' },
    tags: {
      type: 'array',
      title: 'Tags',
      items: { type: 'string' },
    },
  },
};

// Schema with nested objects
const addressSchema: Schema = {
  type: 'object',
  properties: {
    name: { type: 'string', title: 'Full Name' },
    address: {
      type: 'object',
      title: 'Address',
      properties: {
        street: { type: 'string', title: 'Street' },
        city: { type: 'string', title: 'City' },
        zipCode: { type: 'string', title: 'Zip Code' },
        country: {
          type: 'string',
          title: 'Country',
          enum: ['France', 'USA', 'UK', 'Germany', 'Japan'],
        },
      },
      required: ['street', 'city'],
    },
  },
};

// Schema with oneOf (union types)
const oneOfSchema: Schema = {
  type: 'object',
  properties: {
    paymentMethod: {
      title: 'Payment Method',
      oneOf: [
        {
          type: 'object',
          title: 'Credit Card',
          properties: {
            cardNumber: { type: 'string', title: 'Card Number' },
            expiry: { type: 'string', title: 'Expiry Date' },
            cvv: { type: 'string', title: 'CVV' },
          },
        },
        {
          type: 'object',
          title: 'Bank Transfer',
          properties: {
            iban: { type: 'string', title: 'IBAN' },
            bic: { type: 'string', title: 'BIC' },
          },
        },
        {
          type: 'object',
          title: 'PayPal',
          properties: {
            email: { type: 'string', title: 'PayPal Email' },
          },
        },
      ],
    },
  },
};

// Complex schema with arrays of objects
const complexSchema: Schema = {
  type: 'object',
  properties: {
    projectName: { type: 'string', title: 'Project Name' },
    description: { type: 'string', title: 'Description' },
    isPublic: { type: 'boolean', title: 'Public Project' },
    team: {
      type: 'array',
      title: 'Team Members',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string', title: 'Name' },
          role: {
            type: 'string',
            title: 'Role',
            enum: ['developer', 'designer', 'manager', 'qa'],
          },
          email: { type: 'string', title: 'Email' },
        },
        required: ['name', 'role'],
      },
    },
  },
  required: ['projectName'],
};

export default function JsonSchemaFormPage() {
  const [simpleValue, setSimpleValue] = createSignal<Record<string, unknown>>({
    name: '',
    email: '',
    age: 25,
  });

  const [enumValue, setEnumValue] = createSignal<Record<string, unknown>>({
    status: 'active',
    priority: 'medium',
  });

  const [settingsValue, setSettingsValue] = createSignal<
    Record<string, unknown>
  >({
    notifications: true,
    darkMode: false,
    newsletter: true,
  });

  const [tagsValue, setTagsValue] = createSignal<Record<string, unknown>>({
    title: 'My Article',
    tags: ['javascript', 'solidjs'],
  });

  const [addressValue, setAddressValue] = createSignal<Record<string, unknown>>(
    {
      name: 'John Doe',
      address: {
        street: '123 Main St',
        city: 'Paris',
        zipCode: '75001',
        country: 'France',
      },
    },
  );

  const [oneOfValue, setOneOfValue] = createSignal<Record<string, unknown>>({
    paymentMethod: {
      cardNumber: '',
      expiry: '',
      cvv: '',
    },
  });

  const [complexValue, setComplexValue] = createSignal<Record<string, unknown>>(
    {
      projectName: 'Glass UI',
      description: 'A beautiful component library',
      isPublic: true,
      team: [
        { name: 'Alice', role: 'developer', email: 'alice@example.com' },
        { name: 'Bob', role: 'designer', email: 'bob@example.com' },
      ],
    },
  );

  return (
    <div class="space-y-8">
      <PageHeader
        title="JsonSchemaForm"
        description="A recursive form renderer that generates form fields from JSON Schema definitions. Supports primitive types, nested objects, arrays, enums, and union types (oneOf/anyOf)."
      />

      <DemoSection
        title="Import"
        code="import { JsonSchemaForm, type Schema } from 'glass-ui-solid';"
      />

      <DemoSection
        title="Basic Usage"
        description="Define a JSON Schema and the form will automatically render appropriate input fields."
        code={`const schema: Schema = {
  type: 'object',
  properties: {
    name: { type: 'string', title: 'Name' },
    email: { type: 'string', title: 'Email', format: 'email' },
    age: { type: 'integer', title: 'Age', minimum: 0, maximum: 150 },
  },
  required: ['name', 'email'],
};

const [value, setValue] = createSignal({});

<JsonSchemaForm
  schema={schema}
  value={value()}
  onChange={setValue}
/>`}
      >
        <JsonSchemaForm
          schema={simpleUserSchema}
          value={simpleValue()}
          onChange={(v) => setSimpleValue(v as Record<string, unknown>)}
        />
        <div class="mt-4 p-3 bg-surface-100 dark:bg-surface-800 rounded-lg">
          <p class="text-xs font-mono text-surface-600 dark:text-surface-400">
            Value: {JSON.stringify(simpleValue(), null, 2)}
          </p>
        </div>
      </DemoSection>

      <DemoSection
        title="Enum Fields"
        description={
          <>
            Use <CodePill>enum</CodePill> in the schema to render a select
            dropdown.
          </>
        }
        code={`const schema: Schema = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
      title: 'Status',
      enum: ['active', 'inactive', 'pending'],
    },
    priority: {
      type: 'string',
      title: 'Priority',
      enum: ['low', 'medium', 'high', 'critical'],
    },
  },
};`}
      >
        <JsonSchemaForm
          schema={enumSchema}
          value={enumValue()}
          onChange={(v) => setEnumValue(v as Record<string, unknown>)}
        />
        <div class="mt-4 p-3 bg-surface-100 dark:bg-surface-800 rounded-lg">
          <p class="text-xs font-mono text-surface-600 dark:text-surface-400">
            Value: {JSON.stringify(enumValue())}
          </p>
        </div>
      </DemoSection>

      <DemoSection
        title="Boolean Fields"
        description="Boolean types are rendered as toggle switches."
        code={`const schema: Schema = {
  type: 'object',
  properties: {
    notifications: { type: 'boolean', title: 'Enable Notifications' },
    darkMode: { type: 'boolean', title: 'Dark Mode' },
    newsletter: { type: 'boolean', title: 'Subscribe to Newsletter' },
  },
};`}
      >
        <JsonSchemaForm
          schema={settingsSchema}
          value={settingsValue()}
          onChange={(v) => setSettingsValue(v as Record<string, unknown>)}
        />
        <div class="mt-4 p-3 bg-surface-100 dark:bg-surface-800 rounded-lg">
          <p class="text-xs font-mono text-surface-600 dark:text-surface-400">
            Value: {JSON.stringify(settingsValue())}
          </p>
        </div>
      </DemoSection>

      <DemoSection
        title="Array Fields"
        description="Arrays render with add/remove buttons for dynamic list management."
        code={`const schema: Schema = {
  type: 'object',
  properties: {
    title: { type: 'string', title: 'Title' },
    tags: {
      type: 'array',
      title: 'Tags',
      items: { type: 'string' },
    },
  },
};`}
      >
        <JsonSchemaForm
          schema={tagsSchema}
          value={tagsValue()}
          onChange={(v) => setTagsValue(v as Record<string, unknown>)}
        />
        <div class="mt-4 p-3 bg-surface-100 dark:bg-surface-800 rounded-lg">
          <p class="text-xs font-mono text-surface-600 dark:text-surface-400">
            Value: {JSON.stringify(tagsValue())}
          </p>
        </div>
      </DemoSection>

      <DemoSection
        title="Nested Objects"
        description="Objects can be nested to any depth. Each nested object gets its own fieldset."
        code={`const schema: Schema = {
  type: 'object',
  properties: {
    name: { type: 'string', title: 'Full Name' },
    address: {
      type: 'object',
      title: 'Address',
      properties: {
        street: { type: 'string', title: 'Street' },
        city: { type: 'string', title: 'City' },
        zipCode: { type: 'string', title: 'Zip Code' },
        country: {
          type: 'string',
          title: 'Country',
          enum: ['France', 'USA', 'UK', 'Germany', 'Japan'],
        },
      },
      required: ['street', 'city'],
    },
  },
};`}
      >
        <JsonSchemaForm
          schema={addressSchema}
          value={addressValue()}
          onChange={(v) => setAddressValue(v as Record<string, unknown>)}
        />
        <div class="mt-4 p-3 bg-surface-100 dark:bg-surface-800 rounded-lg">
          <p class="text-xs font-mono text-surface-600 dark:text-surface-400 whitespace-pre">
            Value: {JSON.stringify(addressValue(), null, 2)}
          </p>
        </div>
      </DemoSection>

      <DemoSection
        title="Union Types (oneOf)"
        description={
          <>
            Use <CodePill>oneOf</CodePill> to allow selecting between different
            schema variants.
          </>
        }
        code={`const schema: Schema = {
  type: 'object',
  properties: {
    paymentMethod: {
      title: 'Payment Method',
      oneOf: [
        {
          type: 'object',
          title: 'Credit Card',
          properties: {
            cardNumber: { type: 'string', title: 'Card Number' },
            expiry: { type: 'string', title: 'Expiry Date' },
            cvv: { type: 'string', title: 'CVV' },
          },
        },
        {
          type: 'object',
          title: 'Bank Transfer',
          properties: {
            iban: { type: 'string', title: 'IBAN' },
            bic: { type: 'string', title: 'BIC' },
          },
        },
      ],
    },
  },
};`}
      >
        <JsonSchemaForm
          schema={oneOfSchema}
          value={oneOfValue()}
          onChange={(v) => setOneOfValue(v as Record<string, unknown>)}
        />
        <div class="mt-4 p-3 bg-surface-100 dark:bg-surface-800 rounded-lg">
          <p class="text-xs font-mono text-surface-600 dark:text-surface-400 whitespace-pre">
            Value: {JSON.stringify(oneOfValue(), null, 2)}
          </p>
        </div>
      </DemoSection>

      <DemoSection
        title="Complex Example"
        description="Combining arrays of objects with nested properties."
        code={`const schema: Schema = {
  type: 'object',
  properties: {
    projectName: { type: 'string', title: 'Project Name' },
    description: { type: 'string', title: 'Description' },
    isPublic: { type: 'boolean', title: 'Public Project' },
    team: {
      type: 'array',
      title: 'Team Members',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string', title: 'Name' },
          role: {
            type: 'string',
            title: 'Role',
            enum: ['developer', 'designer', 'manager', 'qa'],
          },
          email: { type: 'string', title: 'Email' },
        },
        required: ['name', 'role'],
      },
    },
  },
  required: ['projectName'],
};`}
      >
        <JsonSchemaForm
          schema={complexSchema}
          value={complexValue()}
          onChange={(v) => setComplexValue(v as Record<string, unknown>)}
        />
        <div class="mt-4 p-3 bg-surface-100 dark:bg-surface-800 rounded-lg">
          <p class="text-xs font-mono text-surface-600 dark:text-surface-400 whitespace-pre">
            Value: {JSON.stringify(complexValue(), null, 2)}
          </p>
        </div>
      </DemoSection>

      <DemoSection title="Props" card={false}>
        <PropsTable
          props={[
            {
              name: 'schema',
              type: 'Schema',
              default: 'required',
              description: 'The JSON Schema definition to render',
            },
            {
              name: 'value',
              type: 'unknown',
              default: 'required',
              description: 'Current form value',
            },
            {
              name: 'onChange',
              type: '(value: unknown) => void',
              default: 'required',
              description: 'Callback when value changes',
            },
            {
              name: 'required',
              type: 'boolean',
              default: 'false',
              description: 'Whether the root field is required',
            },
            {
              name: 'path',
              type: 'string[]',
              default: '[]',
              description: 'Path to this field (for nested forms)',
            },
          ]}
        />
      </DemoSection>

      <DemoSection title="Schema Interface" card={false}>
        <Card class="p-6">
          <CodeBlock
            code={`interface Schema {
  type?: 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object' | 'null';
  format?: string;
  title?: string;
  description?: string;
  default?: unknown;
  enum?: unknown[];

  // String constraints
  minLength?: number;
  maxLength?: number;
  pattern?: string;

  // Number constraints
  minimum?: number;
  maximum?: number;

  // Array constraints
  items?: Schema;
  minItems?: number;
  maxItems?: number;

  // Object constraints
  properties?: Record<string, Schema>;
  required?: string[];

  // Composition
  oneOf?: Schema[];
  anyOf?: Schema[];
}`}
            language="tsx"
          />
        </Card>
      </DemoSection>

      <DemoSection
        title="Exported Field Components"
        description="For advanced usage, individual field components are exported:"
        card={false}
      >
        <Card class="p-6">
          <CodeBlock
            code={`import {
  StringField,
  NumberField,
  BooleanField,
  EnumField,
  OneOfField,
  ObjectField,
  ArrayField,
  SchemaField,
} from 'glass-ui-solid';`}
            language="tsx"
          />
        </Card>
      </DemoSection>

      <DemoSection
        title="Utility Functions"
        description="Helper functions are available for working with schema values:"
        card={false}
      >
        <Card class="p-6">
          <CodeBlock
            code={`import { getDefaultValue, toDisplayString, toDisplayStringJson } from 'glass-ui-solid';

// Get default value from schema
const defaultValue = getDefaultValue(schema);

// Convert value to display string
const display = toDisplayString(value);

// Convert value to formatted JSON string
const json = toDisplayStringJson(value);`}
            language="tsx"
          />
        </Card>
      </DemoSection>
    </div>
  );
}
