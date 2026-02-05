import { createContext, useContext } from 'solid-js';
import type { LiquidGlassContextValue } from './types';

/**
 * Context for sharing LiquidGlass state between provider and surfaces
 */
export const LiquidGlassContext = createContext<LiquidGlassContextValue>();

/**
 * Hook to access the LiquidGlass context
 * @throws Error if used outside of LiquidGlassProvider
 */
export function useLiquidGlass(): LiquidGlassContextValue {
  const context = useContext(LiquidGlassContext);
  if (!context) {
    throw new Error('useLiquidGlass must be used within a LiquidGlassProvider');
  }
  return context;
}

/**
 * Hook to optionally access the LiquidGlass context (returns undefined if not in provider)
 */
export function useLiquidGlassOptional(): LiquidGlassContextValue | undefined {
  return useContext(LiquidGlassContext);
}
