<% if (version === 3) { -%>
import { DefineComponent, Plugin } from 'vue';
<% } else { -%>
import Vue, { PluginFunction, VueConstructor } from 'vue';
<% } -%>

declare const <%-componentNamePascal%>: <% if (version === 3) { %>DefineComponent & { install: Exclude<Plugin['install'], undefined> }<% } else { %>VueConstructor<Vue> & { install: PluginFunction<any>; }<% } %>;
export default <%-componentNamePascal%>;
