<template>
  <div class="colorSwatches">
    <div class="mainColor" :style="{ background: color }"></div>
    <div class="colorShade"></div>
    <div class="colorShade"></div>
    <div class="colorShade"></div>
    <div class="colorShade"></div>
    <div class="colorShade"></div>
    <div class="colorShade"></div>
    <div class="colorShade"></div>
  </div>
</template>

<script>
export default {
  name: 'ColorSwatch',
  props: {
    color: {
      type: String,
      default: '#ffffff',
    },
  },
  computed: {},
  methods: {},
};
</script>

<style scoped>
.colorSwatches {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 24px;
}
.mainColor {
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 50%;
  display: flex;
}
.colorShade {
  width: 33px;
  height: 33px;
  background: white;
  border-radius: 50%;
}
</style>
