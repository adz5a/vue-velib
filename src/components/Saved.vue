<template>
  <section>
    <section v-for="record in saved">
      <p>{{ record }}</p>
    </section>
  </section>
</template>


<script>
export default {
  name: "saved",
  computed: {
    saved() {
      console.log(this.$store);
      return this.$store.state.saved
    }
  }
};
</script>
