<template>
  <section>
    <p v-for="record in records">
      <span>{{ record.fields.address  }}</span>
    </p>
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
