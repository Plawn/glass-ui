import {
  type BaseFieldProps,
  Card,
  CodeBlock,
  JsonSchemaForm,
  type Schema,
} from 'glass-ui-solid';
import type { Component } from 'solid-js';
import { For, createSignal } from 'solid-js';
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

// Schema with oneOf const (single select dropdown)
const oneOfConstSchema: Schema = {
  type: 'object',
  properties: {
    region: {
      title: 'Region',
      description: 'Select the deployment region',
      oneOf: [
        { const: 'eu-west-1', title: 'Europe (Ireland)' },
        { const: 'us-east-1', title: 'US East (N. Virginia)' },
        { const: 'us-west-2', title: 'US West (Oregon)' },
        { const: 'ap-southeast-1', title: 'Asia Pacific (Singapore)' },
      ],
    },
    tier: {
      title: 'Pricing Tier',
      oneOf: [
        { const: 'free', title: 'Free - 0$/mo' },
        { const: 'pro', title: 'Pro - 29$/mo' },
        { const: 'enterprise', title: 'Enterprise - Contact us' },
      ],
    },
  },
};

// Schema with format and constraints
const constraintsSchema: Schema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      title: 'Email',
      format: 'email',
    },
    website: {
      type: 'string',
      title: 'Website',
      format: 'uri',
    },
    password: {
      type: 'string',
      title: 'Password',
      format: 'password',
    },
    phone: {
      type: 'string',
      title: 'Phone',
      format: 'tel',
    },
    bio: {
      type: 'string',
      title: 'Bio',
      format: 'textarea',
    },
    score: {
      type: 'integer',
      title: 'Score',
      minimum: 0,
      maximum: 100,
    },
    price: {
      type: 'number',
      title: 'Price',
      minimum: 0,
      multipleOf: 0.01,
    },
  },
};

// Schema with nullable fields
const nullableSchema: Schema = {
  type: 'object',
  properties: {
    name: { type: 'string', title: 'Name' },
    nickname: {
      type: ['string', 'null'],
      title: 'Nickname',
      description: 'Optional, can be set to null',
    },
    age: {
      type: ['integer', 'null'],
      title: 'Age',
      description: 'Nullable integer field',
      minimum: 0,
    },
    role: {
      type: ['string', 'null'],
      title: 'Role',
      description: 'Nullable enum field',
      enum: ['admin', 'editor', 'viewer'],
    },
  },
  required: ['name'],
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

// Schema with array of oneOf const items (multi-select checkbox group)
const surveySchema: Schema = {
  type: 'object',
  properties: {
    selected_components: {
      description:
        'Select which survey questions to include in results. Leave empty to include all.',
      items: {
        oneOf: [
          {
            const: 13865111,
            title:
              'Partagez votre exp\u00e9rience sur la reprise automobile (CoverPage)',
          },
          {
            const: 13865154,
            title: 'Vous \u00eates :  (MultipleChoice)',
          },
          {
            const: 13865156,
            title: 'Quel est votre \u00e2ge ?  (MultipleChoice)',
          },
          {
            const: 13865161,
            title:
              "Avez-vous l'intention de changer de voiture prochainement ?  (MultipleChoice)",
          },
          {
            const: 13866553,
            title:
              'Si oui, feriez-vous confiance \u00e0 Aramisauto pour vous accompagner dans cette d\u00e9marche ?  (MultipleChoice)',
          },
          {
            const: 13865162,
            title:
              'Imaginez que vous souhaitiez vous s\u00e9parer de votre voiture. Quelles expressions taperiez-vous spontan\u00e9ment sur internet ? (ShortAnswer)',
          },
          {
            const: 13865165,
            title:
              'Parmi les expressions suivantes, pouvez-vous nous dire spontan\u00e9ment laquelle vous semble la plus appropri\u00e9e ?  (MultipleChoice)',
          },
          {
            const: 13865172,
            title:
              'Le mot "Reprise" vous para\u00eet-il clair pour comprendre qu\'il s\'agit de la 1\u00e8re \u00e9tape de vente de votre voiture ? (MultipleChoice)',
          },
          {
            const: 13865174,
            title:
              'Dans ce contexte de vente, quelles seraient vos priorit\u00e9s principales ? (Rank)',
          },
          {
            const: 13865223,
            title:
              "Merci pour votre participation. Vos r\u00e9ponses sont essentielles afin d'am\u00e9liorer la qualit\u00e9 de nos services. (ThankYouPage)",
          },
        ],
        type: 'integer',
      },
      title: 'Questions to include',
      type: 'array',
      uniqueItems: true,
    },
  },
};

// Schema with color format (for custom field demo)
const colorSchema: Schema = {
  type: 'object',
  properties: {
    name: { type: 'string', title: 'Theme Name' },
    primaryColor: {
      type: 'string',
      title: 'Primary Color',
      format: 'color',
    },
    backgroundColor: {
      type: 'string',
      title: 'Background Color',
      format: 'color',
    },
    textColor: {
      type: 'string',
      title: 'Text Color',
      format: 'color',
    },
  },
};

// Schema with rating field (for custom resolver demo)
const reviewSchema: Schema = {
  type: 'object',
  properties: {
    title: { type: 'string', title: 'Review Title' },
    rating: { type: 'integer', title: 'Rating', minimum: 1, maximum: 5 },
    comment: { type: 'string', title: 'Comment', format: 'textarea' },
  },
};

/**
 * Custom color picker field component
 */
const ColorPickerField: Component<BaseFieldProps> = (props) => {
  return (
    <input
      type="color"
      value={typeof props.value === 'string' ? props.value : '#000000'}
      onInput={(e) => props.onChange(e.currentTarget.value)}
      class="w-full h-10 rounded-lg cursor-pointer border border-surface-200 dark:border-surface-700 bg-transparent"
    />
  );
};

/**
 * Custom star rating field component
 */
const StarRatingField: Component<BaseFieldProps> = (props) => {
  const currentValue = () =>
    typeof props.value === 'number' ? props.value : 0;
  const max = () => props.schema.maximum ?? 5;

  return (
    <div class="flex items-center gap-1">
      <For each={Array.from({ length: max() }, (_, i) => i + 1)}>
        {(star) => (
          <button
            type="button"
            onClick={() => props.onChange(star)}
            class="text-2xl transition-colors focus:outline-none"
            classList={{
              'text-amber-400': star <= currentValue(),
              'text-surface-300 dark:text-surface-600': star > currentValue(),
            }}
          >
            {star <= currentValue() ? '\u2605' : '\u2606'}
          </button>
        )}
      </For>
      <span class="ml-2 text-sm text-surface-500 dark:text-surface-400">
        {currentValue()}/{max()}
      </span>
    </div>
  );
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

  const [oneOfConstValue, setOneOfConstValue] = createSignal<
    Record<string, unknown>
  >({
    region: 'eu-west-1',
    tier: 'pro',
  });

  const [constraintsValue, setConstraintsValue] = createSignal<
    Record<string, unknown>
  >({
    email: '',
    website: '',
    password: '',
    phone: '',
    bio: '',
    score: 50,
    price: 9.99,
  });

  const [nullableValue, setNullableValue] = createSignal<
    Record<string, unknown>
  >({
    name: 'Alice',
    nickname: null,
    age: 30,
    role: 'admin',
  });

  const [oneOfValue, setOneOfValue] = createSignal<Record<string, unknown>>({
    paymentMethod: {
      cardNumber: '',
      expiry: '',
      cvv: '',
    },
  });

  const [surveyValue, setSurveyValue] = createSignal<Record<string, unknown>>({
    selected_components: [13865154, 13865156],
  });

  const [colorValue, setColorValue] = createSignal<Record<string, unknown>>({
    name: 'Ocean',
    primaryColor: '#3b82f6',
    backgroundColor: '#f8fafc',
    textColor: '#0f172a',
  });

  const [reviewValue, setReviewValue] = createSignal<Record<string, unknown>>({
    title: 'Great product!',
    rating: 4,
    comment: '',
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
        title="oneOf const (Select Dropdown)"
        description={
          <>
            When <CodePill>oneOf</CodePill> entries all use{' '}
            <CodePill>const</CodePill> + <CodePill>title</CodePill>, the form
            renders a select dropdown instead of a JSON textarea.
          </>
        }
        code={`const schema: Schema = {
  type: 'object',
  properties: {
    region: {
      title: 'Region',
      oneOf: [
        { const: 'eu-west-1', title: 'Europe (Ireland)' },
        { const: 'us-east-1', title: 'US East (N. Virginia)' },
      ],
    },
  },
};`}
      >
        <JsonSchemaForm
          schema={oneOfConstSchema}
          value={oneOfConstValue()}
          onChange={(v) => setOneOfConstValue(v as Record<string, unknown>)}
        />
        <div class="mt-4 p-3 bg-surface-100 dark:bg-surface-800 rounded-lg">
          <p class="text-xs font-mono text-surface-600 dark:text-surface-400">
            Value: {JSON.stringify(oneOfConstValue())}
          </p>
        </div>
      </DemoSection>

      <DemoSection
        title="Formats & Constraints"
        description={
          <>
            String <CodePill>format</CodePill> maps to HTML input types (email,
            url, password, tel). Number fields apply{' '}
            <CodePill>minimum</CodePill>, <CodePill>maximum</CodePill>, and{' '}
            <CodePill>multipleOf</CodePill> as native constraints.
          </>
        }
        code={`const schema: Schema = {
  type: 'object',
  properties: {
    email: { type: 'string', title: 'Email', format: 'email' },
    website: { type: 'string', title: 'Website', format: 'uri' },
    password: { type: 'string', title: 'Password', format: 'password' },
    score: { type: 'integer', title: 'Score', minimum: 0, maximum: 100 },
    price: { type: 'number', title: 'Price', minimum: 0, multipleOf: 0.01 },
  },
};`}
      >
        <JsonSchemaForm
          schema={constraintsSchema}
          value={constraintsValue()}
          onChange={(v) => setConstraintsValue(v as Record<string, unknown>)}
        />
        <div class="mt-4 p-3 bg-surface-100 dark:bg-surface-800 rounded-lg">
          <p class="text-xs font-mono text-surface-600 dark:text-surface-400 whitespace-pre">
            Value: {JSON.stringify(constraintsValue(), null, 2)}
          </p>
        </div>
      </DemoSection>

      <DemoSection
        title="Nullable Fields"
        description={
          <>
            Fields with <CodePill>type: ["string", "null"]</CodePill> show a
            "set null" toggle. When null, the input is hidden and the value is
            explicitly <CodePill>null</CodePill>.
          </>
        }
        code={`const schema: Schema = {
  type: 'object',
  properties: {
    name: { type: 'string', title: 'Name' },
    nickname: {
      type: ['string', 'null'],
      title: 'Nickname',
      description: 'Optional, can be set to null',
    },
    age: {
      type: ['integer', 'null'],
      title: 'Age',
      minimum: 0,
    },
  },
  required: ['name'],
};`}
      >
        <JsonSchemaForm
          schema={nullableSchema}
          value={nullableValue()}
          onChange={(v) => setNullableValue(v as Record<string, unknown>)}
        />
        <div class="mt-4 p-3 bg-surface-100 dark:bg-surface-800 rounded-lg">
          <p class="text-xs font-mono text-surface-600 dark:text-surface-400 whitespace-pre">
            Value: {JSON.stringify(nullableValue(), null, 2)}
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
        title="Array with oneOf const (Multi-Select)"
        description={
          <>
            When array items use <CodePill>oneOf</CodePill> with{' '}
            <CodePill>const</CodePill> + <CodePill>title</CodePill>, the form
            renders a checkbox group. The <CodePill>title</CodePill> property is
            shown as the field label.
          </>
        }
        code={`const schema: Schema = {
  type: 'object',
  properties: {
    selected_components: {
      title: 'Questions to include',
      description: 'Select which survey questions to include.',
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'integer',
        oneOf: [
          { const: 13865111, title: 'Cover Page' },
          { const: 13865154, title: 'Gender (MultipleChoice)' },
          { const: 13865156, title: 'Age (MultipleChoice)' },
          // ...more options
        ],
      },
    },
  },
};`}
      >
        <JsonSchemaForm
          schema={surveySchema}
          value={surveyValue()}
          onChange={(v) => setSurveyValue(v as Record<string, unknown>)}
        />
        <div class="mt-4 p-3 bg-surface-100 dark:bg-surface-800 rounded-lg">
          <p class="text-xs font-mono text-surface-600 dark:text-surface-400 whitespace-pre">
            Value: {JSON.stringify(surveyValue(), null, 2)}
          </p>
        </div>
      </DemoSection>

      <DemoSection
        title="Custom Format Field (Registry)"
        description="Use the fields prop to override how specific formats are rendered. Here, format: 'color' renders a native color picker instead of a text input."
        code={`const ColorPickerField: Component<BaseFieldProps> = (props) => (
  <input
    type="color"
    value={typeof props.value === 'string' ? props.value : '#000000'}
    onInput={(e) => props.onChange(e.currentTarget.value)}
    class="w-full h-10 rounded-lg cursor-pointer"
  />
);

<JsonSchemaForm
  schema={{
    type: 'object',
    properties: {
      primaryColor: { type: 'string', title: 'Primary Color', format: 'color' },
      backgroundColor: { type: 'string', title: 'Background', format: 'color' },
    },
  }}
  value={value()}
  onChange={setValue}
  fields={{
    formats: { color: ColorPickerField },
  }}
/>`}
      >
        <JsonSchemaForm
          schema={colorSchema}
          value={colorValue()}
          onChange={(v) => setColorValue(v as Record<string, unknown>)}
          fields={{
            formats: { color: ColorPickerField },
          }}
        />
        <div class="mt-4 p-3 bg-surface-100 dark:bg-surface-800 rounded-lg">
          <p class="text-xs font-mono text-surface-600 dark:text-surface-400 whitespace-pre">
            Value: {JSON.stringify(colorValue(), null, 2)}
          </p>
        </div>
      </DemoSection>

      <DemoSection
        title="Custom Resolver (Registry)"
        description="Resolvers allow advanced matching logic. Here, any field whose path ends with 'rating' renders as a star rating widget."
        code={`const StarRatingField: Component<BaseFieldProps> = (props) => {
  const value = () => typeof props.value === 'number' ? props.value : 0;
  const max = () => props.schema.maximum ?? 5;
  return (
    <div class="flex items-center gap-1">
      <For each={Array.from({ length: max() }, (_, i) => i + 1)}>
        {(star) => (
          <button
            type="button"
            onClick={() => props.onChange(star)}
            class={star <= value() ? 'text-amber-400' : 'text-surface-300'}
          >
            {star <= value() ? '\u2605' : '\u2606'}
          </button>
        )}
      </For>
    </div>
  );
};

<JsonSchemaForm
  schema={schema}
  value={value()}
  onChange={setValue}
  fields={{
    resolvers: [
      (schema, path) => path.at(-1) === 'rating' ? StarRatingField : undefined,
    ],
  }}
/>`}
      >
        <JsonSchemaForm
          schema={reviewSchema}
          value={reviewValue()}
          onChange={(v) => setReviewValue(v as Record<string, unknown>)}
          fields={{
            resolvers: [
              (_schema, path) =>
                path.at(-1) === 'rating' ? StarRatingField : undefined,
            ],
          }}
        />
        <div class="mt-4 p-3 bg-surface-100 dark:bg-surface-800 rounded-lg">
          <p class="text-xs font-mono text-surface-600 dark:text-surface-400 whitespace-pre">
            Value: {JSON.stringify(reviewValue(), null, 2)}
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
            {
              name: 'fields',
              type: 'FieldRegistryConfig',
              default: 'undefined',
              description:
                'Custom field registry for overriding field rendering by type, format, or custom resolver',
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
