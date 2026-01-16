import type { Plugin } from 'vite';

/**
 * Vite plugin that automatically captures children source code in DemoSection components.
 *
 * When a DemoSection has children but no `code` prop, this plugin extracts the children's
 * source code and injects it as a `code` prop automatically.
 *
 * Conventions:
 * - Only works on files in demo/src/pages/
 * - Skips DemoSection that already has a `code` prop
 * - Children should be self-contained (no external variable references)
 * - Use `code` prop manually for dynamic/conditional children
 */
export function demoCodeCapture(): Plugin {
  return {
    name: 'demo-code-capture',
    enforce: 'pre',

    transform(code: string, id: string) {
      // Only process demo pages
      if (!id.includes('demo/src/pages') || !id.endsWith('.tsx')) {
        return null;
      }

      // Check if file uses DemoSection
      if (!code.includes('<DemoSection')) {
        return null;
      }

      const result = transformDemoSections(code);

      if (result === code) {
        return null;
      }

      return {
        code: result,
        map: null,
      };
    },
  };
}

/**
 * Find and transform all DemoSection components in the code
 */
function transformDemoSections(code: string): string {
  let result = '';
  let i = 0;

  while (i < code.length) {
    // Find next <DemoSection
    const demoStart = code.indexOf('<DemoSection', i);

    if (demoStart === -1) {
      result += code.slice(i);
      break;
    }

    // Add everything before this DemoSection
    result += code.slice(i, demoStart);

    // Parse this DemoSection
    const parsed = parseDemoSection(code, demoStart);

    if (parsed) {
      result += parsed.transformed;
      i = parsed.endIndex;
    } else {
      // Couldn't parse, just add the < and continue
      result += '<';
      i = demoStart + 1;
    }
  }

  return result;
}

interface ParsedDemoSection {
  transformed: string;
  endIndex: number;
}

/**
 * Parse a single DemoSection starting at the given index
 */
function parseDemoSection(code: string, startIndex: number): ParsedDemoSection | null {
  let i = startIndex + '<DemoSection'.length;

  // Skip whitespace
  while (i < code.length && /\s/.test(code[i])) {
    i++;
  }

  // Parse props until we hit > or />
  const propsStart = i;
  let hasCodeProp = false;

  while (i < code.length) {
    const char = code[i];

    // Check for self-closing tag
    if (char === '/' && code[i + 1] === '>') {
      // Self-closing, no children to capture
      const endIndex = i + 2;
      return {
        transformed: code.slice(startIndex, endIndex),
        endIndex,
      };
    }

    // Check for end of opening tag
    if (char === '>') {
      break;
    }

    // Check for code prop
    if (code.slice(i).startsWith('code=') || code.slice(i).startsWith('code ')) {
      hasCodeProp = true;
    }

    // Handle JSX expression in props {....}
    if (char === '{') {
      i = skipBraces(code, i);
      continue;
    }

    // Handle string props "..." or '...'
    if (char === '"' || char === "'") {
      i = skipString(code, i, char);
      continue;
    }

    i++;
  }

  if (i >= code.length) {
    return null; // Malformed
  }

  const propsEnd = i;
  const propsStr = code.slice(propsStart, propsEnd);
  i++; // Skip the >

  // Now find the children and closing tag
  const childrenStart = i;
  const closingTag = '</DemoSection>';

  // Find the matching closing tag (handle nested components)
  let depth = 1;
  let childrenEnd = i;

  while (i < code.length && depth > 0) {
    if (code.slice(i).startsWith('<DemoSection')) {
      depth++;
      i += '<DemoSection'.length;
    } else if (code.slice(i).startsWith(closingTag)) {
      depth--;
      if (depth === 0) {
        childrenEnd = i;
      }
      i += closingTag.length;
    } else if (code[i] === '{') {
      i = skipBraces(code, i);
    } else if (code[i] === '"' || code[i] === "'") {
      i = skipString(code, i, code[i]);
    } else if (code[i] === '`') {
      i = skipTemplateLiteral(code, i);
    } else {
      i++;
    }
  }

  const endIndex = i;
  const children = code.slice(childrenStart, childrenEnd);
  const trimmedChildren = children.trim();

  // Decide if we should inject code prop
  const shouldInject =
    !hasCodeProp && trimmedChildren.length > 0 && !trimmedChildren.startsWith('<PropsTable');

  if (!shouldInject) {
    return {
      transformed: code.slice(startIndex, endIndex),
      endIndex,
    };
  }

  // Build the transformed output
  const cleanedCode = dedentCode(trimmedChildren);
  const escapedCode = escapeForTemplateLiteral(cleanedCode);

  const transformed = `<DemoSection ${propsStr} code={\`${escapedCode}\`}>${children}${closingTag}`;

  return {
    transformed,
    endIndex,
  };
}

/**
 * Skip over a brace-enclosed expression, handling nesting
 */
function skipBraces(code: string, start: number): number {
  let i = start + 1; // Skip opening {
  let depth = 1;

  while (i < code.length && depth > 0) {
    const char = code[i];

    if (char === '{') {
      depth++;
    } else if (char === '}') {
      depth--;
    } else if (char === '"' || char === "'") {
      i = skipString(code, i, char);
      continue;
    } else if (char === '`') {
      i = skipTemplateLiteral(code, i);
      continue;
    }

    i++;
  }

  return i;
}

/**
 * Skip over a string literal
 */
function skipString(code: string, start: number, quote: string): number {
  let i = start + 1; // Skip opening quote

  while (i < code.length) {
    if (code[i] === '\\') {
      i += 2; // Skip escape sequence
    } else if (code[i] === quote) {
      return i + 1; // Include closing quote
    } else {
      i++;
    }
  }

  return i;
}

/**
 * Skip over a template literal, handling ${} expressions
 */
function skipTemplateLiteral(code: string, start: number): number {
  let i = start + 1; // Skip opening `

  while (i < code.length) {
    if (code[i] === '\\') {
      i += 2; // Skip escape sequence
    } else if (code[i] === '`') {
      return i + 1; // Include closing `
    } else if (code[i] === '$' && code[i + 1] === '{') {
      i = skipBraces(code, i + 1); // Skip the ${...}
    } else {
      i++;
    }
  }

  return i;
}

/**
 * Remove common leading indentation from multi-line code
 */
function dedentCode(code: string): string {
  const lines = code.split('\n');

  // Filter out empty lines for indent calculation
  const nonEmptyLines = lines.filter((line) => line.trim().length > 0);

  if (nonEmptyLines.length === 0) {
    return code.trim();
  }

  // Find minimum indentation
  const minIndent = Math.min(
    ...nonEmptyLines.map((line) => {
      const match = line.match(/^(\s*)/);
      return match ? match[1].length : 0;
    })
  );

  // Remove the common indentation
  const dedented = lines.map((line) => (line.length >= minIndent ? line.slice(minIndent) : line)).join('\n');

  return dedented.trim();
}

/**
 * Escape special characters for use in template literal
 */
function escapeForTemplateLiteral(code: string): string {
  return code
    .replace(/\\/g, '\\\\') // Escape backslashes first
    .replace(/`/g, '\\`') // Escape backticks
    .replace(/\$\{/g, '\\${'); // Escape template literal expressions
}

export default demoCodeCapture;
