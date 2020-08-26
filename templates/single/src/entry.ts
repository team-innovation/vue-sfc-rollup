<% if (ts && version === 2) { -%>
import _Vue from 'vue';

<% } -%>
// iife/cjs usage extends esm default export - so import it all
import component /* , { RollupDemoDirective } */ from '@/entry.esm';

// Attach named exports directly to component. IIFE/CJS will
// only expose one global var, with named exports exposed as properties of
// that global var (eg. VivintIcon.iconList)
// component.RollupDemoDirective = RollupDemoDirective;

export default component;
<% if (version === 2) { -%>
// To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare
/* global window, global */
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
<% if (ts) { -%>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  GlobalVue = (global as any).Vue;
<% } else { -%>
  GlobalVue = global.Vue;
<% } -%>
}
if (GlobalVue) {
<% if (ts) { -%>
  (GlobalVue as typeof _Vue).use(component);
<% } else { -%>
  GlobalVue.use(component);
<% } -%>
}
<% } -%>
