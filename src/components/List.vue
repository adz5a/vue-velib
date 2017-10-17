<template>
  <section>
    <section v-for="record in records">
      <p>{{ record.fields.address  }}</p>
        <span>libres : {{ record.fields.available_bike_stands }}</span>
        <span> - </span>
        <span> disponibles : {{ record.fields.available_bikes }}</span>
        <span v-if="record.fields.status === 'CLOSED'">station fermée</span>
      <p>{{ fromNow(record.fields.last_update) }}</p>
      <p>
        <button :click="onRemember">Remember</button>
        <button :click="onDisplay">Display on Map</button>
      </p>
    </section>
  </section>
</template>


<script>
import { String, list, Function } from "tcomb";
import { validateRecordList } from "@components/api";
import moment from "moment";


export default {
  props: {
    records: {
      default: [],
      validator: validateRecordList
    },
    onRemember: {
      default: () => {},
      validator: Function
    },
    onDisplay: {
      default: () => {},
      validator: Function
    }
  },
  methods: {
    fromNow ( dateString ) {
      return moment(dateString).fromNow();
    }
  }
};
</script>
