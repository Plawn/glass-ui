import { Pagination, CodeBlock, Card } from 'glass-ui-solid';
import { createSignal } from 'solid-js';

export default function PaginationPage() {
  const [page1, setPage1] = createSignal(1);
  const [page2, setPage2] = createSignal(1);
  const [pageSize2, setPageSize2] = createSignal(10);
  const [page3, setPage3] = createSignal(5);

  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl font-bold text-surface-900 dark:text-white mb-2">Pagination</h1>
        <p class="text-surface-600 dark:text-surface-400">
          Page navigation for large datasets with customizable page sizes.
        </p>
      </div>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Import</h2>
        <CodeBlock code="import { Pagination } from 'glass-ui-solid';" language="tsx" />
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Basic Usage</h2>
        <Card class="p-6">
          <Pagination
            total={100}
            page={page1()}
            pageSize={10}
            onChange={setPage1}
          />
        </Card>
        <div class="mt-4">
          <CodeBlock
            code={`const [page, setPage] = createSignal(1);

<Pagination
  total={100}
  page={page()}
  pageSize={10}
  onChange={setPage}
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          With Page Size Selector
        </h2>
        <Card class="p-6">
          <Pagination
            total={500}
            page={page2()}
            pageSize={pageSize2()}
            onChange={setPage2}
            showPageSize
            pageSizeOptions={[10, 25, 50, 100]}
            onPageSizeChange={setPageSize2}
          />
        </Card>
        <div class="mt-4">
          <CodeBlock
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
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">
          Many Pages (with Ellipsis)
        </h2>
        <Card class="p-6">
          <Pagination
            total={1000}
            page={page3()}
            pageSize={10}
            onChange={setPage3}
          />
        </Card>
        <p class="mt-2 text-sm text-surface-600 dark:text-surface-400">
          When there are more than 7 pages, ellipsis is shown for collapsed page ranges.
        </p>
        <div class="mt-4">
          <CodeBlock
            code={`const [page, setPage] = createSignal(5);

<Pagination
  total={1000}
  page={page()}
  pageSize={10}
  onChange={setPage}
/>`}
            language="tsx"
          />
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-surface-900 dark:text-white mb-4">Props</h2>
        <Card class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-surface-200 dark:border-white/10">
                <th class="text-left p-3 font-semibold text-surface-900 dark:text-white">Prop</th>
                <th class="text-left p-3 font-semibold text-surface-900 dark:text-white">Type</th>
                <th class="text-left p-3 font-semibold text-surface-900 dark:text-white">Default</th>
                <th class="text-left p-3 font-semibold text-surface-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody class="text-surface-600 dark:text-surface-400">
              <tr class="border-b border-surface-200 dark:border-white/10">
                <td class="p-3 font-mono text-xs">total</td>
                <td class="p-3 font-mono text-xs">number</td>
                <td class="p-3">required</td>
                <td class="p-3">Total number of items</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-white/10">
                <td class="p-3 font-mono text-xs">page</td>
                <td class="p-3 font-mono text-xs">number</td>
                <td class="p-3">required</td>
                <td class="p-3">Current page (1-indexed)</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-white/10">
                <td class="p-3 font-mono text-xs">pageSize</td>
                <td class="p-3 font-mono text-xs">number</td>
                <td class="p-3">required</td>
                <td class="p-3">Items per page</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-white/10">
                <td class="p-3 font-mono text-xs">onChange</td>
                <td class="p-3 font-mono text-xs">(page: number) =&gt; void</td>
                <td class="p-3">required</td>
                <td class="p-3">Page change callback</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-white/10">
                <td class="p-3 font-mono text-xs">showPageSize</td>
                <td class="p-3 font-mono text-xs">boolean</td>
                <td class="p-3">false</td>
                <td class="p-3">Show page size selector</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-white/10">
                <td class="p-3 font-mono text-xs">pageSizeOptions</td>
                <td class="p-3 font-mono text-xs">number[]</td>
                <td class="p-3">[10, 20, 50, 100]</td>
                <td class="p-3">Available page sizes</td>
              </tr>
              <tr class="border-b border-surface-200 dark:border-white/10">
                <td class="p-3 font-mono text-xs">onPageSizeChange</td>
                <td class="p-3 font-mono text-xs">(size: number) =&gt; void</td>
                <td class="p-3">-</td>
                <td class="p-3">Page size change callback</td>
              </tr>
              <tr>
                <td class="p-3 font-mono text-xs">class</td>
                <td class="p-3 font-mono text-xs">string</td>
                <td class="p-3">-</td>
                <td class="p-3">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>
    </div>
  );
}
