<template>
  <div class="container">
    <table class="table table-hover">
      <thead>
        <tr class="">
          <th></th>
          <th :class="{ up: this.sortOrder == 1, down: this.sortOrder == -1 }">
            <span class="btn" @click="changeSortOrder"> Ranking</span>
          </th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Cap. de Mercado</th>
          <th>Variación 24hs</th>
          <th>
            <input
              class="form-control"
              type="text"
              id="filter"
              placeholder="Buscar"
              v-model="filter"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="" v-for="asset in filteredAssets" :key="asset.id">
          <td>
            <img
              :src="
                `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`
              "
              :alt="asset.name"
              width="30px"
            />
          </td>
          <td>{{ asset.rank }}</td>
          <td>
            <router-link
              :to="{ name: 'coin-detail', params: { id: asset.id } }"
              class="text-decoration-none text-dark"
            >
              {{ asset.name }}
              <small class="text-black-50">{{ asset.symbol }}</small>
            </router-link>
          </td>
          <td>{{ asset.priceUsd | dollar }}</td>
          <td>{{ asset.marketCapUsd | dollar }}</td>
          <td
            :class="
              asset.changePercent24Hr.includes('-')
                ? 'text-danger'
                : 'text-success'
            "
          >
            {{ asset.changePercent24Hr | percent }}
          </td>
          <td>
            <PxButton @goDetail="goToCoin(asset.id)">
              <span>Detalle</span>
            </PxButton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import PxButton from "@/components/PxButton";
export default {
  name: "PxAssetsTable",
  data() {
    return {
      filter: "",
      sortOrder: 1
    };
  },
  props: {
    assets: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    filteredAssets() {
      if (!this.filter) this.assets;

      const altOrder = this.sortOrder ? -1 : 1;

      return this.assets
        .filter(
          asset =>
            asset.symbol.toLowerCase().includes(this.filter.toLowerCase()) ||
            asset.name.toLowerCase().includes(this.filter.toLowerCase())
        )
        .sort((a, b) => {
          if (parseInt(a.rank) > parseInt(b.rank)) {
            return this.sortOrder;
          }
          return altOrder;
        });
    }
  },
  components: {
    PxButton
  },
  methods: {
    goToCoin(coin) {
      this.$router.push({ name: "coin-detail", params: { id: coin } });
    },
    changeSortOrder() {
      this.sortOrder = this.sortOrder == 1 ? -1 : 1;
    }
  }
};
</script>
<style scoped>
.table th,
.table td {
  vertical-align: middle;
}
.up::before {
  content: "👆";
}
.down::before {
  content: "👇";
}
</style>
