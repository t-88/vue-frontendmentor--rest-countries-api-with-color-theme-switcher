<template>
  <RouterLink :to="{name: 'country', query:{ name: country.name } }"  :class="['CountryCard-comp comp',isLightMode == true ? 'light' : 'dark']"> 
        <div class="img-container">
            <img :src="country.flag" :alt="country.name">
        </div>
        <div class="text">
            <TextField class="name" :val="country.name" erroeVal="unknown name"/>
            <div class="info">
                <TextField field="Population:" :val="parseNumber(country.population)" erroeVal="unknown population"/>
                <TextField field="Region:" :val="country.region" erroeVal="unknown region"/>
                <TextField field="Capital:" :val="country.capital" erroeVal="unknown capital"/>
            </div> 
        </div>
  </RouterLink>
</template>

<script>
import TextField from "@/components/ui/TextField"
import { parseNumber } from "@/MultiUse"
export default {
    name: "CountyCard",
    components: {
        TextField
    },
    props: {
        country: Object,
        isLightMode: Boolean,
    },
    setup() {
        return { parseNumber }
    },
}
</script>

<style lang="scss">
@import "@/shared";
.dark {
    background: hsl(209, 23%, 22%);
    color:white;
}
.light {
    background: white;
    color: hsl(200, 15%, 8%);
}
.CountryCard-comp {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    width: 345px;
    padding-bottom: 45px;
    border-radius: 5px;
    gap: 20px;
    .img-container {
        width: inherit;
        height: 230px;
        overflow: hidden;
        border-radius: 5px 5px  0 0;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    &:hover {
        transition: .05s;
        transform: scale(1.03);
    }
    .text {
        padding-left: 20px;
        gap: 20px;
        display: flex;
        flex-direction: column;
        p { width: fit-content; }
        .name {
            font-size: 20px;
            span {
                font-weight: 800;
                font-size: 23px;
            }
        }
        .info {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
    }
}
</style>