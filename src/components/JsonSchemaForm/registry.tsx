import type { Component, ParentComponent } from 'solid-js';
import { createContext, createMemo, useContext } from 'solid-js';
import type { BaseFieldProps, Schema } from './types';
import { resolveSchemaType } from './utils';

/**
 * A component that can render a JSON Schema field.
 */
export type FieldComponent = Component<BaseFieldProps>;

/**
 * Custom resolver function for advanced field matching.
 * Return a component to handle the field, or undefined to skip.
 */
export type FieldResolver = (
  schema: Schema,
  path: string[],
) => FieldComponent | undefined;

/**
 * Configuration for the field registry.
 */
export interface FieldRegistryConfig {
  /** Override field rendering by schema type (e.g. 'string', 'number', 'boolean', 'enum', 'oneOf') */
  types?: Record<string, FieldComponent>;
  /** Override field rendering by schema format (e.g. 'color', 'date', 'markdown') */
  formats?: Record<string, FieldComponent>;
  /** Custom resolver functions. First non-undefined result wins. */
  resolvers?: FieldResolver[];
}

/**
 * Props for the FieldRegistryProvider component.
 */
export interface FieldRegistryProviderProps {
  config: FieldRegistryConfig;
}

export const FieldRegistryContext = createContext<
  FieldRegistryConfig | undefined
>();

/**
 * Hook to access the field registry from context.
 */
export function useFieldRegistry(): FieldRegistryConfig | undefined {
  return useContext(FieldRegistryContext);
}

/**
 * Provider component for app-level field registry.
 * Wraps children with FieldRegistryContext, merging with any parent context.
 *
 * @example
 * ```tsx
 * <FieldRegistryProvider config={{
 *   formats: { color: ColorPickerField },
 *   types: { boolean: MySwitchField },
 * }}>
 *   <FormA ... />
 *   <FormB ... />
 * </FieldRegistryProvider>
 * ```
 */
export const FieldRegistryProvider: ParentComponent<
  FieldRegistryProviderProps
> = (props) => {
  const parentConfig = useFieldRegistry();
  const merged = createMemo(() => mergeConfigs(parentConfig, props.config));

  return (
    <FieldRegistryContext.Provider value={merged()}>
      {props.children}
    </FieldRegistryContext.Provider>
  );
};

/**
 * Merge two registry configs. `primary` takes priority over `secondary`.
 * Resolvers are concatenated (primary first, then secondary).
 */
export function mergeConfigs(
  secondary: FieldRegistryConfig | undefined,
  primary: FieldRegistryConfig | undefined,
): FieldRegistryConfig | undefined {
  if (!primary && !secondary) {
    return undefined;
  }
  if (!primary) {
    return secondary;
  }
  if (!secondary) {
    return primary;
  }

  return {
    types: { ...secondary.types, ...primary.types },
    formats: { ...secondary.formats, ...primary.formats },
    resolvers: [...(primary.resolvers || []), ...(secondary.resolvers || [])],
  };
}

/**
 * Resolve a field component from the registry config.
 *
 * Resolution order:
 * 1. Custom resolvers (first non-undefined result wins)
 * 2. Format match (formats[schema.format])
 * 3. Type override (types[effectiveType])
 * 4. Returns undefined (caller falls back to built-in Switch/Match)
 */
export function resolveFieldFromRegistry(
  schema: Schema,
  path: string[],
  config: FieldRegistryConfig | undefined,
): FieldComponent | undefined {
  if (!config) {
    return undefined;
  }

  // 1. Custom resolvers
  if (config.resolvers) {
    for (const resolver of config.resolvers) {
      const result = resolver(schema, path);
      if (result) {
        return result;
      }
    }
  }

  // 2. Format match
  if (schema.format && config.formats?.[schema.format]) {
    return config.formats[schema.format];
  }

  // 3. Type override (enum/oneOf checked before raw type, same logic as schemaType memo)
  const effectiveType = schema.enum
    ? 'enum'
    : schema.oneOf
      ? 'oneOf'
      : schema.anyOf
        ? 'anyOf'
        : resolveSchemaType(schema) || 'string';

  if (config.types?.[effectiveType]) {
    return config.types[effectiveType];
  }

  return undefined;
}
