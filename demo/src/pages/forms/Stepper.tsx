import { Stepper, CodeBlock, Card, Button } from 'glass-ui-solid';
import { createSignal } from 'solid-js';

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
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Stepper</h1>
        <p class="text-surface-600 dark:text-surface-400">
          A multi-step progress indicator component. Displays the current step in a sequence, with support for horizontal and vertical layouts, clickable navigation, and custom icons.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { Stepper } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <Card class="p-6 mb-4">
          <Stepper
            steps={basicSteps}
            currentStep={currentStep()}
          />
          <div class="flex gap-2 mt-6 justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
              disabled={currentStep() === 0}
            >
              Previous
            </Button>
            <Button
              size="sm"
              onClick={() => setCurrentStep((s) => Math.min(basicSteps.length - 1, s + 1))}
              disabled={currentStep() === basicSteps.length - 1}
            >
              Next
            </Button>
          </div>
          <p class="mt-4 text-center text-sm text-surface-500 dark:text-surface-400">
            Step {currentStep() + 1} of {basicSteps.length}
          </p>
        </Card>
        <CodeBlock
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
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Descriptions</h2>
        <Card class="p-6 mb-4">
          <Stepper
            steps={detailedSteps}
            currentStep={1}
          />
        </Card>
        <CodeBlock
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
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Vertical Orientation</h2>
        <Card class="p-6 mb-4">
          <Stepper
            steps={checkoutSteps}
            currentStep={verticalStep()}
            orientation="vertical"
          />
          <div class="flex gap-2 mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setVerticalStep((s) => Math.max(0, s - 1))}
              disabled={verticalStep() === 0}
            >
              Previous
            </Button>
            <Button
              size="sm"
              onClick={() => setVerticalStep((s) => Math.min(checkoutSteps.length - 1, s + 1))}
              disabled={verticalStep() === checkoutSteps.length - 1}
            >
              Next
            </Button>
          </div>
        </Card>
        <CodeBlock
          code={`<Stepper
  steps={steps}
  currentStep={currentStep()}
  orientation="vertical"
/>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Clickable Steps</h2>
        <Card class="p-6 mb-4">
          <Stepper
            steps={detailedSteps}
            currentStep={clickableStep()}
            onStepClick={setClickableStep}
            allowClickPrevious
          />
          <p class="mt-4 text-center text-sm text-surface-500 dark:text-surface-400">
            Click on completed steps to navigate back
          </p>
        </Card>
        <CodeBlock
          code={`<Stepper
  steps={steps}
  currentStep={currentStep()}
  onStepClick={setCurrentStep}
  allowClickPrevious
/>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Sizes</h2>
        <Card class="p-6 mb-4 space-y-8">
          <div>
            <p class="text-sm text-surface-500 dark:text-surface-400 mb-3">Small</p>
            <Stepper
              steps={basicSteps}
              currentStep={1}
              size="sm"
            />
          </div>
          <div>
            <p class="text-sm text-surface-500 dark:text-surface-400 mb-3">Medium (default)</p>
            <Stepper
              steps={basicSteps}
              currentStep={1}
              size="md"
            />
          </div>
          <div>
            <p class="text-sm text-surface-500 dark:text-surface-400 mb-3">Large</p>
            <Stepper
              steps={basicSteps}
              currentStep={1}
              size="lg"
            />
          </div>
        </Card>
        <CodeBlock
          code={`<Stepper steps={steps} currentStep={1} size="sm" />
<Stepper steps={steps} currentStep={1} size="md" />
<Stepper steps={steps} currentStep={1} size="lg" />`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Step States</h2>
        <Card class="p-6 mb-4 space-y-6">
          <div>
            <p class="text-sm text-surface-500 dark:text-surface-400 mb-3">All completed</p>
            <Stepper steps={basicSteps} currentStep={4} />
          </div>
          <div>
            <p class="text-sm text-surface-500 dark:text-surface-400 mb-3">First step</p>
            <Stepper steps={basicSteps} currentStep={0} />
          </div>
          <div>
            <p class="text-sm text-surface-500 dark:text-surface-400 mb-3">Middle step</p>
            <Stepper steps={basicSteps} currentStep={2} />
          </div>
        </Card>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Props</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead class="text-surface-700 dark:text-surface-300 border-b border-surface-200 dark:border-surface-700">
              <tr>
                <th class="py-3 px-4 font-semibold">Prop</th>
                <th class="py-3 px-4 font-semibold">Type</th>
                <th class="py-3 px-4 font-semibold">Default</th>
                <th class="py-3 px-4 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-600 dark:text-surface-400">
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">steps</td>
                <td class="py-3 px-4 font-mono text-xs">StepperStep[]</td>
                <td class="py-3 px-4">required</td>
                <td class="py-3 px-4">Array of step configurations</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">currentStep</td>
                <td class="py-3 px-4 font-mono text-xs">number</td>
                <td class="py-3 px-4">required</td>
                <td class="py-3 px-4">Current active step index (0-based)</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">onStepClick</td>
                <td class="py-3 px-4 font-mono text-xs">(step: number) =&gt; void</td>
                <td class="py-3 px-4">-</td>
                <td class="py-3 px-4">Callback when a step is clicked</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">orientation</td>
                <td class="py-3 px-4 font-mono text-xs">'horizontal' | 'vertical'</td>
                <td class="py-3 px-4">'horizontal'</td>
                <td class="py-3 px-4">Layout orientation</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">size</td>
                <td class="py-3 px-4 font-mono text-xs">'sm' | 'md' | 'lg'</td>
                <td class="py-3 px-4">'md'</td>
                <td class="py-3 px-4">Size variant</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">allowClickPrevious</td>
                <td class="py-3 px-4 font-mono text-xs">boolean</td>
                <td class="py-3 px-4">false</td>
                <td class="py-3 px-4">Allow clicking on completed steps</td>
              </tr>
              <tr>
                <td class="py-3 px-4 font-mono text-xs">class</td>
                <td class="py-3 px-4 font-mono text-xs">string</td>
                <td class="py-3 px-4">-</td>
                <td class="py-3 px-4">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">StepperStep Interface</h2>
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
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Multi-Step Form Example</h2>
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
          variant="outline"
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
      </section>
    </div>
  );
}
