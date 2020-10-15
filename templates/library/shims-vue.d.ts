declare module '*.vue' {
<% if (version === 3) { -%>
  import { DefineComponent } from 'vue';

  const Component: DefineComponent;
  export default Component;
<% } else { -%>
  import Vue from 'vue';
  export default Vue;
<% } -%>
}
