<% if (ts) {
if (version === 3) { -%>
import { App, Plugin } from 'vue';

<% } else { -%>
import _Vue, { PluginFunction, PluginObject } from 'vue';

<% }
} -%>
// Import vue components
import * as components from '@/lib-components/index';

<% if (ts) { -%>
// Define typescript interfaces for autoinstaller
<% if (version === 3) { -%>
type InstallFunction = Plugin['install'] & { installed?: boolean }
<% } else { -%>
type InstallFunction = PluginFunction<any> & { installed?: boolean }
<% } -%>

<% } -%>
// install function executed by Vue.use()
<% if (ts) { -%>
const install: InstallFunction = function install<%-componentNamePascal%>(<% if (version === 3) { %>app: App<% } else { %>Vue: typeof _Vue<% } %>) {
<% } else { -%>
const install = function install<%-componentNamePascal%>(<% if (version === 3) { %>app<% } else { %>Vue<% } %>) {
<% } -%>
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(([componentName, component]) => {
    <% if (version === 3) { %>app<% } else { %>Vue<% } %>.component(componentName, component);
  });
};

// Create module definition for Vue.use()
export default {
  install,
}<% if (ts) { %> as <% if (version === 3) { %>Plugin<% } else { %>PluginObject<any><% } } %>;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from '@/lib-components/index';
