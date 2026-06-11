import Prism from 'prismjs';
// Languages bundled by default. Consumers can add more at runtime via
// `registerPrismLanguage` (see below) or by mutating `Prism.languages` directly.
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

/**
 * The shared Prism instance used by `<CodeBlock>` / `<Markdown>`.
 *
 * Because the library bundles its own copy of Prism, registering a grammar
 * against THIS instance is the reliable way to teach `<CodeBlock>` a new
 * language. Prefer {@link registerPrismLanguage} for that.
 */
export { Prism };

/**
 * Register a Prism grammar so `<CodeBlock language="...">` can highlight it.
 *
 * @example
 * ```ts
 * import { registerPrismLanguage } from 'glass-ui-solid/code';
 * import python from 'refractor/lang/python'; // any source of a Prism grammar
 * registerPrismLanguage('python', python.grammar, ['py']);
 * ```
 *
 * @param name    Language id used as `<CodeBlock language={name}>`.
 * @param grammar The Prism grammar object.
 * @param aliases Optional alias id(s) that resolve to the same grammar.
 */
export function registerPrismLanguage(
  name: string,
  grammar: Prism.Grammar,
  aliases?: string | string[],
): void {
  Prism.languages[name] = grammar;
  if (aliases) {
    const list = Array.isArray(aliases) ? aliases : [aliases];
    for (const alias of list) {
      Prism.languages[alias] = grammar;
    }
  }
}
