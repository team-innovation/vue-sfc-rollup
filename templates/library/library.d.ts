import Vue, { PluginFunction, VueConstructor } from 'vue';


interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}

declare const <%-componentNamePascal%>: { install: InstallFunction };
export default <%-componentNamePascal%>;

export const <%-componentNamePascal%>Sample: VueConstructor<Vue>;
