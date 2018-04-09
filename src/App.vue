<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
import '../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import '../node_modules/bootstrap-sass/assets/javascripts/bootstrap';

export default {
  name: 'App',
};
</script>

<style>
  .tooltip-inner {
    white-space: nowrap;
  }
</style>
