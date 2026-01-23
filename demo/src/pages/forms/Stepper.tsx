import { Button, Card, CodeBlock, Stepper } from 'glass-ui-solid';
import { createSignal } from 'solid-js';
import {
  DemoSection,
  PageHeader,
  PropsTable,
  StateDisplay,
  VariantShowcase,
} from '../../components/demo';

export default function StepperPage() {
  const [currentStep, setCurrentStep] = createSignal(1);
  const [verticalStep, setVerticalStep] = createSignal(2);
  const [clickableStep, setClickableStep] = createSignal(2);

  const basicSteps = [
    { label: 'Account' },
    { label: 'Profile' },
    { label: 'Review' },
    { label: 'Complete' },
  ];

  const detailedSteps = [
    { label: 'Account Setup', description: 'Create your account credentials' },
    { label: 'Personal Info', description: 'Add your personal details' },
    { label: 'Preferences', description: 'Customize your experience' },
    { label: 'Confirmation', description: 'Review and confirm' },
  ];

  const checkoutSteps = [
    { label: 'Cart', description: 'Review items' },
    { label: 'Shipping', description: 'Delivery address' },
    { label: 'Payment', description: 'Payment method' },
    { label: 'Confirm', description: 'Place order' },
  ];

  return (
    <div class="space-y-8">
      <PageHeader
        title="Stepper"
        description="A multi-step progress indicator component. Displays the current step in a sequence, with support for horizontal and vertical layouts, clickable navigation, and custom icons."
      />

      <DemoSection
        title="Import"
        code="import { Stepper } from 'glass-ui-solid';"
      />

      <DemoSection
        title="Basic Usage"
        code={`const [currentStep, setCurrentStep] = createSignal(1);

const steps = [
  { label: 'Account' },
  { label: 'Profile' },
  { label: 'Review' },
  { label: 'Complete' },
];

<Stepper
  steps={steps}
  currentStep={currentStep()}
/>`}
      >
        <Stepper steps={basicSteps} currentStep={currentStep()} />
        <div class="flex gap-2 mt-6 justify-center">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
            disabled={currentStep() === 0}
          >
            Previous
          </Button>
          <Button
            size="sm"
            onClick={() =>
              setCurrentStep((s) => Math.min(basicSteps.length - 1, s + 1))
            }
            disabled={currentStep() === basicSteps.length - 1}
          >
            Next
          </Button>
        </div>
        <StateDisplay
          label="Step"
          value={`${currentStep() + 1} of ${basicSteps.length}`}
        />
      </DemoSection>

      <DemoSection
        title="With Descriptions"
        code={`const steps = [
  { label: 'Account Setup', description: 'Create your account credentials' },
  { label: 'Personal Info', description: 'Add your personal details' },
  { label: 'Preferences', description: 'Customize your experience' },
  { label: 'Confirmation', description: 'Review and confirm' },
];

<Stepper
  steps={steps}
  currentStep={1}
/>`}
      >
        <Stepper steps={detailedSteps} currentStep={1} />
      </DemoSection>

      <DemoSection
        title="Vertical Orientation"
        code={`<Stepper
  steps={steps}
  currentStep={currentStep()}
  orientation="vertical"
/>`}
      >
        <Stepper
          steps={checkoutSteps}
          currentStep={verticalStep()}
          orientation="vertical"
        />
        <div class="flex gap-2 mt-6">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setVerticalStep((s) => Math.max(0, s - 1))}
            disabled={verticalStep() === 0}
          >
            Previous
          </Button>
          <Button
            size="sm"
            onClick={() =>
              setVerticalStep((s) => Math.min(checkoutSteps.length - 1, s + 1))
            }
            disabled={verticalStep() === checkoutSteps.length - 1}
          >
            Next
          </Button>
        </div>
      </DemoSection>

      <DemoSection
        title="Clickable Steps"
        code={`<Stepper
  steps={steps}
  currentStep={currentStep()}
  onStepClick={setCurrentStep}
  allowClickPrevious
/>`}
      >
        <Stepper
          steps={detailedSteps}
          currentStep={clickableStep()}
          onStepClick={setClickableStep}
          allowClickPrevious
        />
        <StateDisplay
          label="Tip"
          value="Click on completed steps to navigate back"
        />
      </DemoSection>

      <DemoSection
        title="Sizes"
        code={`<Stepper steps={steps} currentStep={1} size="sm" />
<Stepper steps={steps} currentStep={1} size="md" />
<Stepper steps={steps} currentStep={1} size="lg" />`}
      >
        <VariantShowcase variants={['sm', 'md', 'lg'] as const} label="Size">
          {(size) => <Stepper steps={basicSteps} currentStep={1} size={size} />}
        </VariantShowcase>
      </DemoSection>

      <DemoSection title="Step States" card={false}>
        <Card class="p-6 space-y-6">
          <div>
            <p class="text-sm text-surface-500 dark:text-surface-400 mb-3">
              All completed
            </p>
            <Stepper steps={basicSteps} currentStep={4} />
          </div>
          <div>
            <p class="text-sm text-surface-500 dark:text-surface-400 mb-3">
              First step
            </p>
            <Stepper steps={basicSteps} currentStep={0} />
          </div>
          <div>
            <p class="text-sm text-surface-500 dark:text-surface-400 mb-3">
              Middle step
            </p>
            <Stepper steps={basicSteps} currentStep={2} />
          </div>
        </Card>
      </DemoSection>

      <DemoSection title="Props" card={false}>
        <PropsTable
          props={[
            {
              name: 'steps',
              type: 'StepperStep[]',
              default: 'required',
              description: 'Array of step configurations',
            },
            {
              name: 'currentStep',
              type: 'number',
              default: 'required',
              description: 'Current active step index (0-based)',
            },
            {
              name: 'onStepClick',
              type: '(step: number) => void',
              description: 'Callback when a step is clicked',
            },
            {
              name: 'orientation',
              type: "'horizontal' | 'vertical'",
              default: "'horizontal'",
              description: 'Layout orientation',
            },
            {
              name: 'size',
              type: "'sm' | 'md' | 'lg'",
              default: "'md'",
              description: 'Size variant',
            },
            {
              name: 'allowClickPrevious',
              type: 'boolean',
              default: 'false',
              description: 'Allow clicking on completed steps',
            },
            {
              name: 'class',
              type: 'string',
              description: 'Additional CSS classes',
            },
          ]}
        />
      </DemoSection>

      <DemoSection title="StepperStep Interface" card={false}>
        <Card class="p-6">
          <CodeBlock
            code={`interface StepperStep {
  /** Label text for the step */
  label: string;
  /** Optional description text displayed below the label */
  description?: string;
  /** Optional custom icon for the step */
  icon?: JSX.Element;
}`}
            language="tsx"
          />
        </Card>
      </DemoSection>

      <DemoSection title="Multi-Step Form Example" card={false}>
        <Card class="p-6">
          <CodeBlock
            code={`function MultiStepForm() {
  const [currentStep, setCurrentStep] = createSignal(0);
  const [formData, setFormData] = createSignal({
    email: '',
    name: '',
    preferences: {},
  });

  const steps = [
    { label: 'Account', description: 'Email and password' },
    { label: 'Profile', description: 'Personal information' },
    { label: 'Preferences', description: 'Customize settings' },
    { label: 'Review', description: 'Confirm details' },
  ];

  const nextStep = () => {
    if (currentStep() < steps.length - 1) {
      setCurrentStep(currentStep() + 1);
    }
  };

  const prevStep = () => {
    if (currentStep() > 0) {
      setCurrentStep(currentStep() - 1);
    }
  };

  return (
    <div class="space-y-6">
      <Stepper
        steps={steps}
        currentStep={currentStep()}
        onStepClick={setCurrentStep}
        allowClickPrevious
      />

      {/* Step content */}
      <Switch>
        <Match when={currentStep() === 0}>
          <AccountStep data={formData()} onChange={setFormData} />
        </Match>
        <Match when={currentStep() === 1}>
          <ProfileStep data={formData()} onChange={setFormData} />
        </Match>
        {/* ... more steps */}
      </Switch>

      {/* Navigation */}
      <div class="flex justify-between">
        <Button
          variant="secondary"
          onClick={prevStep}
          disabled={currentStep() === 0}
        >
          Previous
        </Button>
        <Button
          onClick={nextStep}
          disabled={currentStep() === steps.length - 1}
        >
          {currentStep() === steps.length - 1 ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  );
}`}
            language="tsx"
          />
        </Card>
      </DemoSection>
    </div>
  );
}
