<template>
  <button
    type="button"
    @click.prevent="copyToClipboard"
    class="btn btn-outline-primary btn-sm btn-copy"
    data-toggle="tooltip"
    data-placement="top"
    title="Copy to clipboard"
  >
    Copy
  </button>
</template>

<script>
$(function() {
  $('[data-toggle="tooltip"]').tooltip();
});

export default {
  name: "Copy",
  props: ["selectName"],
  methods: {
    copyToClipboard(event) {
      document.getElementById(this.selectName).select();

      try {
        const successful = document.execCommand("copy");
        if (successful) {
          event.target.innerHTML = "Copied!";
        }
      } catch (err) {
        console.warn("Oops, unable to copy");
      }
      /* unselect the range */
      window.getSelection().removeAllRanges();

      setTimeout(function() {
        event.target.innerHTML = "Copy";
      }, 1500);
    },
  },
};
</script>

<style>
.btn-copy {
  position: absolute;
  z-index: 2;
  top: 10px;
  right: 10px;
  background-color: #e2e3e5;
}
</style>
