<% if (ts) { -%>
import Vue, { VNode } from 'vue';
<% } else { -%>
import Vue from 'vue';
<% } -%>
import Dev from '@/serve-dev.vue';

Vue.config.productionTip = false;

new Vue({
<% if (ts) { -%>
  render: (h): VNode => h(Dev),
<% } else { -%>
  render: (h) => h(Dev),
<% } -%>
}).$mount('#app');
