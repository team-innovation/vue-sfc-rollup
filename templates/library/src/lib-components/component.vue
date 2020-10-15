<script<% if (ts) { %> lang="ts"<% } %>>
<% if (version === 3) { -%>
import { defineComponent } from 'vue';
<% } else if (ts) { -%>
import Vue from 'vue';
<% }

if (ts) { -%>

interface SampleData {
  counter: number;
  initCounter: number;
  message: {
    action: string | null;
    amount: number | null;
  };
}
<% } -%>

export default /*#__PURE__*/<% if (version === 3) {%>defineComponent(<% } else if (ts) { %>Vue.extend(<% } %>{
  name: '<%-componentNamePascal%>Sample', // vue component name
  data()<% if (ts) { %>: SampleData<% } %> {
    return {
      counter: 5,
      initCounter: 5,
      message: {
        action: null,
        amount: null,
      },
    };
  },
  computed: {
    changedBy() {
      const { message } = this<% if (ts) { %> as SampleData<% } %>;
      if (!message.action) return 'initialized';
      return `${message?.action} ${message.amount ?? ''}`.trim();
    },
  },
  methods: {
    increment(arg<% if (ts) { %>: Event | number<% } %>)<% if (ts) { %>: void<% } %> {
      const amount = (typeof arg !== 'number') ? 1 : arg;
      this.counter += amount;
      this.message.action = 'incremented by';
      this.message.amount = amount;
    },
    decrement(arg<% if (ts) { %>: Event | number<% } %>)<% if (ts) { %>: void<% } %> {
      const amount = (typeof arg !== 'number') ? 1 : arg;
      this.counter -= amount;
      this.message.action = 'decremented by';
      this.message.amount = amount;
    },
    reset()<% if (ts) { %>: void<% } %> {
      this.counter = this.initCounter;
      this.message.action = 'reset';
      this.message.amount = null;
    },
  },
<% if (version === 3 || ts) { -%>
});
<% } else { -%>
};
<% } -%>
</script>

<template>
  <div class="<%-componentName%>-sample">
    <p>The counter was {{ changedBy }} to <b>{{ counter }}</b>.</p>
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
  .<%-componentName%>-sample {
    display: block;
    width: 400px;
    margin: 25px auto;
    border: 1px solid #ccc;
    background: #eaeaea;
    text-align: center;
    padding: 25px;
  }
  .<%-componentName%>-sample p {
    margin: 0 0 1em;
  }
</style>
