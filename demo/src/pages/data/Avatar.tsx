import { Avatar, CodeBlock, Card } from 'glass-ui-solid';

export default function AvatarPage() {
  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Avatar</h1>
        <p class="text-surface-600 dark:text-surface-400">
          User avatars with image or initials fallback. Automatically generates initials and consistent colors from names.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { Avatar } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <Card class="p-6">
          <div class="flex items-center gap-4">
            <Avatar name="John Doe" />
            <Avatar name="Jane Smith" />
            <Avatar name="Alice" />
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Avatar name="John Doe" />
<Avatar name="Jane Smith" />
<Avatar name="Alice" />`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Image</h2>
        <Card class="p-6">
          <div class="flex items-center gap-4">
            <Avatar
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
              name="Tom Cook"
            />
            <Avatar
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
              name="Emily Davis"
            />
            <Avatar
              src="invalid-url.jpg"
              name="Fallback User"
            />
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Avatar
  src="https://example.com/avatar.jpg"
  name="Tom Cook"
/>

{/* Falls back to initials on error */}
<Avatar
  src="invalid-url.jpg"
  name="Fallback User"
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Sizes</h2>
        <Card class="p-6">
          <div class="flex items-end gap-4">
            <div class="text-center">
              <Avatar name="XS Size" size="xs" />
              <p class="mt-2 text-xs text-surface-500">xs</p>
            </div>
            <div class="text-center">
              <Avatar name="SM Size" size="sm" />
              <p class="mt-2 text-xs text-surface-500">sm</p>
            </div>
            <div class="text-center">
              <Avatar name="MD Size" size="md" />
              <p class="mt-2 text-xs text-surface-500">md</p>
            </div>
            <div class="text-center">
              <Avatar name="LG Size" size="lg" />
              <p class="mt-2 text-xs text-surface-500">lg</p>
            </div>
            <div class="text-center">
              <Avatar name="XL Size" size="xl" />
              <p class="mt-2 text-xs text-surface-500">xl</p>
            </div>
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Avatar name="John" size="xs" />  {/* 24x24px */}
<Avatar name="John" size="sm" />  {/* 32x32px */}
<Avatar name="John" size="md" />  {/* 40x40px (default) */}
<Avatar name="John" size="lg" />  {/* 48x48px */}
<Avatar name="John" size="xl" />  {/* 64x64px */}`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Avatar Stack</h2>
        <Card class="p-6">
          <div class="flex -space-x-2">
            <Avatar name="User One" size="sm" />
            <Avatar name="User Two" size="sm" />
            <Avatar name="User Three" size="sm" />
            <Avatar name="User Four" size="sm" />
            <div class="w-8 h-8 rounded-full bg-surface-200 dark:bg-surface-700 flex items-center justify-center text-xs font-medium text-surface-600 dark:text-surface-300 border-2 border-white dark:border-surface-900">
              +5
            </div>
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<div class="flex -space-x-2">
  <Avatar name="User One" size="sm" />
  <Avatar name="User Two" size="sm" />
  <Avatar name="User Three" size="sm" />
  <Avatar name="User Four" size="sm" />
  <div class="w-8 h-8 rounded-full bg-surface-200 ...">
    +5
  </div>
</div>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Status Indicator</h2>
        <Card class="p-6">
          <div class="flex items-center gap-6">
            <div class="relative">
              <Avatar name="Online User" size="lg" />
              <span class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-surface-900" />
            </div>
            <div class="relative">
              <Avatar name="Busy User" size="lg" />
              <span class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white dark:border-surface-900" />
            </div>
            <div class="relative">
              <Avatar name="Away User" size="lg" />
              <span class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-amber-500 rounded-full border-2 border-white dark:border-surface-900" />
            </div>
            <div class="relative">
              <Avatar name="Offline User" size="lg" />
              <span class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-surface-400 rounded-full border-2 border-white dark:border-surface-900" />
            </div>
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<div class="relative">
  <Avatar name="Online User" size="lg" />
  <span class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-surface-900" />
</div>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">In User Card</h2>
        <Card class="p-4 max-w-sm">
          <div class="flex items-center gap-3">
            <Avatar
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
              name="Tom Cook"
              size="lg"
            />
            <div>
              <div class="font-medium text-surface-900 dark:text-white">Tom Cook</div>
              <div class="text-sm text-surface-500 dark:text-surface-400">tom@example.com</div>
            </div>
          </div>
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`<Card class="p-4">
  <div class="flex items-center gap-3">
    <Avatar
      src={user.avatar}
      name={user.name}
      size="lg"
    />
    <div>
      <div class="font-medium">{user.name}</div>
      <div class="text-sm text-surface-500">{user.email}</div>
    </div>
  </div>
</Card>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Props</h2>
        <Card class="overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-surface-50 dark:bg-surface-800">
              <tr>
                <th class="text-left p-3 font-medium text-surface-900 dark:text-white">Prop</th>
                <th class="text-left p-3 font-medium text-surface-900 dark:text-white">Type</th>
                <th class="text-left p-3 font-medium text-surface-900 dark:text-white">Default</th>
                <th class="text-left p-3 font-medium text-surface-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-200 dark:divide-surface-700">
              <tr>
                <td class="p-3 font-mono text-xs text-surface-900 dark:text-white">name</td>
                <td class="p-3 font-mono text-xs text-surface-600 dark:text-surface-400">string</td>
                <td class="p-3 text-surface-500">required</td>
                <td class="p-3 text-surface-600 dark:text-surface-400">Name for generating initials</td>
              </tr>
              <tr>
                <td class="p-3 font-mono text-xs text-surface-900 dark:text-white">src</td>
                <td class="p-3 font-mono text-xs text-surface-600 dark:text-surface-400">string</td>
                <td class="p-3 text-surface-500">-</td>
                <td class="p-3 text-surface-600 dark:text-surface-400">Image source URL</td>
              </tr>
              <tr>
                <td class="p-3 font-mono text-xs text-surface-900 dark:text-white">size</td>
                <td class="p-3 font-mono text-xs text-surface-600 dark:text-surface-400">'xs' | 'sm' | 'md' | 'lg' | 'xl'</td>
                <td class="p-3 text-surface-500">'md'</td>
                <td class="p-3 text-surface-600 dark:text-surface-400">Avatar size</td>
              </tr>
              <tr>
                <td class="p-3 font-mono text-xs text-surface-900 dark:text-white">fallbackColor</td>
                <td class="p-3 font-mono text-xs text-surface-600 dark:text-surface-400">string</td>
                <td class="p-3 text-surface-500">auto</td>
                <td class="p-3 text-surface-600 dark:text-surface-400">Custom background color for initials</td>
              </tr>
              <tr>
                <td class="p-3 font-mono text-xs text-surface-900 dark:text-white">alt</td>
                <td class="p-3 font-mono text-xs text-surface-600 dark:text-surface-400">string</td>
                <td class="p-3 text-surface-500">name</td>
                <td class="p-3 text-surface-600 dark:text-surface-400">Alt text for the image</td>
              </tr>
              <tr>
                <td class="p-3 font-mono text-xs text-surface-900 dark:text-white">class</td>
                <td class="p-3 font-mono text-xs text-surface-600 dark:text-surface-400">string</td>
                <td class="p-3 text-surface-500">-</td>
                <td class="p-3 text-surface-600 dark:text-surface-400">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>
    </div>
  );
}
