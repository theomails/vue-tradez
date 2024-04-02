<template>
  <div id="app">
    <GameBoard></GameBoard>
  </div>
</template>

<script>
import GameBoard from './components/GameBoard.vue';

export default {
  name: 'App',
  components: {
    GameBoard
  }
}
</script>

<style>
html, body{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-image: linear-gradient(-22deg, rgb(247, 167, 143), rgb(253, 235, 130));
  margin: 0;
  padding: 0;
  font-size: 0.9em;
}
button{
  background-color: white;
  border: 0px solid #bbb;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px;
  cursor: pointer;
  padding: 5px 10px;
}
.func-flex-grow{
    flex: 1;
}
</style>
