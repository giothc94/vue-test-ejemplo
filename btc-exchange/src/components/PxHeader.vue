<template>
  <nav class="navbar navbar-dark d-flex justify-content-start bg-dark sticky-top">
    <span class="navbar-brand mb-0 h1">
      <PxIcon />
      <span class="ml-2"
        ><router-link to="/" class="text-decoration-none text-white"
          >Exchange</router-link
        ></span
      >
    </span>
    <router-link
      v-for="l in links"
      :key="l.title"
      :to="l.to"
      class="text-decoration-none text-white mr-2 text-white-50"
      >{{ l.title }}</router-link
    >
  </nav>
</template>
<script>
import PxIcon from "@/components/PxIcon";
export default {
  name: "PxHeader",
  props: {
    links: {
      type: Array,
      default: () => []
    }
  },
  components: {
    PxIcon
  }
};
</script>
