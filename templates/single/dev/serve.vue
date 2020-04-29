<script<% if (ts) { %> lang="ts"<% } %>>
import Vue from 'vue';
import <%-componentNamePascal%> from '@/<%-componentName%>.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    <%-componentNamePascal%>
  }
});
</script>

<template>
  <div id="app">
    <<%-componentName%> />
  </div>
</template>
