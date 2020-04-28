<% if (ts) { -%>
import _Vue, { PluginFunction, VueConstructor } from 'vue';

<% } -%>
// Import vue component
import component from '@/<%-componentName%>.vue';

<% if (ts) { -%>
// Define typescript interfaces for autoinstaller
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}
interface InstallableComponent extends VueConstructor<_Vue> {
  install: InstallFunction;
}

<% } -%>
// install function executed by Vue.use()
<% if (ts) { -%>
const install: InstallFunction = function install<%-componentNamePascal%>(Vue: typeof _Vue) {
<% } else { -%>
const install = function install<%-componentNamePascal%>(Vue) {
<% } -%>
  if (install.installed) return;
  install.installed = true;
  Vue.component('<%-componentNamePascal%>', component);
};

// Create module definition for Vue.use()
const plugin = {
  install,
};

// To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare
/* global window, global */
if ('false' === process.env.ES_BUILD) {
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
    (GlobalVue as typeof _Vue).use(plugin);
<% } else { -%>
    GlobalVue.use(plugin);
<% } -%>
  }
}

// Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()
<% if (ts) { -%>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(component as any as InstallableComponent).install = install;
<% } else { -%>
component.install = install;
<% } -%>

// Export component by default
export default component;

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
