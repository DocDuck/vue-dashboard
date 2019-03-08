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
    },
    data () {
      return {
               
      }
    }
}
</script>

<style src="@/styles/main.styl" lang="styl"/>
