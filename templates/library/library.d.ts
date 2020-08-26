<% if (version === 3) { -%>
import { defineComponent, Plugin } from 'vue';

type InstallFunction = Plugin['install'] & { installed?: boolean }
<% } else { -%>
import Vue, { PluginFunction, VueConstructor } from 'vue';

interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}
<% } -%>

declare const <%-componentNamePascal%>: { install: InstallFunction };
export default <%-componentNamePascal%>;

export const <%-componentNamePascal%>Sample: <% if (version === 3) { %>ReturnType<typeof defineComponent><% } else { %>VueConstructor<Vue><% } %>;
