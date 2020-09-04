<% if (ts) {
if (version === 3) { -%>
import { App, Plugin } from 'vue';

<% } else { -%>
import _Vue, { PluginFunction, PluginObject } from 'vue';

<% }
} -%>
// Import vue components
import * as components from '@/lib-components/index';

// install function executed by Vue.use()
<% if (ts) { -%>
const install: <% if (version === 3) { %>Plugin['install']<% } else { %>PluginFunction<any><% } %> = function install<%-componentNamePascal%>(<% if (version === 3) { %>app: App<% } else { %>Vue: typeof _Vue<% } %>) {
<% } else { -%>
const install = function install<%-componentNamePascal%>(<% if (version === 3) { %>app<% } else { %>Vue<% } %>) {
<% } -%>
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
