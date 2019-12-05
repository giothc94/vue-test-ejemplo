<template>
  <div class="mt-5">
    <bounce-loader
      class="d-flex mr-auto ml-auto"
      :loading="isLoading"
      :color="'#000000'"
      :size="150"
      v-bind:style="{ 'margin-top': '15%' }"
    />
    <template v-if="asset.id && !isLoading">
      <div class="d-flex justify-content-around align-items-center">
        <div class="">
          <img
            :src="
              `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`
            "
            :alt="asset.name"
            class="img-thumbnail"
          />
          <h1 class="text-5xl">
            {{ asset.name }}
            <small class="">{{ asset.symbol }}</small>
          </h1>
        </div>

        <div>
          <ul>
            <li class="d-flex">
              <b class="mr-3">Ranking</b>
              <span>#{{ asset.rank }}</span>
            </li>
            <li class="d-flex">
              <b class="mr-3">Precio actual</b>
              <span>{{ asset.priceUsd | dollar }}</span>
            </li>
            <li class="d-flex">
              <b class="mr-3">Precio más bajo</b>
              <span>{{ min | dollar }}</span>
            </li>
            <li class="d-flex">
              <b class="mr-3">Precio más alto</b>
              <span>{{ max | dollar }}</span>
            </li>
            <li class="d-flex">
              <b class="mr-3">Precio Promedio</b>
              <span>{{ avg | dollar }}</span>
            </li>
            <li class="d-flex">
              <b class="mr-3">Variación 24hs</b>
              <span>{{ asset.changePercent24Hr | percent }}</span>
            </li>
          </ul>
        </div>

        <div>
          <button
            class="form-control btn btn-success mb-3"
            @click="toggleConverted"
          >
            {{ fromUsd ? `USD a ${asset.symbol}` : `${asset.symbol} a USD` }}
          </button>

          <div class="">
            <label class="" for="convertValue">
              <input
                v-model="convertValue"
                id="convertValue"
                type="number"
                class="form-control"
                :placeholder="`Valor en ${fromUsd ? 'USD' : asset.symbol}`"
              />
            </label>
          </div>
          <span
            >{{ convertResult }} {{ fromUsd ? `${asset.symbol}` : `USD` }}</span
          >
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <line-chart
              class="mt-5"
              :colors="['black']"
              :min="min"
              :max="max"
              :data="
                history.map(h => [h.date, parseFloat(h.priceUsd).toFixed(2)])
              "
            />
          </div>
        </div>
      </div>
      <div class="container mt-5">
        <div class="row">
          <div class="offset-md-2 col-md-8">
            <h3>Mejores ofertas de cambio</h3>
            <table class="table table-hover">
              <tr
                v-for="market in markets"
                :key="`${market.exchangeId}-${market.priceUsd}`"
              >
                <th>{{ market.exchangeId }}</th>
                <td>{{ market.priceUsd | dollar }}</td>
                <td>{{ market.baseSymbol }} / {{ market.quoteSymbol }}</td>
                <td>
                  <PxButton
                    :isLoading="market.isLoading || false"
                    v-if="!market.url"
                    @goDetail="getWebSite(market)"
                    ><slot>Obtener link</slot></PxButton
                  >
                  <a v-else :href="market.url" target="_blank">{{
                    market.url
                  }}</a>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import api from "@/utils/api";
import PxButton from "@/components/PxButton";
export default {
  name: "CoinDetail",
  data() {
    return {
      asset: {},
      history: [],
      isLoading: false,
      markets: [],
      fromUsd: true,
      convertValue: null
    };
  },
  components: { PxButton },
  computed: {
    min() {
      return Math.min(
        ...this.history.map(coin => parseFloat(coin.priceUsd).toFixed(2))
      );
    },
    max() {
      return Math.max(
        ...this.history.map(coin => parseFloat(coin.priceUsd).toFixed(2))
      );
    },
    avg() {
      return Math.abs(
        ...this.history.map(coin => parseFloat(coin.priceUsd).toFixed(2))
      );
    },
    convertResult() {
      if (!this.convertValue) {
        return 0;
      }
      const result = this.fromUsd
        ? this.convertValue / this.asset.priceUsd
        : this.convertValue * this.asset.priceUsd;
      return result.toFixed(4);
    }
  },
  created() {
    this.getCoin();
  },
  watch: {
    $route() {
      this.getCoin();
    }
  },
  methods: {
    getCoin() {
      this.isLoading = true;
      const id = this.$route.params.id;
      Promise.all([
        api.getAsset(id),
        api.getAssetHistory(id),
        api.getMarkets(id)
      ])
        .then(([asset, history, markets]) => {
          this.asset = asset;
          this.history = history;
          this.markets = markets;
        })
        .finally(() => (this.isLoading = false));
    },
    getWebSite(exchange) {
      this.$set(exchange, "isLoading", true);
      return api
        .getExchange(exchange.exchangeId)
        .then(res => {
          this.$set(exchange, "url", res.exchangeUrl);
        })
        .finally(() => {
          this.$set(exchange, "isLoading", false);
        });
    },
    toggleConverted() {
      this.fromUsd = !this.fromUsd;
    }
  }
};
</script>
