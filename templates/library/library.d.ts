<% if (version === 3) { -%>
import { DefineComponent, Plugin } from 'vue';

<% } else { -%>
import Vue, { PluginFunction, VueConstructor } from 'vue';

<% } -%>

declare const <%-componentNamePascal%>: <% if (version === 3) { %>Exclude<Plugin['install'], undefined><% } else { %>PluginFunction<any><% } %>;
export default <%-componentNamePascal%>;

export const <%-componentNamePascal%>Sample: <% if (version === 3) { %>DefineComponent<% } else { %>VueConstructor<Vue><% } %>;
