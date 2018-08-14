<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
import Promise from 'es6-promise';
import '../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import '../node_modules/bootstrap-sass/assets/javascripts/bootstrap';

if (!window.Promise) {
  window.Promise = Promise;
}

export default {
  name: 'App',
};
</script>

<style>
  .tooltip-inner {
    white-space: nowrap;
  }
</style>
