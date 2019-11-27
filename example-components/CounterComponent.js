Vue.component("counter", {
  data() {
    return {
      counter: 0
    };
  },
  methods:{
      counterIncrementAction(){
          this.counter += 1
      }
  },
  template:`
    <div id="counter">
        <input v-on:click="counterIncrementAction" type="button" value="Click me!">
        <span>{{ counter }}</span>
    </div>
  `
});
new Vue({
  el: "#app",
  data() {
    return {
      title: `Hola mundo feliz`
    };
  }
});

