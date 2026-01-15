import { FileUpload, CodeBlock, Card } from 'glass-ui-solid';
import { createSignal } from 'solid-js';

export default function FileUploadPage() {
  const [basicFiles, setBasicFiles] = createSignal<File[]>([]);
  const [imageFiles, setImageFiles] = createSignal<File[]>([]);
  const [singleFile, setSingleFile] = createSignal<File[]>([]);
  const [limitedFiles, setLimitedFiles] = createSignal<File[]>([]);
  const [errorFiles, setErrorFiles] = createSignal<File[]>([]);

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">FileUpload</h1>
        <p class="text-surface-600 dark:text-surface-400">
          A glassmorphic file upload component with drag and drop support. Features file type filtering, size limits, and visual file list management.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { FileUpload } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <Card class="p-6 mb-4">
          <FileUpload
            onFilesChange={setBasicFiles}
            label="Upload files"
            description="Drag and drop files here or click to browse"
            multiple
          />
          <p class="mt-4 text-sm text-surface-500 dark:text-surface-400">
            Files selected: {basicFiles().length}
          </p>
        </Card>
        <CodeBlock
          code={`const [files, setFiles] = createSignal<File[]>([]);

<FileUpload
  onFilesChange={setFiles}
  label="Upload files"
  description="Drag and drop files here or click to browse"
  multiple
/>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Accept Specific File Types</h2>
        <Card class="p-6 mb-4">
          <FileUpload
            onFilesChange={setImageFiles}
            label="Upload images"
            description="PNG, JPG, GIF, WebP"
            accept="image/*"
            multiple
          />
        </Card>
        <CodeBlock
          code={`<FileUpload
  onFilesChange={setFiles}
  label="Upload images"
  description="PNG, JPG, GIF, WebP"
  accept="image/*"
  multiple
/>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Single File Upload</h2>
        <Card class="p-6 mb-4">
          <FileUpload
            onFilesChange={setSingleFile}
            label="Profile photo"
            description="Upload a single image file"
            accept="image/*"
          />
          <p class="mt-4 text-sm text-surface-500 dark:text-surface-400">
            {singleFile().length > 0 ? `Selected: ${singleFile()[0].name}` : 'No file selected'}
          </p>
        </Card>
        <CodeBlock
          code={`<FileUpload
  onFilesChange={setFile}
  label="Profile photo"
  description="Upload a single image file"
  accept="image/*"
  // multiple is false by default
/>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">File Size and Count Limits</h2>
        <Card class="p-6 mb-4">
          <FileUpload
            onFilesChange={setLimitedFiles}
            label="Documents"
            description="PDF files up to 5MB each, max 3 files"
            accept=".pdf"
            multiple
            maxSize={5 * 1024 * 1024}
            maxFiles={3}
          />
          <p class="mt-4 text-sm text-surface-500 dark:text-surface-400">
            Files: {limitedFiles().length} / 3
          </p>
        </Card>
        <CodeBlock
          code={`<FileUpload
  onFilesChange={setFiles}
  label="Documents"
  description="PDF files up to 5MB each, max 3 files"
  accept=".pdf"
  multiple
  maxSize={5 * 1024 * 1024}  // 5MB in bytes
  maxFiles={3}
/>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">With Error State</h2>
        <Card class="p-6 mb-4">
          <FileUpload
            onFilesChange={setErrorFiles}
            label="Required document"
            description="Please upload your document"
            error="This field is required"
          />
        </Card>
        <CodeBlock
          code={`<FileUpload
  onFilesChange={setFiles}
  label="Required document"
  description="Please upload your document"
  error="This field is required"
/>`}
          language="tsx"
        />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Disabled State</h2>
        <Card class="p-6 mb-4">
          <FileUpload
            onFilesChange={() => {}}
            label="Uploads disabled"
            description="File uploads are currently unavailable"
            disabled
          />
        </Card>
        <CodeBlock
          code={`<FileUpload
  onFilesChange={setFiles}
  label="Uploads disabled"
  description="File uploads are currently unavailable"
  disabled
/>`}
          language="tsx"
        />
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
                <td class="py-3 px-4 font-mono text-xs">onFilesChange</td>
                <td class="py-3 px-4 font-mono text-xs">(files: File[]) =&gt; void</td>
                <td class="py-3 px-4">required</td>
                <td class="py-3 px-4">Callback when files are added or removed</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">accept</td>
                <td class="py-3 px-4 font-mono text-xs">string</td>
                <td class="py-3 px-4">-</td>
                <td class="py-3 px-4">Accepted file types (e.g., "image/*,.pdf")</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">multiple</td>
                <td class="py-3 px-4 font-mono text-xs">boolean</td>
                <td class="py-3 px-4">false</td>
                <td class="py-3 px-4">Whether to allow multiple files</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">maxSize</td>
                <td class="py-3 px-4 font-mono text-xs">number</td>
                <td class="py-3 px-4">Infinity</td>
                <td class="py-3 px-4">Maximum file size in bytes</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">maxFiles</td>
                <td class="py-3 px-4 font-mono text-xs">number</td>
                <td class="py-3 px-4">Infinity</td>
                <td class="py-3 px-4">Maximum number of files allowed</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">label</td>
                <td class="py-3 px-4 font-mono text-xs">string</td>
                <td class="py-3 px-4">-</td>
                <td class="py-3 px-4">Label text above the upload zone</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">description</td>
                <td class="py-3 px-4 font-mono text-xs">string</td>
                <td class="py-3 px-4">-</td>
                <td class="py-3 px-4">Description text (e.g., "PNG, JPG up to 10MB")</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">error</td>
                <td class="py-3 px-4 font-mono text-xs">string</td>
                <td class="py-3 px-4">-</td>
                <td class="py-3 px-4">Error message to display</td>
              </tr>
              <tr class="border-b border-surface-100 dark:border-surface-800">
                <td class="py-3 px-4 font-mono text-xs">disabled</td>
                <td class="py-3 px-4 font-mono text-xs">boolean</td>
                <td class="py-3 px-4">false</td>
                <td class="py-3 px-4">Whether the upload is disabled</td>
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
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Features</h2>
        <Card class="p-6">
          <ul class="space-y-2 text-surface-600 dark:text-surface-400">
            <li><strong>Drag and Drop</strong> - Drop files directly onto the upload zone</li>
            <li><strong>Click to Browse</strong> - Click the zone to open file browser</li>
            <li><strong>File Type Filtering</strong> - Use accept prop to limit file types</li>
            <li><strong>Size Validation</strong> - Automatically validates file sizes</li>
            <li><strong>File List</strong> - Shows uploaded files with remove buttons</li>
            <li><strong>Keyboard Accessible</strong> - Full keyboard navigation support</li>
          </ul>
        </Card>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Form Example</h2>
        <CodeBlock
          code={`function DocumentUploadForm() {
  const [files, setFiles] = createSignal<File[]>([]);
  const [error, setError] = createSignal<string>();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    if (files().length === 0) {
      setError('Please upload at least one document');
      return;
    }

    setError(undefined);

    // Create FormData for upload
    const formData = new FormData();
    files().forEach((file, i) => {
      formData.append(\`document_\${i}\`, file);
    });

    // Submit to server...
  };

  return (
    <form onSubmit={handleSubmit} class="space-y-4">
      <FileUpload
        onFilesChange={setFiles}
        label="Documents"
        description="PDF, DOC, DOCX up to 10MB"
        accept=".pdf,.doc,.docx"
        multiple
        maxSize={10 * 1024 * 1024}
        error={error()}
      />
      <Button type="submit">Upload Documents</Button>
    </form>
  );
}`}
          language="tsx"
        />
      </section>
    </div>
  );
}
