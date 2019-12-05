<template>
  <button @click="buttonClick" class="btn btn-dark">
    <beat-loader :loading="isLoading" :color="'#fafafa'" :size="8" />
    <slot v-if="!isLoading"></slot>
  </button>
</template>
<script>
export default {
  name: "PxButton",
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    buttonClick() {
      this.$emit("goDetail");
    }
  }
};
</script>
