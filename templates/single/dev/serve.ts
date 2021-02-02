<% if (version === 3) { -%>
import { createApp } from 'vue';
import Dev from './serve.vue';

const app = createApp(Dev);
app.mount('#app');
<% } else {
if (ts) { -%>
import Vue, { VNode } from 'vue';
<% } else { -%>
import Vue from 'vue';
<% } -%>
import Dev from './serve.vue';

Vue.config.productionTip = false;

new Vue({
<% if (ts) { -%>
  render: (h): VNode => h(Dev),
<% } else { -%>
  render: (h) => h(Dev),
<% } -%>
}).$mount('#app');
<% } -%>
