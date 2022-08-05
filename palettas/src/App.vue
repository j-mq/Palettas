<template>
  <div class="container">
    <div class="layoutContainer">
      <ColorSampling />
      <div class="colorSwatchList">
        <ColorSwatch />
      </div>
    </div>
  </div>
</template>

<script>
import ColorSampling from "./components/ColorSampling.vue";
import ColorSwatch from "./components/ColorSwatch.vue";
export default {
  name: "App",
  components: { ColorSampling, ColorSwatch },
};
</script>

<style>
body {
  background-color: #808080;
  margin: 0px;
  padding: 0px;
}
div {
  box-sizing: border-box;
}
.container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
.layoutContainer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 350px;
}
.colorSwatchList {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 32px 0px;
}
</style>
