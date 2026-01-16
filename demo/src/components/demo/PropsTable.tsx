import DOMPurify from 'dompurify';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import { createMemo } from 'solid-js';
import { Table, type TableColumn } from 'glass-ui-solid';

export interface PropDefinition {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface PropsTableProps {
  props: PropDefinition[];
  /** Use compact style (simpler, 3 columns) vs full style (4 columns with Default) */
  compact?: boolean;
}

/** Highlight TypeScript type syntax */
function highlightType(type: string): string {
  const grammar = Prism.languages.typescript;
  if (!grammar) return type;
  return DOMPurify.sanitize(Prism.highlight(type, grammar, 'typescript'), {
    ALLOWED_TAGS: ['span'],
    ALLOWED_ATTR: ['class'],
  });
}

/**
 * Reusable props table for demo pages.
 * Uses the Table component from glass-ui.
 * Supports two styles:
 * - Default (full): 4 columns (Prop, Type, Default, Description)
 * - Compact: 3 columns (Prop, Type, Description)
 */
export function PropsTable(props: PropsTableProps) {
  const isCompact = () => props.compact ?? false;

  const columns = createMemo((): TableColumn<PropDefinition>[] => {
    const baseColumns: TableColumn<PropDefinition>[] = [
      {
        key: 'name',
        header: 'Prop',
        width: '140px',
        render: (value) => <code class="font-mono text-xs text-primary-600 dark:text-primary-400">{value as string}</code>,
      },
      {
        key: 'type',
        header: 'Type',
        render: (value) => <code class="font-mono text-xs" innerHTML={highlightType(value as string)} />,
      },
    ];

    if (!isCompact()) {
      baseColumns.push({
        key: 'default',
        header: 'Default',
        width: '120px',
        render: (value) => <span class="text-surface-500">{(value as string) ?? '-'}</span>,
      });
    }

    baseColumns.push({
      key: 'description',
      header: 'Description',
    });

    return baseColumns;
  });

  return (
    <Table
      data={props.props}
      columns={columns()}
      size="sm"
      hoverable={false}
      getRowKey={(_, index) => index}
    />
  );
}
