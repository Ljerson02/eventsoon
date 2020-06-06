<!-- Alert.vue -->
<template>
  <div class="alert-container" v-if="alert">
    <v-alert
      class="text-center"
      :value="!!alert"
      :type="alert.type"
      >{{ alert.message }}</v-alert
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters("alert",{alert: "GET_ALERT"}),
    },
    methods: {
        closeAlert() {
            this.setAlert({});
        }
    }
};
</script>

<style scoped>
    .alert-container{
        position: absolute;
        top: 10px;
        right: 0px;
        width: 300px;
        height: 200px;
        z-index: 999;
    }
</style>