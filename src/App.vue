<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: "app"
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-top: 40px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
}
</style>
