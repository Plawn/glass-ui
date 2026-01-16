import { JsonSchemaForm, CodeBlock, Card, type Schema } from 'glass-ui-solid';
import { createSignal } from 'solid-js';

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

  const [settingsValue, setSettingsValue] = createSignal<Record<string, unknown>>({
    notifications: true,
    darkMode: false,
    newsletter: true,
  });

  const [tagsValue, setTagsValue] = createSignal<Record<string, unknown>>({
    title: 'My Article',
    tags: ['javascript', 'solidjs'],
  });

  const [addressValue, setAddressValue] = createSignal<Record<string, unknown>>({
    name: 'John Doe',
    address: {
      street: '123 Main St',
      city: 'Paris',
      zipCode: '75001',
      country: 'France',
    },
  });

  const [oneOfValue, setOneOfValue] = createSignal<Record<string, unknown>>({
    paymentMethod: {
      cardNumber: '',
      expiry: '',
      cvv: '',
    },
  });

  const [complexValue, setComplexValue] = createSignal<Record<string, unknown>>({
    projectName: 'Glass UI',
    description: 'A beautiful component library',
    isPublic: true,
    team: [
      { name: 'Alice', role: 'developer', email: 'alice@example.com' },
      { name: 'Bob', role: 'designer', email: 'bob@example.com' },
    ],
  });

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">
          JsonSchemaForm
        </h1>
        <p class="text-surface-600 dark:text-surface-400">
          A recursive form renderer that generates form fields from JSON Schema definitions.
          Supports primitive types, nested objects, arrays, enums, and union types (oneOf/anyOf).
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Import
        </h2>
        <CodeBlock
          code={`import { JsonSchemaForm, type Schema } from 'glass-ui-solid';`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Basic Usage
        </h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Define a JSON Schema and the form will automatically render appropriate input fields.
        </p>
        <Card class="p-6 space-y-4">
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
        </Card>
        <CodeBlock
          class="mt-4"
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
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Enum Fields
        </h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Use <code class="text-primary-600 dark:text-primary-400">enum</code> in the schema
          to render a select dropdown.
        </p>
        <Card class="p-6 space-y-4">
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
        </Card>
        <CodeBlock
          class="mt-4"
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
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Boolean Fields
        </h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Boolean types are rendered as toggle switches.
        </p>
        <Card class="p-6 space-y-4">
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
        </Card>
        <CodeBlock
          class="mt-4"
          code={`const schema: Schema = {
  type: 'object',
  properties: {
    notifications: { type: 'boolean', title: 'Enable Notifications' },
    darkMode: { type: 'boolean', title: 'Dark Mode' },
    newsletter: { type: 'boolean', title: 'Subscribe to Newsletter' },
  },
};`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Array Fields
        </h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Arrays render with add/remove buttons for dynamic list management.
        </p>
        <Card class="p-6 space-y-4">
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
        </Card>
        <CodeBlock
          class="mt-4"
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
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Nested Objects
        </h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Objects can be nested to any depth. Each nested object gets its own fieldset.
        </p>
        <Card class="p-6 space-y-4">
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
        </Card>
        <CodeBlock
          class="mt-4"
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
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Union Types (oneOf)
        </h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Use <code class="text-primary-600 dark:text-primary-400">oneOf</code> to allow
          selecting between different schema variants.
        </p>
        <Card class="p-6 space-y-4">
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
        </Card>
        <CodeBlock
          class="mt-4"
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
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Complex Example
        </h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Combining arrays of objects with nested properties.
        </p>
        <Card class="p-6 space-y-4">
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
        </Card>
        <CodeBlock
          class="mt-4"
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
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Props
        </h2>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead>
              <tr class="border-b border-surface-200 dark:border-surface-700">
                <th class="py-3 px-4 font-semibold text-surface-900 dark:text-white">Prop</th>
                <th class="py-3 px-4 font-semibold text-surface-900 dark:text-white">Type</th>
                <th class="py-3 px-4 font-semibold text-surface-900 dark:text-white">Default</th>
                <th class="py-3 px-4 font-semibold text-surface-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-600 dark:text-surface-400">
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">schema</td>
                <td class="py-3 px-4 font-mono text-xs">Schema</td>
                <td class="py-3 px-4">required</td>
                <td class="py-3 px-4">The JSON Schema definition to render</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">value</td>
                <td class="py-3 px-4 font-mono text-xs">unknown</td>
                <td class="py-3 px-4">required</td>
                <td class="py-3 px-4">Current form value</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">onChange</td>
                <td class="py-3 px-4 font-mono text-xs">(value: unknown) =&gt; void</td>
                <td class="py-3 px-4">required</td>
                <td class="py-3 px-4">Callback when value changes</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">required</td>
                <td class="py-3 px-4 font-mono text-xs">boolean</td>
                <td class="py-3 px-4">false</td>
                <td class="py-3 px-4">Whether the root field is required</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">path</td>
                <td class="py-3 px-4 font-mono text-xs">string[]</td>
                <td class="py-3 px-4">[]</td>
                <td class="py-3 px-4">Path to this field (for nested forms)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Schema Interface
        </h2>
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
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Exported Field Components
        </h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          For advanced usage, individual field components are exported:
        </p>
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
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Utility Functions
        </h2>
        <p class="text-surface-600 dark:text-surface-400 mb-4">
          Helper functions are available for working with schema values:
        </p>
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
      </section>
    </div>
  );
}
