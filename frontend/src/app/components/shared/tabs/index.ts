/**
 * Módulo de Tabs - Exportaciones públicas
 *
 * Componentes disponibles:
 * - Tabs: Sistema de tabs clásico con contenido string
 * - TabGroup: Tabs con proyección de contenido (ng-content)
 * - TabPanel: Panel individual para usar con TabGroup
 * - ResponsiveTabs: Tabs en desktop, Accordion en móvil/tablet
 */

// Componente original
export { Tabs } from './tabs';

// Nuevos componentes con proyección de contenido
export { TabPanel } from './tab-panel';
export { TabGroup } from './tab-group';
export { ResponsiveTabs } from './responsive-tabs';
