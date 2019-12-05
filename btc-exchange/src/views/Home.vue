<template>
  <main>
    <bounce-loader
      class="d-flex mr-auto ml-auto"
      :loading="isLoading"
      :color="'#000000'"
      :size="150"
      :style="{ 'margin-top': '15%' }"
    />
    <PxAssetsTable
      v-if="!isLoading"
      :assets="assets"
      class="mt-5"
    ></PxAssetsTable>
  </main>
</template>

<script>
// @ is an alias to /src
import api from "@/utils/api";
import PxAssetsTable from "@/components/PxAssetsTable";
export default {
  name: "home",
  components: { PxAssetsTable },
  data() {
    return {
      isLoading: false,
      assets: []
    };
  },
  created() {
    this.isLoading = true;
    api
      .getAssets()
      .then(assets => (this.assets = assets))
      .finally(() => (this.isLoading = false));
  }
};
</script>
