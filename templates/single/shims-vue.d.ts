declare module '*.vue' {
<% if (version === 3) { -%>
  import { defineComponent } from 'vue';

  const Component: ReturnType<typeof defineComponent>
  export default Component;
<% } else { -%>
  import Vue from 'vue';
  export default Vue
<% } -%>
}
