import { Accordion, AccordionPanel } from 'glass-ui-solid';
import { PageHeader, DemoSection, PropsTable, CodePill } from '../../components/demo';

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

  const multipleItems = [
    {
      id: 'multi1',
      title: 'Section 1',
      content: <p class="text-surface-700 dark:text-surface-300">Content for section 1. This is the first panel with some example text.</p>,
      defaultOpen: true,
    },
    {
      id: 'multi2',
      title: 'Section 2',
      content: <p class="text-surface-700 dark:text-surface-300">Content for section 2. Click to expand and see this content.</p>,
    },
    {
      id: 'multi3',
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
      <PageHeader
        title="Accordion"
        description="Collapsible panels for organizing content into expandable sections."
      />

      <DemoSection title="Import" code="import { Accordion, AccordionPanel } from 'glass-ui-solid';" />

      <DemoSection title="Examples" card={false}>
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
              Use the <CodePill>multiple</CodePill> prop to allow multiple panels to be open simultaneously.
            </p>
            <Accordion items={multipleItems} multiple />
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
      </DemoSection>

      <DemoSection title="Props" card={false}>
        {/* Accordion Props */}
        <div class="mb-6">
          <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">Accordion</h3>
          <PropsTable
            props={[
              { name: 'items', type: 'AccordionItem[]', default: 'required', description: 'Array of accordion items' },
              { name: 'multiple', type: 'boolean', default: 'false', description: 'Allow multiple panels open' },
              { name: 'class', type: 'string', description: 'Additional CSS classes' },
            ]}
          />
        </div>

        {/* AccordionItem Props */}
        <div class="mb-6">
          <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">AccordionItem</h3>
          <PropsTable
            props={[
              { name: 'id', type: 'string', default: 'required', description: 'Unique identifier' },
              { name: 'title', type: 'string | JSX.Element', default: 'required', description: 'Panel title' },
              { name: 'content', type: 'JSX.Element', default: 'required', description: 'Panel content' },
              { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Open by default' },
            ]}
          />
        </div>

        {/* AccordionPanel Props */}
        <div>
          <h3 class="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">AccordionPanel</h3>
          <PropsTable
            props={[
              { name: 'title', type: 'string | JSX.Element', default: 'required', description: 'Panel title' },
              { name: 'children', type: 'JSX.Element', default: 'required', description: 'Panel content' },
              { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Open by default' },
              { name: 'class', type: 'string', description: 'Additional CSS classes' },
            ]}
          />
        </div>
      </DemoSection>
    </div>
  );
}
