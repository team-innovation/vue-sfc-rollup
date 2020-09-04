<% if (ts && version === 3) { -%>
import { defineComponent, Plugin } from 'vue';

<% } -%>
// iife/cjs usage extends esm default export - so import it all
// import * as components from '@/lib-components/index';
import plugin, * as components from '@/entry.esm';

// Attach named exports directly to component. IIFE/CJS will
// only expose one global var, with named exports exposed as properties of
// that global var (eg. VivintIcon.iconList)
<% if (ts && version === 3) { -%>
type PluginObject = Plugin & { [key: string]: ReturnType<typeof defineComponent>; };
<% } -%>
Object.entries(components).forEach(([componentName, component]) => {
<% if (ts && version === 3) { -%>
  if (componentName !== 'default') (plugin as PluginObject)[componentName] = component as any as ReturnType<typeof defineComponent>;
<% } else { -%>
  if (componentName !== 'default') plugin[componentName] = component;
<% } -%>
});

export default plugin;
