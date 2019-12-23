<% if (ts) { -%>
import _Vue, { PluginFunction } from 'vue';

<% } -%>
// Import vue components
import * as components from '@/lib-components/index';

<% if (ts) { -%>
// Define typescript interfaces for autoinstaller
interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
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
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
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

// Default export is library as a whole, registered via Vue.use()
export default plugin;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from '@/lib-components/index';
