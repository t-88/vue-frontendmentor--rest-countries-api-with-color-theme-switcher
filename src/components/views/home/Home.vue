<template>
    <div id="Home-view" :class="[isLightMode == true ? 'home-light-theme' : 'home-dark-theme']">
        <div class="options">
            <SearchBox :isLightMode="isLightMode" @shearch="shearchCountrys"/>
            <FilterBox :isLightMode="isLightMode" @select-filter="filterCountrys"/>
        </div>
        <div class="countries">
            <div class="countries">
                <CountyCard v-for="country in countryData" :key="country.name" v-show="filteredCountrys.includes(country)"
                                :country="country" :isLightMode="isLightMode"/>            
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref, watch } from "vue"

import SearchBox from "./SearchBox"
import FilterBox from "./FilterBox"
import CountyCard from "./CountyCard"
export default {
    name: "Home",
    components: {
        SearchBox,
        FilterBox,
        CountyCard,
    },
    props: {
        isLightMode: Boolean,
        countryData: Array
        
    },
    setup(props) {
        const filteredCountrys = ref([])
       watch(() => props.countryData, val => {
           filteredCountrys.value = val
       })
       onMounted(() => {
           if(props.countryData) {
               filteredCountrys.value = props.countryData
           }
       })
       
        const filterCountrys = (filter) => {
            filteredCountrys.value = props.countryData.filter( country => {
                if (filter == "") { return true }
                return country.region == filter
            })
        }
        const shearchCountrys = (shearchVal) => {
            if(shearchVal == "") {
                filteredCountrys.value = props.countryData
                return 
            }
            filteredCountrys.value = props.countryData.filter( country => {
                return country.name.toLocaleLowerCase().includes(shearchVal.toLocaleLowerCase())
            })
        }


        return { filteredCountrys, filterCountrys, shearchCountrys}        
    },
}
</script>

<style lang="scss">
@import "@/shared";
.home-dark-theme {
    * {
        color: $dark-theme-text;
    }
    .comp {
        background: $dark-theme-element;
        &.FilterBox-comp .drop-menu {
            &:hover {
                background: lighten($dark-theme-element,.75);
            }
            &:active {
                background: lighten($dark-theme-element,1.5);
            }
        }
    }
    ::placeholder {
        color: rgb(190, 190, 190);
    }
}
.home-light-theme {
    * {
        color: $light-theme-text;
    }
    .comp {
        background: $light-theme-element;
        &.FilterBox-comp .drop-menu {
            &:active {
                background: #f3f3f3;
            }
        }
    }
}
#Home-view {
    width: 100%;
    height: 100%;
    
    .options {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 50px;
    }
    .countries {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        row-gap: 60px;
        column-gap: 80px;
        .country-list {
            display: flex;
            flex-direction: column;
            gap: 60px
        }
    }
    .comp {
        @include box-shadow;
        &.CountryCard-comp {
            box-shadow: #0000001a 0 0px 10px 5px;
        }
    }
}
</style>


<style lang="scss">
@import "@/shared";
.icon-dark path{ fill: white; }
.search-icon {
    height: 20px;
    width: 20px;
}
.arrow-icon {
    height: 12px;
    transition: $filter-element-animation-speed;
    &.rotated {
        transform: rotate(180deg);
    }
}
</style>

<style lang="scss">
@import "@/shared";
#Home-view {
    padding: mathFromPcToTablet(70,40) mathFromPcToTablet(90,50);
    @include media("<=tablet",">phone") {
        padding: mathFromPcToTablet(40,35) mathFromPcToTablet(50,30);
        .options {
            .SearchBox-comp {
                width: mathFromTabletToPhone(350,240);
                padding: mathFromTabletToPhone(20,15) 
                        mathFromTabletToPhone(25,20);
                gap: mathFromTabletToPhone(20,15);
                .search-icon {
                    height: mathFromTabletToPhone(20,15);
                    width: mathFromTabletToPhone(20,15);
                }
            }
            .FilterBox-comp .drop-menu{
                    padding: mathFromTabletToPhone(20,15) 
                            mathFromTabletToPhone(20,20);
            }
        }
        @include media(">695px") {
            .countries {
                column-gap: applyMath(80,30,$tablet,695);
                row-gap: applyMath(60,40,$tablet,695);
            }
        }
    }
    @include media("<=phone") {
        @include media(">min-width") {
            padding: mathFromPhoneToMinWidth(35,30) mathFromPhoneToMinWidth(30,10);
        }
        .options {
            flex-direction: column;
            align-items: flex-start;
            gap: 40px;
            padding-bottom: 40px;

            .SearchBox-comp {               
                width: 100%;
                padding: mathFromPhoneToMinWidth(20,15) 20px;                
                .text {
                    font-size: mathFromPhoneToMinWidth(17,16);
                }
            }
            .FilterBox-comp {
                width: 220px;
                .drop-menu {
                    justify-content: space-between;
                    padding:  mathFromPhoneToMinWidth(20,15) 20px;                
                    .title {
                        font-weight: 300;
                    }
                }
            }
        }
    }
    @include media("<=min-width") {
        padding: 30px 10px;

        .options {
            .SearchBox-comp {               
                padding: 15px 20px;                
                .text {
                    font-size: 16px;
                }
            }
            .FilterBox-comp .drop-menu {
                padding: 15px 20px;                
            }
        }
        .countries {
            padding: 30px 10px;
            row-gap: 35px;
        }
    }
    .countries {
        @include media("<=695px") {
            padding: 0;
            row-gap: applyMath(50,35,695,$min-width);
        }
    }

    .CountryCard-comp {
        width: mathFromPcToTablet(345,310);
        @include media("<=tablet",">695px") {
            width: applyMath(309,285,$tablet,695);
        }
    }
}
</style>