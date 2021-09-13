<template>
    <div id="Header-comp" :class="{'header-light-theme': isLightMode, 'header-dark-theme': !isLightMode}">
        <RouterLink :to="{name: 'home'}" class="title comp">
            <h1>Where in the world?</h1>
        </RouterLink>
        <div @click="toggelTheme"  @mouseenter="mouseEnterEffect"  @mouseleave="mouseLeaveEffect" :class="`toggle-theme comp ${mouseHoverEffect}-effect`" >
            <SvgManager v-if="mouseHoverEffect == ''" :name="isLightMode == true ? 'moon-light' : 'moon-dark'" _class="moon-icon"/>
            <SvgManager v-if="mouseHoverEffect != ''" :name="mouseHoverEffect == 'light' ? 'moon-light' : 'moon-dark'" _class="moon-icon"/>
            <p>Dark Mode</p>
        </div>
    </div>
</template>

<script>
import { ref } from "vue"
import SvgManager from "@/components/SvgMananger"
export default {
    name: "Header",
    components: {
        SvgManager,
    },
    props: {
        isLightMode: Boolean,
    },
    setup(props,{emit}) {
        const mouseHoverEffect = ref('')
        const toggelTheme = () => {
            mouseLeaveEffect()
            emit('is-light-mode')
        }
        const mouseEnterEffect = () => { mouseHoverEffect.value = props.isLightMode == true ? "dark" : "light" }
        const mouseLeaveEffect = () => { mouseHoverEffect.value = '' }
    
        return { toggelTheme , mouseHoverEffect , mouseEnterEffect , mouseLeaveEffect}
    },
}
</script>

<style lang="scss">
@import "@/shared";
.header-dark-theme {   
    background: $dark-theme-element;
    * {
        color: white;
    } 
    .light-effect {
        background: $light-theme-bg;
        p { color: $light-theme-text; }
    }  
}
.header-light-theme {
    background: $light-theme-element;
    * {
        color: $light-theme-text
    }
    .dark-effect {
        background: $dark-theme-bg;
        p { color: $dark-theme-text;}
    }
}


#Header-comp {
    display: flex;
    align-items: center;
    justify-content: space-between;
    @include box-shadow;
    .title {
        text-decoration: none;
        h1 {
            font-size: 26px;
        }
    }
    .toggle-theme {
        display: flex;
        align-items: center;
        cursor: pointer;
        gap: 10px;
        font-size: 16px;
        font-weight: 900;
        padding: 5px 10px;
        border-radius: 5px;
    }
}
</style>
<style lang="scss">
.moon-icon {
    height: 18px;
    width: 18px;    
}
</style>

<style lang="scss">
@import "@/shared";
#Header-comp {
    padding: 20px mathFromPcToTablet(90,50);
    @include media("<=tablet",">phone"){
        padding: 20px mathFromTabletToPhone(40,30);
    }
    @include media("<=phone",">min-width"){
        padding: 20px mathFromPhoneToMinWidth(30,10);
        .title h1 {
            font-size: mathFromPhoneToMinWidth(20,16);
        }
        .toggle-theme{
            font-size: mathFromPhoneToMinWidth(16,12);
            gap: mathFromPhoneToMinWidth(10,7);
            .moon-icon {
                width: mathFromPhoneToMinWidth(18,15);
                height: mathFromPhoneToMinWidth(18,15);
            }
        }
    }
    @include media("<=min-width"){
        padding: 20px 10px;
        .title h1 {
            font-size: 16px;
        }
        .toggle-theme{
            font-size: 12px;
            gap: 7px;
            .moon-icon {
                width: 15px;
                height: 15px;
            }
        }    
    }
}
</style>
