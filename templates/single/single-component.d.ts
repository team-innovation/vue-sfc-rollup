<% if (version === 3) { -%>
import { defineComponent, Plugin } from 'vue';

type InstallableComponent = ReturnType<typeof defineComponent> & { install: Plugin['install'] };
<% } else { -%>
import Vue, { PluginFunction, VueConstructor } from 'vue';

export interface InstallableComponent extends VueConstructor<Vue> {
  install: PluginFunction<any>;
}
<% } -%>

declare const <%-componentNamePascal%>: InstallableComponent;
export default <%-componentNamePascal%>;
