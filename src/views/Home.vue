<template>
  <div class="home">
    home
    <button @click="back">返回</button>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>
