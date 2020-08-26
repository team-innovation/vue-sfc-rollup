<% if (version === 3) { -%>
import { defineComponent, Plugin } from 'vue';

type InstallFunction = Plugin['install'] & { installed?: boolean }
type InstallableComponent = ReturnType<typeof defineComponent> & { install: InstallFunction };
<% } else { -%>
import Vue, { PluginFunction, VueConstructor } from 'vue';

interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}
export interface InstallableComponent extends VueConstructor<Vue> {
  install: InstallFunction;
}
<% } -%>

declare const <%-componentNamePascal%>: InstallableComponent;
export default <%-componentNamePascal%>;
