import { Avatar, Card } from 'glass-ui-solid';
import { DemoSection, PageHeader, PropsTable } from '../../components/demo';

export default function AvatarPage() {
  return (
    <div class="space-y-8">
      <PageHeader
        title="Avatar"
        description="User avatars with image or initials fallback. Automatically generates initials and consistent colors from names."
      />

      <DemoSection
        title="Import"
        code="import { Avatar } from 'glass-ui-solid';"
      />

      <DemoSection
        title="Basic Usage"
        code={`<Avatar name="John Doe" />
<Avatar name="Jane Smith" />
<Avatar name="Alice" />`}
      >
        <div class="flex items-center gap-4">
          <Avatar name="John Doe" />
          <Avatar name="Jane Smith" />
          <Avatar name="Alice" />
        </div>
      </DemoSection>

      <DemoSection
        title="With Image"
        code={`<Avatar
  src="https://example.com/avatar.jpg"
  name="Tom Cook"
/>

{/* Falls back to initials on error */}
<Avatar
  src="invalid-url.jpg"
  name="Fallback User"
/>`}
      >
        <div class="flex items-center gap-4">
          <Avatar
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
            name="Tom Cook"
          />
          <Avatar
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
            name="Emily Davis"
          />
          <Avatar src="invalid-url.jpg" name="Fallback User" />
        </div>
      </DemoSection>

      <DemoSection
        title="Sizes"
        code={`<Avatar name="John" size="xs" />  {/* 24x24px */}
<Avatar name="John" size="sm" />  {/* 32x32px */}
<Avatar name="John" size="md" />  {/* 40x40px (default) */}
<Avatar name="John" size="lg" />  {/* 48x48px */}
<Avatar name="John" size="xl" />  {/* 64x64px */}`}
      >
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
      </DemoSection>

      <DemoSection
        title="Avatar Stack"
        code={`<div class="flex -space-x-2">
  <Avatar name="User One" size="sm" />
  <Avatar name="User Two" size="sm" />
  <Avatar name="User Three" size="sm" />
  <Avatar name="User Four" size="sm" />
  <div class="w-8 h-8 rounded-full bg-surface-200 ...">
    +5
  </div>
</div>`}
      >
        <div class="flex -space-x-2">
          <Avatar name="User One" size="sm" />
          <Avatar name="User Two" size="sm" />
          <Avatar name="User Three" size="sm" />
          <Avatar name="User Four" size="sm" />
          <div class="w-8 h-8 rounded-full bg-surface-200 dark:bg-surface-700 flex items-center justify-center text-xs font-medium text-surface-600 dark:text-surface-300 border-2 border-white dark:border-surface-900">
            +5
          </div>
        </div>
      </DemoSection>

      <DemoSection
        title="With Status Indicator"
        code={`<div class="relative">
  <Avatar name="Online User" size="lg" />
  <span class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-surface-900" />
</div>`}
      >
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
      </DemoSection>

      <DemoSection
        title="In User Card"
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
        card={false}
      >
        <Card class="p-4 max-w-sm">
          <div class="flex items-center gap-3">
            <Avatar
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
              name="Tom Cook"
              size="lg"
            />
            <div>
              <div class="font-medium text-surface-900 dark:text-white">
                Tom Cook
              </div>
              <div class="text-sm text-surface-500 dark:text-surface-400">
                tom@example.com
              </div>
            </div>
          </div>
        </Card>
      </DemoSection>

      <DemoSection title="Props" card={false}>
        <PropsTable
          props={[
            {
              name: 'name',
              type: 'string',
              default: 'required',
              description: 'Name for generating initials',
            },
            {
              name: 'src',
              type: 'string',
              default: '-',
              description: 'Image source URL',
            },
            {
              name: 'size',
              type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
              default: "'md'",
              description: 'Avatar size',
            },
            {
              name: 'fallbackColor',
              type: 'string',
              default: 'auto',
              description: 'Custom background color for initials',
            },
            {
              name: 'alt',
              type: 'string',
              default: 'name',
              description: 'Alt text for the image',
            },
            {
              name: 'class',
              type: 'string',
              default: '-',
              description: 'Additional CSS classes',
            },
          ]}
        />
      </DemoSection>
    </div>
  );
}
