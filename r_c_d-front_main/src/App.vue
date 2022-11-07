<template>
  <div id="nav">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
a {
  color: black;
}
input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none;
}
input {
  padding-left: 5px;
  height: 20px;
}
button {
  border: 2px solid;
  border-radius: 10px;
  margin: 5px;
  padding: 5px;
}
</style>
