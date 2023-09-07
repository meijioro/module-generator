<template>
  <button @click="generateCode()" class="btn btn-primary">Generate!</button>
</template>

<script>
export default {
  name: "Generate",
  methods: {
    generateCode() {
      console.log("i clicked");
    },
  },
};
</script>
