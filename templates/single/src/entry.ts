<% if (ts) { -%>
import _Vue, { PluginFunction, VueConstructor } from 'vue';

<% } -%>
// Import vue component
import component from '@/<%-componentName%>.vue';

<% if (ts) { -%>
// Define typescript interfaces for autoinstaller
interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}
interface InstallableComponent extends VueConstructor<_Vue> {
  install: InstallFunction;
}

<% } -%>
// install function executed by Vue.use()
<% if (ts) { -%>
const install: InstallFunction = function(Vue: typeof _Vue) {
<% } else { -%>
const install = function(Vue) {
<% } -%>
  if (install.installed) return;
  install.installed = true;
  Vue.component('<%-componentNamePascal%>', component);
};

// Create module definition for Vue.use()
const plugin = {
  install,
};

// To auto-install when vue is found
/* global window global */
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
<% if (ts) { -%>
  GlobalVue = (global as any).Vue;
<% } else { -%>
  GlobalVue = global.Vue;
<% } -%>
}
if (GlobalVue) {
<% if (ts) { -%>
  (GlobalVue as typeof _Vue).use(plugin);
<% } else { -%>
  GlobalVue.use(plugin);
<% } -%>
}

// Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()
<% if (ts) { -%>
(component as any as InstallableComponent).install = install;
<% } else { -%>
component.install = install;
<% } -%>

// Export component by default
export default component;

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
