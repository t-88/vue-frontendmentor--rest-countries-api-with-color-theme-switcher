<template>
    <div :class="['Country-view',{'light-theme': isLightMode,'dark-theme': !isLightMode}]">
        <div class="go-back comp" @click="$router.go(-1)">
            <SvgMananger name="back-arrow" :_class="['back-arrow',{'icon-dark': !isLightMode}]"/>
            <p>Back</p>
        </div>
        <div class="country-section" v-if="data">
            <img :src="data.flag" :alt="data.name">
            <div class="text" v-if="data != null">
                <h1 class="name">{{ data.name }}</h1>
                <div class="info" >
                    <section class="left">
                        <TextField field="Native Name:" :val="data.nativeName" errorVal="unknown native name"/>
                        <TextField field="Population:" :val="parseNumber(data.population)" errorVal="unknown population"/>
                        <TextField field="Region:" :val="data.region" errorVal="unknown region"/>
                        <TextField field="Sub Region:" :val="data.region" errorVal="unknown subregion"/>
                        <TextField field="Capital:" :val="data.capital" errorVal="unknown capital"/>                      
                    </section>
                    <section class="right">
                        <TextField field="Top Level Domain:" :val="data.topLevelDomain[0]" errorVal="unknown top level domain"/>
                        <TextField field="Currencies:" :val="data.currencies.map(currency => currency.name).join(', ')" errorVal="unknown currency"/>
                        <TextField field="Languages:" :val="data.languages.map(lang => lang.name).join(', ')" errorVal="unknown languages"/>
                    </section>
                </div>
                <div class="border-countries" v-if="borderCountries">
                    <p class="field">Border Countries:</p>
                    <div class="container" v-if="borderCountries.length > 0">
                        <RouterLink :to="{name : 'country', query:{name : country} }" v-for="country in borderCountries" :key="country">
                            <TextBlock :class="{'TextBlock-dark': !isLightMode}" :text="country"/>
                        </RouterLink>
                    </div>
                    <div class="container" v-if="borderCountries.length == 0"><p>unknown border countries</p></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref, watch } from "vue"
import { useRoute } from "vue-router"
import { parseNumber } from "@/MultiUse"
import axios from 'axios'

import SvgMananger from "@/components/SvgMananger"
import TextField from "@/components/ui/TextField"
import TextBlock from "@/components/ui/TextBlock"
export default {
    name: "",
    components: {
        SvgMananger,
        TextField,
        TextBlock,
    },
    props: {
        isLightMode: Boolean,
        countryData: Array
    },
    setup() {
        const requestCountryData = (country_name) => {
            if(!country_name) { return }
            if(country_name.toLocaleLowerCase() == "israel") {  country_name = "Palestine, State of" }
            axios.get(`https://restcountries.eu/rest/v2/name/${country_name}?fields=${requestData.join(";")}`)
            .then( res => {
                data.value = res.data[0]
                if(!data.value.borders.length) { return }
                axios.get(`https://restcountries.eu/rest/v2/alpha?codes=${data.value.borders.join(";")}`)
                .then( res => {borderCountries.value = res.data.map(country => country.name)} )
                .catch(err => console.log("[request error border countries] ",err))
                
            })
            .catch(err => console.log("[request error country view] ",err))
        }
        onMounted(() => {
            requestCountryData(route.query.name) 
        })
        const requestData = ["name","nativeName","flag","population","region","subregion","capital","topLevelDomain","languages","currencies","borders"]
        const route = useRoute()
        watch(route,() => {
            requestCountryData(route.query.name)
        })
        const data = ref(null)
        const borderCountries = ref(null)

        return { data , parseNumber ,borderCountries }
    },
}
</script>

<style lang="scss" scoped>
@import "@/shared";
.dark-theme {
    * {
        color: $dark-theme-text;
        text-decoration: none;
    }
    .comp {
        background: $dark-theme-element;
        box-shadow: #00000026 0 0px 10px 1px;
        &:hover {
            background: lighten($dark-theme-element,.75);
        }
        &:active {
            background: lighten($dark-theme-element,1.5);
        }
    }

}
.light-theme {
    * {
        color: $light-theme-text;
        text-decoration: none;
    }
    .comp {
        background: $light-theme-element;
        box-shadow: #00000026 0 0px 10px 1px;
        &:active {
            background: #f3f3f3;
        }
    }
}
.Country-view {
    display: flex;
    flex-direction: column;
    .go-back {
        width: fit-content;
        display: flex;
        align-items: center;
        padding: 10px 40px 10px 30px;
        gap: 15px;
        border-radius: 5px;
        cursor: pointer;
        p {
            display: inline-block;
            font-size: 17px;
            font-weight: 300;
        }
    }
    .country-section {
        display: flex;
        img {
            align-self: flex-start;
            box-shadow: #00000026 0 0 10px 2px;
        }
        .text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            .info {
                display: flex;
                .left,.right {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }
            }
        }
        
        .border-countries {
            display: flex;
            gap: 10px;
            .field {
                font-weight: 600;
            }
            .container {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }
        }
    }
}
</style>
<style lang="scss">
.back-arrow {
    width: 18px;
    transform: rotate(180deg);
    &.icon-dark path{
        fill: white;
    }
}
</style>
<style lang="scss">
@import "@/shared";
.Country-view {
    @include media(">900px") {
        padding: 50px  applyMath(90,40,$pc,900) 50px applyMath(90,40,$pc,900);
        font-size: applyMath(18,13,$pc,900);
        gap: applyMath(80,40,$pc,900);
        .country-section {
            gap: applyMath(150,40,$pc,900);;
            img {
                width: applyMath(700,420,$pc,900) ;
            } 
            .text {
                gap: applyMath(40,20,$pc,900);
                .info {
                    gap: applyMath(150,60,$pc,900);
                    padding-bottom: applyMath(50,10,$pc,900);
                }
            }
        }
        .border-countries {
            .field { 
                width: applyMath(180,280,$pc,900);        
            }
        }
    }
    @include media("<=900px",">320px") {
        padding:  applyMath(50,30,900,320) applyMath(53,15,900,320);
        gap: applyMath(60,45,900,320);
        .go-back {
            padding: 10px applyMath(40,35,900,320) 10px applyMath(30,25,900,320) !important;
            gap: applyMath(15,10,900,320) !important;
            p {
                font-size: applyMath(17,14,900,320) !important;
            }
        }
        .back-arrow {
            width: applyMath(18,14,900,320);
        }
        .country-section {
            gap: applyMath(40,30,900,500);

            .text {
                gap: 30px;
                .name {
                    align-self: center;
                    font-size: applyMath(40,30,900,320);
                }
                .info {
                    @include media(">450px") {
                        gap: applyMath(240,55,900,500);
                    }
                    font-size: applyMath(18,13,900,320);
                    padding-bottom: applyMath(30,0,900,320);   
                }
            }
        }
        .TextBlock-comp{
            font-size: applyMath(16,14,900,320);
        }
    }    
    @include media("<=900px") {
        .country-section {
            flex-direction: column;
            img {
                width: 100%;
                margin: auto;
            }
            .text {
                justify-content: center;
                .name {
                    @include media("<=450px") {
                        align-self: flex-start;    
                    }
                }                
                .info {
                    justify-content: center;
                    @include media("<=450px") {
                        flex-direction: column;
                        gap: 30px;
                    }
                }

            }
        }
        .border-countries {
            flex-direction: column;
            font-size: 17px;
        }
        
    }
    @include media("<=320px") {
        padding:  30px 15px;
        gap: 45px;
        .go-back {
            padding: 10px 35px 10px 25px !important;
            gap: 10px !important;
            p {
                font-size: 14px !important;
            }
        }
        .back-arrow {
            width: 14px;
        }
        .country-section {
            gap: 30px;

            .text {
                gap: 30px;
                .name {
                    font-size: 30px;
                }
                .info {
                    @include media(">450px") {
                        gap: 55px;
                    }
                    font-size: 13px;
                    padding-bottom: 0px;   
                    @include media("<=450px") {
                        gap: 30px;
                    }                 
                }
            }
        }
        .TextBlock-comp{
            font-size: 14px;
        }
    }

}
</style>
