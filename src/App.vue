<template>
  <div id="app">
    <img src="./assets/logo.png">
    <QueryForm
         v-if="!didSearch"
         :onSearch="onSearch" />
    <section v-if="didSearch">
      <h3>Recherche autour de :</h3>
      <h1>{{ query }}</h1>
    </section>
    <List 
         :title="title"
         :records="records" />
    <section v-if="canLoadMore">
      <input 
             value="+"
             type="button"
             v-on:click="loadMore">
      </input>
    </section>
  </div>
</template>

<script>
import QueryForm from "@components/Form";
import List from "@components/List";
import { refresh } from "@components/api";

export default {
  name: 'app',
  components: {
    QueryForm,
    List
  },
  data() {
    return {
      records: [],
      didSearch: false,
      hits: 0,
      query: ""
    }
  },
  computed: {
    hasRecords () {
      return this.records.length > 0;
    },
    title () {
      if ( this.didSearch ) {
        return this.query;
      } else {
        return "Search your station"
      }
    },
    canLoadMore () {
      return this.didSearch && this.records.length < this.hits;
    },
    title () {
      return this.didSearch ? this.query : "";
    }
  },
  methods: {
    onResponse ( response ) {
      console.log("reponse received");
      this.records = this.records.concat(response.records);
      this.hits = response.nhits; 
    },
    loadMore () {
      refresh({
        start: this.records.length
      })
        .then( response => this.onResponse(response) );
    },
    onSearch (query) {
      console.log("searching...");
      this.didSearch = true;
      this.query = query.q;
      refresh(query)
        .then(this.onResponse, console.error);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
