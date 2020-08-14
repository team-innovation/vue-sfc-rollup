<% if (ts) { -%>
import _Vue, { PluginFunction, PluginObject, VueConstructor } from 'vue';

<% } -%>
// Import vue component
import component from '@/<%-componentName%>.vue';

<% if (ts) { -%>
// Define typescript interfaces for installable component
type InstallableComponent = VueConstructor<_Vue> & PluginObject<any>;

<% } -%>
// install function executed by Vue.use()
<% if (ts) { -%>
const install: PluginFunction<any> & { installed?: boolean } = function install<%-componentNamePascal%>(Vue: typeof _Vue) {
<% } else { -%>
const install = function install<%-componentNamePascal%>(Vue) {
<% } -%>
  if (install.installed) return;
  install.installed = true;
  Vue.component('<%-componentNamePascal%>', component);
};

// Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()
<% if (ts) { -%>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(component as any as InstallableComponent).install = install;

// Export component by default
export default (component as any as InstallableComponent);
<% } else { -%>
component.install = install;

// Export component by default
export default component;
<% } -%>

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
