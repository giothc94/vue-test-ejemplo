Vue.component("modal", {
  props: ["title"],
  methods: {
    close() {
      this.$emit("close");
    }
  },
  template: `
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="card p-3">
                <h2>{{title}}</h2>
                <div>
                    <slot name="body"></slot>
                </div>
                <div class="d-flex justify-content-end">
                    <button v-on:click="close" class="btn btn-info">Close modal!</button>
                </div>
            </div>
        </div>
    </div>
    `
});

new Vue({
  el: "#app",
  data() {
    return {
      title: "Hola mundo feliz",
      showModal: false
    };
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    }
  }
});
