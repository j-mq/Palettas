<template>
  <div class="colorSwatches">
    <div class="mainColor"></div>
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
  name: "ColorSwatch",
  props: {},
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
}
.mainColor {
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 50%;
}
.colorShade {
  width: 33px;
  height: 33px;
  background: white;
  border-radius: 50%;
}
</style>
