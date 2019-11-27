Vue.component("CoinDetail", {
  props: ["coin"],
  data() {
    return {
      showPrices: false,
      value: 0
    };
  },
  computed: {
    title() {
      return `${this.coin.name} - ${this.coin.symbol}`;
    },
    convertedValue() {
      if (!this.value) {
        return 0;
      } else {
        return this.value / this.coin.price;
      }
    }
  },
  methods: {
    toggleShowPrices() {
      this.showPrices = !this.showPrices;
      // el componente hijo no debe modificar, sino, notificar al componente padre
      this.$emit("change-color", this.showPrices ? '3D3D3D' : 'f4f4f4');
    }
  },
  created(){
    // buen momento para hacer llamado de datos
    console.log('created coin-detail')
  },
  mounted(){
    // se puede acceder al DOM
    console.log('mounted coin-detail')
  },
  template: `
  <div>
    <img 
      v-on:mouseover="toggleShowPrices" 
      v-on:mouseout="toggleShowPrices" 
      v-bind:src="coin.img" 
      v-bind:alt="coin.name" 
    />
    <h1 v-bind:class="coin.changePercent > 0 ? 'green' : 'red' ">
    {{title}}
    <span v-if="coin.changePercent > 0">👍</span>
    <span v-else-if="coin.changePercent == 0">🤘</span>
    <span v-else>👎</span>
    </h1>
    <input type="number" name="value" id="value" v-model="value">
    <span>{{convertedValue}}</span>
    <div v-on:click="toggleShowPrices">{{showPrices ? 'Ocultar precios 🙈' : 'Ver precios 🙉'}}</div>
    <slot name="text"></slot>
    <slot name="link"></slot>
    <ul v-if="showPrices">
    <li class="uppercase"
      v-bind:class="{orange:priceWithDay.value == coin.price,red:priceWithDay.value < coin.price, green:priceWithDay.value > coin.price}"
      v-for="(priceWithDay,i) in coin.pricesWithDays" 
      v-bind:key="priceWithDay.day">
      {{priceWithDay.day}}-{{priceWithDay.value}}-{{i}}
    </li>
  </ul>
  </div>
  `
});
new Vue({
  el: "#app",
  data() {
    return {
      btc: {
        name: "Bitcoin",
        img: "assets/bitcoin-btc-logo.svg",
        changePercent: 10,
        symbol: "BTC",
        price: 8400,
        pricesWithDays: [
          { day: "Lunes", value: 8400 },
          { day: "Martes", value: 7900 },
          { day: "Miercoles", value: 8200 },
          { day: "Jueves", value: 9000 },
          { day: "Viernes", value: 9400 },
          { day: "Sabado", value: 10000 },
          { day: "Domingo", value: 10200 }
        ]
      },
      color: "f4f4f4"
    };
  },
  methods: {
    updatedColor(color) {
      this.color = color || this.color
        .split("")
        .reverse()
        .join("");
    }
  },
  created(){
    // buen momento para hacer llamado de datos
    console.log('created')
  },
  mounted(){
    // se puede acceder al DOM
    console.log('mounted')
  }
  // watch: {
  //   showPrices(newVal, oldVal) {
  //     console.log(newVal, oldVal);
  //   }
  // }
});
