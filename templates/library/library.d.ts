<% if (version === 3) { -%>
import { defineComponent, Plugin } from 'vue';

<% } else { -%>
import Vue, { PluginFunction, VueConstructor } from 'vue';

<% } -%>

declare const <%-componentNamePascal%>: { install: <% if (version === 3) { %>Plugin['install']<% } else { %>PluginFunction<any><% } %> };
export default <%-componentNamePascal%>;

export const <%-componentNamePascal%>Sample: <% if (version === 3) { %>ReturnType<typeof defineComponent><% } else { %>VueConstructor<Vue><% } %>;
