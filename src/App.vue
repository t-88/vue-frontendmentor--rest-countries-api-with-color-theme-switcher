<template>
  <Header @is-light-mode="changeTheme" :isLightMode="isLightMode"/>
  <router-view v-slot="{ Component }">
      <component :is="Component" :countryData="countryData" :isLightMode="isLightMode" />
  </router-view>
</template>

<script>
import { ref , onMounted} from 'vue'
import axios from "axios"

import Header from "@/components/views/Header"
import Home from "@/components/views/home/Home"
export default {
  name: 'App',
  components: {
    Home,
    Header,
  },
  setup() {
    const isLightMode = ref(true)
    const countryData = ref([])
    const savePrevMode = (isLightMode) => {
      window.localStorage.setItem("isLightMode",JSON.stringify(isLightMode))
    }
    const changeTheme = (fromPrevSave = false) => {
      if(!fromPrevSave) {
        isLightMode.value = !isLightMode.value
        savePrevMode(isLightMode.value)
      } else {
        let isLightMode_saveVal = JSON.parse(window.localStorage.getItem("isLightMode"))
        if(isLightMode_saveVal != null) {
          isLightMode.value = isLightMode_saveVal      
        } 
      }
      
      if(isLightMode.value){
        document.querySelector("html").classList.remove("dark-theme")
        document.querySelector("html").classList.add("light-theme")
      } else {
        document.querySelector("html").classList.remove("light-theme")
        document.querySelector("html").classList.add("dark-theme")

      }
    }
    onMounted( () => {
      changeTheme(true)
      axios.get("https://restcountries.eu/rest/v2/all?fields=name;population;flag;capital;region;alpha2Code")
      .then(res => { 
        countryData.value = res.data
        countryData.value[111] = countryData.value[171]
      })
      .catch(err => {console.log(err)})
    })

    return { changeTheme , countryData , isLightMode}
  }
}
</script>

<style lang="scss">
@import "@/shared";
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap');
html , body , #app {
  width: 100%;
  height: fit-content;
}
html {
  min-width: $min-width * 1px;
  height: 100%;

    &.dark-theme {
    background: hsl(207, 26%, 17%);
  }
  &.light-theme {
    background: hsl(0, 0%, 98%);
  }
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Nunito Sans', sans-serif;
}
#app {
  padding-bottom: 5px;
}

</style>
