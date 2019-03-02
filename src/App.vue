<template>
  <div id="app" class='app'>
    <div id="header__nav">
      <router-link class="header__link" to="/">Home</router-link> |
      <router-link class="header__link" to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>
<style src="@/styles/main.styl" lang="styl"/>
