<template>
  <div id="app" class='app'>
    <app-header/>
    <router-view/>    
  </div>
</template>

<script>
import appHeader from '@/components/AppHeader'

export default {
    name: 'app',
    components: {
        appHeader
    }
}
</script>

<style src="@/styles/main.styl" lang="styl"/>
