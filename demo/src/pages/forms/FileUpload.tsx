import { FileUpload, Card, CodeBlock } from 'glass-ui-solid';
import { createSignal } from 'solid-js';
import { PageHeader, DemoSection, PropsTable } from '../../components/demo';

export default function FileUploadPage() {
  const [basicFiles, setBasicFiles] = createSignal<File[]>([]);
  const [imageFiles, setImageFiles] = createSignal<File[]>([]);
  const [singleFile, setSingleFile] = createSignal<File[]>([]);
  const [limitedFiles, setLimitedFiles] = createSignal<File[]>([]);
  const [errorFiles, setErrorFiles] = createSignal<File[]>([]);

  return (
    <div class="space-y-8">
      <PageHeader
        title="FileUpload"
        description="A glassmorphic file upload component with drag and drop support. Features file type filtering, size limits, and visual file list management."
      />

      <DemoSection
        title="Import"
        code="import { FileUpload } from 'glass-ui-solid';"
      />

      <DemoSection
        title="Basic Usage"
        code={`const [files, setFiles] = createSignal<File[]>([]);

<FileUpload
  onFilesChange={setFiles}
  label="Upload files"
  description="Drag and drop files here or click to browse"
  multiple
/>`}
      >
        <FileUpload
          onFilesChange={setBasicFiles}
          label="Upload files"
          description="Drag and drop files here or click to browse"
          multiple
        />
        <p class="mt-4 text-sm text-surface-500 dark:text-surface-400">
          Files selected: {basicFiles().length}
        </p>
      </DemoSection>

      <DemoSection
        title="Accept Specific File Types"
        code={`<FileUpload
  onFilesChange={setFiles}
  label="Upload images"
  description="PNG, JPG, GIF, WebP"
  accept="image/*"
  multiple
/>`}
      >
        <FileUpload
          onFilesChange={setImageFiles}
          label="Upload images"
          description="PNG, JPG, GIF, WebP"
          accept="image/*"
          multiple
        />
      </DemoSection>

      <DemoSection
        title="Single File Upload"
        code={`<FileUpload
  onFilesChange={setFile}
  label="Profile photo"
  description="Upload a single image file"
  accept="image/*"
  // multiple is false by default
/>`}
      >
        <FileUpload
          onFilesChange={setSingleFile}
          label="Profile photo"
          description="Upload a single image file"
          accept="image/*"
        />
        <p class="mt-4 text-sm text-surface-500 dark:text-surface-400">
          {singleFile().length > 0 ? `Selected: ${singleFile()[0].name}` : 'No file selected'}
        </p>
      </DemoSection>

      <DemoSection
        title="File Size and Count Limits"
        code={`<FileUpload
  onFilesChange={setFiles}
  label="Documents"
  description="PDF files up to 5MB each, max 3 files"
  accept=".pdf"
  multiple
  maxSize={5 * 1024 * 1024}  // 5MB in bytes
  maxFiles={3}
/>`}
      >
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
      </DemoSection>

      <DemoSection
        title="With Error State"
        code={`<FileUpload
  onFilesChange={setFiles}
  label="Required document"
  description="Please upload your document"
  error="This field is required"
/>`}
      >
        <FileUpload
          onFilesChange={setErrorFiles}
          label="Required document"
          description="Please upload your document"
          error="This field is required"
        />
      </DemoSection>

      <DemoSection
        title="Disabled State"
        code={`<FileUpload
  onFilesChange={setFiles}
  label="Uploads disabled"
  description="File uploads are currently unavailable"
  disabled
/>`}
      >
        <FileUpload
          onFilesChange={() => {}}
          label="Uploads disabled"
          description="File uploads are currently unavailable"
          disabled
        />
      </DemoSection>

      <DemoSection title="Props">
        <PropsTable
          props={[
            { name: 'onFilesChange', type: '(files: File[]) => void', default: 'required', description: 'Callback when files are added or removed' },
            { name: 'accept', type: 'string', description: 'Accepted file types (e.g., "image/*,.pdf")' },
            { name: 'multiple', type: 'boolean', default: 'false', description: 'Whether to allow multiple files' },
            { name: 'maxSize', type: 'number', default: 'Infinity', description: 'Maximum file size in bytes' },
            { name: 'maxFiles', type: 'number', default: 'Infinity', description: 'Maximum number of files allowed' },
            { name: 'label', type: 'string', description: 'Label text above the upload zone' },
            { name: 'description', type: 'string', description: 'Description text (e.g., "PNG, JPG up to 10MB")' },
            { name: 'error', type: 'string', description: 'Error message to display' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the upload is disabled' },
            { name: 'class', type: 'string', description: 'Additional CSS classes' },
          ]}
        />
      </DemoSection>

      <DemoSection
        title="Features"
        card={false}
      >
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
      </DemoSection>

      <DemoSection
        title="Form Example"
        card={false}
      >
        <Card class="p-6">
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
        </Card>
      </DemoSection>
    </div>
  );
}
