<template>
  <form v-on:submit.prevent="submitForm">
    <input value="Look Around" type="submit"/>
    <input name="query" type="text"/>
  </form>
</template>


<script>
import { refresh } from "@components/api";


export default {
  methods: {
    submitForm ( e ) {
      const q = e.currentTarget.elements.query.value;
      this.onSearch({
        start: 0,
        q
      });
    }
  },
  props: {
    onSearch: {
      type: Function,
      default: () => {} // noop
    }
  }
};
</script>
