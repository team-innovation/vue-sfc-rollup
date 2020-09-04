// iife/cjs usage extends esm default export - so import it all
import component /* , { RollupDemoDirective } */ from '@/entry.esm';

// Attach named exports directly to component. IIFE/CJS will
// only expose one global var, with named exports exposed as properties of
// that global var (eg. VivintIcon.iconList)
// component.RollupDemoDirective = RollupDemoDirective;

export default component;
