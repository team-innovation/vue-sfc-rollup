<% if (ts && version === 3) { -%>
import { App, DefineComponent, Plugin } from 'vue';
<% } else if (ts && version === 2) { -%>
import _Vue, { PluginObject, VueConstructor } from 'vue';
<% } -%>

// Import vue component
import component from '@/<%-componentName%>.vue';

<% if (ts) { -%>
// Define typescript interfaces for installable component
<% if (version === 3) { -%>
type InstallableComponent = DefineComponent<{}, {}, any> & { install: Exclude<Plugin['install'], undefined> };
<% } else { -%>
type InstallableComponent = VueConstructor<_Vue> & PluginObject<any>;
<% } -%>

<% } -%>
// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
export default /*#__PURE__*/(()<% if (ts) { %>: InstallableComponent<% } %> => {
  <% if (ts) { %>// Assign InstallableComponent type<% } else { %>// Get component instance<% } %>
  const installable = component<% if (ts) { %> as unknown as InstallableComponent<% } %>;

  // Attach install function executed by Vue.use()
<% if (ts) { -%>
  installable.install = (<% if (version === 3) { %>app: App<% } else { %>Vue: typeof _Vue<% } %>) => {
<% } else { -%>
  installable.install = (<% if (version === 3) { %>app<% } else { %>Vue<% } %>) => {
<% } -%>
    <% if (version === 3) { %>app<% } else { %>Vue<% } %>.component('<%-componentNamePascal%>', installable);
  };
  return installable;
})();

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
