<% if (version === 3) { -%>
import { createApp } from 'vue';
import Dev from './serve.vue';
// To register individual components where they are used (serve.vue) instead of using the
// library as a whole, comment/remove this import and it's corresponding "app.use" call
import <%-componentNamePascal%> from '@/entry.esm';

const app = createApp(Dev);
app.use(<%-componentNamePascal%>);

app.mount('#app');
<% } else {
if (ts) { -%>
import Vue, { VNode } from 'vue';
<% } else { -%>
import Vue from 'vue';
<% } -%>
import Dev from './serve.vue';
// To register individual components where they are used (serve.vue) instead of using the
// library as a whole, comment/remove this import and it's corresponding "Vue.use" call
import <%-componentNamePascal%> from '@/entry.esm';
Vue.use(<%-componentNamePascal%>);

Vue.config.productionTip = false;

new Vue({
<% if (ts) { -%>
  render: (h): VNode => h(Dev),
<% } else { -%>
  render: (h) => h(Dev),
<% } -%>
}).$mount('#app');
<% } -%>
