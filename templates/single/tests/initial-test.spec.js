import {} from 'jest';
// Doc: https://vue-test-utils.vuejs.org/api/
<% if (version === 3) { -%>
import { config, shallowMount } from '@vue/test-utils';
<% } else { -%>
import { createLocalVue, config, shallowMount } from '@vue/test-utils';
<% } -%>
import Component from '../src/<%-componentName%>.vue';

<% if (version === 2) { -%>
const localVue = createLocalVue();
<% } -%>

// Doc: https://vue-test-utils.vuejs.org/api/#config
config.showDeprecationWarnings = true;

describe('Component.vue', () => {
  const wrapper = shallowMount(Component, {
<% if (version === 2) { -%>
    localVue,
<% } -%>
    propsData: {},
  });

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
