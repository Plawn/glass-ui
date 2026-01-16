import { Badge } from 'glass-ui-solid';
import { PageHeader, DemoSection } from '../../components/demo';

export default function BadgePage() {
  return (
    <div class="space-y-8">
      <PageHeader
        title="Badge"
        description="Status badges and labels with multiple variants for displaying status, labels, and HTTP methods."
      />

      <DemoSection title="Import" code="import { Badge } from 'glass-ui-solid';" />

      <DemoSection title="Basic Usage" code="<Badge>Default</Badge>">
        <div class="flex flex-wrap items-center gap-2">
          <Badge>Default</Badge>
        </div>
      </DemoSection>

      <DemoSection
        title="Variants (Status Colors)"
        code={`<Badge variant="default">Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>`}
      >
        <div class="flex flex-wrap items-center gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </DemoSection>

      <DemoSection
        title="Sizes"
        code={`<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>`}
      >
        <div class="flex flex-wrap items-center gap-2">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      </DemoSection>

      <DemoSection
        title="HTTP Method Badges"
        code={`<Badge variant="method" method="get">GET</Badge>
<Badge variant="method" method="post">POST</Badge>
<Badge variant="method" method="put">PUT</Badge>
<Badge variant="method" method="patch">PATCH</Badge>
<Badge variant="method" method="delete">DELETE</Badge>
<Badge variant="method" method="head">HEAD</Badge>
<Badge variant="method" method="options">OPTIONS</Badge>`}
      >
        <div class="flex flex-wrap items-center gap-2">
          <Badge variant="method" method="get">GET</Badge>
          <Badge variant="method" method="post">POST</Badge>
          <Badge variant="method" method="put">PUT</Badge>
          <Badge variant="method" method="patch">PATCH</Badge>
          <Badge variant="method" method="delete">DELETE</Badge>
          <Badge variant="method" method="head">HEAD</Badge>
          <Badge variant="method" method="options">OPTIONS</Badge>
        </div>
      </DemoSection>

      <DemoSection
        title="Combining Variants and Sizes"
        code={`<Badge variant="success" size="sm">Small Success</Badge>
<Badge variant="warning" size="md">Medium Warning</Badge>
<Badge variant="error" size="lg">Large Error</Badge>`}
      >
        <div class="flex flex-wrap items-center gap-3">
          <Badge variant="success" size="sm">Small Success</Badge>
          <Badge variant="warning" size="md">Medium Warning</Badge>
          <Badge variant="error" size="lg">Large Error</Badge>
        </div>
      </DemoSection>

      <DemoSection title="Use Cases" card={false}>
        <div class="space-y-6">
          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">
              Status Indicators
            </h3>
            <div class="flex flex-wrap items-center gap-2">
              <Badge variant="success">Active</Badge>
              <Badge variant="warning">Pending</Badge>
              <Badge variant="error">Inactive</Badge>
              <Badge variant="info">New</Badge>
            </div>
          </div>
          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">
              API Documentation
            </h3>
            <div class="space-y-2">
              <div class="flex items-center gap-3">
                <Badge variant="method" method="get">GET</Badge>
                <span class="text-sm text-surface-600 dark:text-surface-400 font-mono">/api/users</span>
              </div>
              <div class="flex items-center gap-3">
                <Badge variant="method" method="post">POST</Badge>
                <span class="text-sm text-surface-600 dark:text-surface-400 font-mono">/api/users</span>
              </div>
              <div class="flex items-center gap-3">
                <Badge variant="method" method="delete">DELETE</Badge>
                <span class="text-sm text-surface-600 dark:text-surface-400 font-mono">/api/users/:id</span>
              </div>
            </div>
          </div>
          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">
              Notification Count
            </h3>
            <div class="relative inline-flex">
              <div class="p-2 rounded-lg bg-surface-100 dark:bg-surface-800">
                <svg
                  class="w-6 h-6 text-surface-600 dark:text-surface-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <Badge variant="error" size="sm" class="absolute -top-1 -right-1">
                3
              </Badge>
            </div>
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Color Reference" card={false}>
        <div class="space-y-4">
          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">
              Status Variants
            </h3>
            <div class="overflow-x-auto">
              <table class="text-sm">
                <thead>
                  <tr class="text-left text-surface-600 dark:text-surface-400">
                    <th class="pr-8 pb-2">Variant</th>
                    <th class="pr-8 pb-2">Preview</th>
                    <th class="pb-2">Use Case</th>
                  </tr>
                </thead>
                <tbody class="text-surface-800 dark:text-surface-200">
                  <tr>
                    <td class="pr-8 py-1">default</td>
                    <td class="pr-8 py-1"><Badge variant="default">Default</Badge></td>
                    <td class="py-1">Neutral labels</td>
                  </tr>
                  <tr>
                    <td class="pr-8 py-1">success</td>
                    <td class="pr-8 py-1"><Badge variant="success">Success</Badge></td>
                    <td class="py-1">Active, completed, approved</td>
                  </tr>
                  <tr>
                    <td class="pr-8 py-1">warning</td>
                    <td class="pr-8 py-1"><Badge variant="warning">Warning</Badge></td>
                    <td class="py-1">Pending, in progress</td>
                  </tr>
                  <tr>
                    <td class="pr-8 py-1">error</td>
                    <td class="pr-8 py-1"><Badge variant="error">Error</Badge></td>
                    <td class="py-1">Failed, inactive, rejected</td>
                  </tr>
                  <tr>
                    <td class="pr-8 py-1">info</td>
                    <td class="pr-8 py-1"><Badge variant="info">Info</Badge></td>
                    <td class="py-1">New, informational</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">
              HTTP Method Variants
            </h3>
            <div class="overflow-x-auto">
              <table class="text-sm">
                <thead>
                  <tr class="text-left text-surface-600 dark:text-surface-400">
                    <th class="pr-8 pb-2">Method</th>
                    <th class="pr-8 pb-2">Preview</th>
                    <th class="pb-2">Color</th>
                  </tr>
                </thead>
                <tbody class="text-surface-800 dark:text-surface-200">
                  <tr>
                    <td class="pr-8 py-1">get</td>
                    <td class="pr-8 py-1"><Badge variant="method" method="get">GET</Badge></td>
                    <td class="py-1">Green</td>
                  </tr>
                  <tr>
                    <td class="pr-8 py-1">post</td>
                    <td class="pr-8 py-1"><Badge variant="method" method="post">POST</Badge></td>
                    <td class="py-1">Blue</td>
                  </tr>
                  <tr>
                    <td class="pr-8 py-1">put</td>
                    <td class="pr-8 py-1"><Badge variant="method" method="put">PUT</Badge></td>
                    <td class="py-1">Amber</td>
                  </tr>
                  <tr>
                    <td class="pr-8 py-1">patch</td>
                    <td class="pr-8 py-1"><Badge variant="method" method="patch">PATCH</Badge></td>
                    <td class="py-1">Purple</td>
                  </tr>
                  <tr>
                    <td class="pr-8 py-1">delete</td>
                    <td class="pr-8 py-1"><Badge variant="method" method="delete">DELETE</Badge></td>
                    <td class="py-1">Red</td>
                  </tr>
                  <tr>
                    <td class="pr-8 py-1">head</td>
                    <td class="pr-8 py-1"><Badge variant="method" method="head">HEAD</Badge></td>
                    <td class="py-1">Cyan</td>
                  </tr>
                  <tr>
                    <td class="pr-8 py-1">options</td>
                    <td class="pr-8 py-1"><Badge variant="method" method="options">OPTIONS</Badge></td>
                    <td class="py-1">Gray</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DemoSection>
    </div>
  );
}
