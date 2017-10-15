<template>
  <section>
    <section v-for="record in records">
      <p>{{ record.fields.address  }}</p>
      <span>libres : {{ record.fields.available_bike_stands }}</span>
      <span> - </span>
      <span> disponibles : {{ record.fields.available_bikes }}</span>
      <span v-if="record.fields.status === 'CLOSED'">station fermée</span>
    </section>
  </section>
</template>


<script>
import { String, list } from "tcomb";
import { validateRecordList } from "@components/api";


export default {
  props: {
    records: {
      default: [],
      validator: validateRecordList
    },
  }
};
</script>
