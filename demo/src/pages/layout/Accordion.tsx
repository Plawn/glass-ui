import { Accordion, AccordionPanel, CodeBlock, Card } from 'glass-ui-solid';

export default function AccordionPage() {
  const basicItems = [
    {
      id: 'section1',
      title: 'Section 1',
      content: <p class="text-surface-700 dark:text-surface-300">Content for section 1. This is the first panel with some example text.</p>,
      defaultOpen: true,
    },
    {
      id: 'section2',
      title: 'Section 2',
      content: <p class="text-surface-700 dark:text-surface-300">Content for section 2. Click to expand and see this content.</p>,
    },
    {
      id: 'section3',
      title: 'Section 3',
      content: <p class="text-surface-700 dark:text-surface-300">Content for section 3. Another panel with different content.</p>,
    },
  ];

  const faqItems = [
    {
      id: 'faq1',
      title: 'What is Glass UI?',
      content: (
        <p class="text-surface-700 dark:text-surface-300">
          Glass UI is an iOS 26-inspired glassmorphism component library for SolidJS. It provides beautiful, modern UI components with glass-like effects.
        </p>
      ),
    },
    {
      id: 'faq2',
      title: 'How do I install it?',
      content: (
        <div class="text-surface-700 dark:text-surface-300">
          <p class="mb-2">You can install Glass UI using your preferred package manager:</p>
          <code class="block bg-surface-100 dark:bg-surface-800 rounded px-2 py-1 text-sm">
            npm install glass-ui-solid
          </code>
        </div>
      ),
    },
    {
      id: 'faq3',
      title: 'Is it production ready?',
      content: (
        <p class="text-surface-700 dark:text-surface-300">
          Yes! Glass UI is designed for production use with full TypeScript support, accessibility features, and comprehensive documentation.
        </p>
      ),
    },
  ];

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Accordion</h1>
        <p class="text-surface-600 dark:text-surface-400">
          Collapsible panels for organizing content into expandable sections.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { Accordion, AccordionPanel } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Examples</h2>

        <div class="space-y-6">
          {/* Basic with Items Array */}
          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">With Items Array</h3>
            <Accordion items={basicItems} />
          </div>

          {/* Multiple Open */}
          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">Multiple Open</h3>
            <p class="text-sm text-surface-500 dark:text-surface-400 mb-3">
              Use the <code class="bg-surface-100 dark:bg-surface-800 px-1 rounded">multiple</code> prop to allow multiple panels to be open simultaneously.
            </p>
            <Accordion items={basicItems} multiple />
          </div>

          {/* Using AccordionPanel */}
          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">Using AccordionPanel</h3>
            <p class="text-sm text-surface-500 dark:text-surface-400 mb-3">
              For simpler use cases, you can use individual AccordionPanel components.
            </p>
            <div class="space-y-1.5">
              <AccordionPanel title="FAQ 1" defaultOpen>
                <p class="text-surface-700 dark:text-surface-300">Answer to FAQ 1</p>
              </AccordionPanel>
              <AccordionPanel title="FAQ 2">
                <p class="text-surface-700 dark:text-surface-300">Answer to FAQ 2</p>
              </AccordionPanel>
              <AccordionPanel title="FAQ 3">
                <p class="text-surface-700 dark:text-surface-300">Answer to FAQ 3</p>
              </AccordionPanel>
            </div>
          </div>

          {/* FAQ Example */}
          <div>
            <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">FAQ Example</h3>
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Props</h2>

        {/* Accordion Props */}
        <div class="mb-6">
          <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">Accordion</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-surface-200 dark:border-surface-700">
                  <th class="text-left py-2 px-3 font-medium text-surface-900 dark:text-white">Prop</th>
                  <th class="text-left py-2 px-3 font-medium text-surface-900 dark:text-white">Type</th>
                  <th class="text-left py-2 px-3 font-medium text-surface-900 dark:text-white">Default</th>
                  <th class="text-left py-2 px-3 font-medium text-surface-900 dark:text-white">Description</th>
                </tr>
              </thead>
              <tbody class="text-surface-600 dark:text-surface-400">
                <tr class="border-b border-surface-200/50 dark:border-surface-700/50">
                  <td class="py-2 px-3 font-mono text-xs">items</td>
                  <td class="py-2 px-3 font-mono text-xs">AccordionItem[]</td>
                  <td class="py-2 px-3">required</td>
                  <td class="py-2 px-3">Array of accordion items</td>
                </tr>
                <tr class="border-b border-surface-200/50 dark:border-surface-700/50">
                  <td class="py-2 px-3 font-mono text-xs">multiple</td>
                  <td class="py-2 px-3 font-mono text-xs">boolean</td>
                  <td class="py-2 px-3">false</td>
                  <td class="py-2 px-3">Allow multiple panels open</td>
                </tr>
                <tr class="border-b border-surface-200/50 dark:border-surface-700/50">
                  <td class="py-2 px-3 font-mono text-xs">class</td>
                  <td class="py-2 px-3 font-mono text-xs">string</td>
                  <td class="py-2 px-3">-</td>
                  <td class="py-2 px-3">Additional CSS classes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* AccordionItem Props */}
        <div class="mb-6">
          <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">AccordionItem</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-surface-200 dark:border-surface-700">
                  <th class="text-left py-2 px-3 font-medium text-surface-900 dark:text-white">Prop</th>
                  <th class="text-left py-2 px-3 font-medium text-surface-900 dark:text-white">Type</th>
                  <th class="text-left py-2 px-3 font-medium text-surface-900 dark:text-white">Default</th>
                  <th class="text-left py-2 px-3 font-medium text-surface-900 dark:text-white">Description</th>
                </tr>
              </thead>
              <tbody class="text-surface-600 dark:text-surface-400">
                <tr class="border-b border-surface-200/50 dark:border-surface-700/50">
                  <td class="py-2 px-3 font-mono text-xs">id</td>
                  <td class="py-2 px-3 font-mono text-xs">string</td>
                  <td class="py-2 px-3">required</td>
                  <td class="py-2 px-3">Unique identifier</td>
                </tr>
                <tr class="border-b border-surface-200/50 dark:border-surface-700/50">
                  <td class="py-2 px-3 font-mono text-xs">title</td>
                  <td class="py-2 px-3 font-mono text-xs">string | JSX.Element</td>
                  <td class="py-2 px-3">required</td>
                  <td class="py-2 px-3">Panel title</td>
                </tr>
                <tr class="border-b border-surface-200/50 dark:border-surface-700/50">
                  <td class="py-2 px-3 font-mono text-xs">content</td>
                  <td class="py-2 px-3 font-mono text-xs">JSX.Element</td>
                  <td class="py-2 px-3">required</td>
                  <td class="py-2 px-3">Panel content</td>
                </tr>
                <tr class="border-b border-surface-200/50 dark:border-surface-700/50">
                  <td class="py-2 px-3 font-mono text-xs">defaultOpen</td>
                  <td class="py-2 px-3 font-mono text-xs">boolean</td>
                  <td class="py-2 px-3">false</td>
                  <td class="py-2 px-3">Open by default</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* AccordionPanel Props */}
        <div>
          <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">AccordionPanel</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-surface-200 dark:border-surface-700">
                  <th class="text-left py-2 px-3 font-medium text-surface-900 dark:text-white">Prop</th>
                  <th class="text-left py-2 px-3 font-medium text-surface-900 dark:text-white">Type</th>
                  <th class="text-left py-2 px-3 font-medium text-surface-900 dark:text-white">Default</th>
                  <th class="text-left py-2 px-3 font-medium text-surface-900 dark:text-white">Description</th>
                </tr>
              </thead>
              <tbody class="text-surface-600 dark:text-surface-400">
                <tr class="border-b border-surface-200/50 dark:border-surface-700/50">
                  <td class="py-2 px-3 font-mono text-xs">title</td>
                  <td class="py-2 px-3 font-mono text-xs">string | JSX.Element</td>
                  <td class="py-2 px-3">required</td>
                  <td class="py-2 px-3">Panel title</td>
                </tr>
                <tr class="border-b border-surface-200/50 dark:border-surface-700/50">
                  <td class="py-2 px-3 font-mono text-xs">children</td>
                  <td class="py-2 px-3 font-mono text-xs">JSX.Element</td>
                  <td class="py-2 px-3">required</td>
                  <td class="py-2 px-3">Panel content</td>
                </tr>
                <tr class="border-b border-surface-200/50 dark:border-surface-700/50">
                  <td class="py-2 px-3 font-mono text-xs">defaultOpen</td>
                  <td class="py-2 px-3 font-mono text-xs">boolean</td>
                  <td class="py-2 px-3">false</td>
                  <td class="py-2 px-3">Open by default</td>
                </tr>
                <tr class="border-b border-surface-200/50 dark:border-surface-700/50">
                  <td class="py-2 px-3 font-mono text-xs">class</td>
                  <td class="py-2 px-3 font-mono text-xs">string</td>
                  <td class="py-2 px-3">-</td>
                  <td class="py-2 px-3">Additional CSS classes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
