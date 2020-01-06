<script<% if (ts) { %> lang="ts"<% } %>>
<% if (ts) { -%>
import Vue from 'vue';

export default Vue.extend({
<% } else { -%>
export default {
<% } -%>
  name: '<%-componentNamePascal%>', // vue component name
  data() {
    return {
      counter: 5,
      initCounter: 5,
    };
  },
  methods: {
    increment(arg<% if (ts) { %>: Event | number<% } %>)<% if (ts) { %>: void<% } %> {
      if (typeof arg !== 'number') this.counter += 1;
      else this.counter += arg;
    },
    decrement(arg<% if (ts) { %>: Event | number<% } %>)<% if (ts) { %>: void<% } %> {
      if (typeof arg !== 'number') this.counter -= 1;
      else this.counter -= arg;
    },
    reset()<% if (ts) { %>: void<% } %> {
      this.counter = this.initCounter;
    }
  },
<% if (ts) { -%>
})
<% } else { -%>
}
<% } -%>
</script>

<template>
  <div class="<%-componentName%>">
    <p>The counter is set to <b>{{ counter }}</b>.</p>
    <button @click="increment">
      Click +1
    </button>
    <button @click="decrement">
      Click -1
    </button>
    <button @click="increment(5)">
      Click +5
    </button>
    <button @click="decrement(5)">
      Click -5
    </button>
    <button @click="reset">
      Reset
    </button>
  </div>
</template>

<style scoped>
  .<%-componentName%> {
    display: block;
    width: 400px;
    margin: 25px auto;
    border: 1px solid #ccc;
    background: #eaeaea;
    text-align: center;
    padding: 25px;
  }
  .<%-componentName%> p {
    margin: 0 0 1em;
  }
</style>
