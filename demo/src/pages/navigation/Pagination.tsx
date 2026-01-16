import { Pagination } from 'glass-ui-solid';
import { createSignal } from 'solid-js';
import { PageHeader, DemoSection, PropsTable } from '../../components/demo';

export default function PaginationPage() {
  const [page1, setPage1] = createSignal(1);
  const [page2, setPage2] = createSignal(1);
  const [pageSize2, setPageSize2] = createSignal(10);
  const [page3, setPage3] = createSignal(5);

  return (
    <div class="space-y-8">
      <PageHeader
        title="Pagination"
        description="Page navigation for large datasets with customizable page sizes."
      />

      <DemoSection
        title="Import"
        code="import { Pagination } from 'glass-ui-solid';"
      />

      <DemoSection
        title="Basic Usage"
        code={`const [page, setPage] = createSignal(1);

<Pagination
  total={100}
  page={page()}
  pageSize={10}
  onChange={setPage}
/>`}
      >
        <Pagination
          total={100}
          page={page1()}
          pageSize={10}
          onChange={setPage1}
        />
      </DemoSection>

      <DemoSection
        title="With Page Size Selector"
        code={`const [page, setPage] = createSignal(1);
const [pageSize, setPageSize] = createSignal(10);

<Pagination
  total={500}
  page={page()}
  pageSize={pageSize()}
  onChange={setPage}
  showPageSize
  pageSizeOptions={[10, 25, 50, 100]}
  onPageSizeChange={setPageSize}
/>`}
      >
        <Pagination
          total={500}
          page={page2()}
          pageSize={pageSize2()}
          onChange={setPage2}
          showPageSize
          pageSizeOptions={[10, 25, 50, 100]}
          onPageSizeChange={setPageSize2}
        />
      </DemoSection>

      <DemoSection
        title="Many Pages (with Ellipsis)"
        description="When there are more than 7 pages, ellipsis is shown for collapsed page ranges."
        code={`const [page, setPage] = createSignal(5);

<Pagination
  total={1000}
  page={page()}
  pageSize={10}
  onChange={setPage}
/>`}
      >
        <Pagination
          total={1000}
          page={page3()}
          pageSize={10}
          onChange={setPage3}
        />
      </DemoSection>

      <DemoSection title="Props">
        <PropsTable
          props={[
            { name: 'total', type: 'number', default: 'required', description: 'Total number of items' },
            { name: 'page', type: 'number', default: 'required', description: 'Current page (1-indexed)' },
            { name: 'pageSize', type: 'number', default: 'required', description: 'Items per page' },
            { name: 'onChange', type: '(page: number) => void', default: 'required', description: 'Page change callback' },
            { name: 'showPageSize', type: 'boolean', default: 'false', description: 'Show page size selector' },
            { name: 'pageSizeOptions', type: 'number[]', default: '[10, 20, 50, 100]', description: 'Available page sizes' },
            { name: 'onPageSizeChange', type: '(size: number) => void', description: 'Page size change callback' },
            { name: 'class', type: 'string', description: 'Additional CSS classes' },
          ]}
        />
      </DemoSection>
    </div>
  );
}
