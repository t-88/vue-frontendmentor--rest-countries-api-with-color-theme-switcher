<template>
    <div class="FilterBox-comp comp">
        <div class="drop-menu" @click="toggleFilterBoxVis()">
            <p class="title">Filter by Region</p>
            <SvgMananger name="arrow" :_class="['arrow-icon',{'icon-dark': !isLightMode,'rotated': isFiltersVisible}]" />
        </div>
        <div ref="el_filterBox" :class="['filters']">
            <p  v-for="filter in filters" :key="filter" :class="{'selected-filter' : currFilter == filter}"  @click="selectFilter(filter)">
                {{ filter }}
            </p>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import animejs from "animejs"

import SvgMananger from "@/components/SvgMananger"
export default {
    name: "FilterBox",
    components: {
        SvgMananger,
    }, 
    props: {
        isLightMode: Boolean,
    },
    setup(props,{ emit }) {
        const filtersHandler = () => {
            const selectFilter = (filter) => {
                currFilter.value = currFilter.value == filter ? "" : filter
                emit("select-filter",currFilter.value)
            }
            const filters = ["Africa","Americas","Asia","Europe","Oceania"]
            const currFilter = ref("")
            
            return { filters , currFilter , selectFilter}
        }
        const animationHandler = () => {
            const sharedSetting = {
                duration: 200,
                easing: 'linear',
            }
            const show = () => {
                el_filterBox.value.style.display = "flex"
                animejs({
                    targets: el_filterBox.value,
                    ...sharedSetting,
                    opacity: [0,1],
                    complete: () => {
                        el_filterBox.value.style.opacity = "1"
                        el_filterBox.value.style.zIndex = "10"
                    }
                })
            }
            const hide = () => {
                animejs({
                    targets: el_filterBox.value,
                    ...sharedSetting,
                    opacity: [1,0],
                    complete: () => {
                        el_filterBox.value.style.opacity = "0"
                        el_filterBox.value.style.display = "none"
                    }
                })
            }            
            const toggleFilterBoxVis = () => {
                if(isFiltersVisible.value) { hide() }
                else { show() }
                isFiltersVisible.value = !isFiltersVisible.value
            }
            const el_filterBox = ref(null)
            const isFiltersVisible = ref(false)

            return { el_filterBox , isFiltersVisible , toggleFilterBoxVis }
        }
        const { filters , currFilter , selectFilter} = filtersHandler()
        const { el_filterBox , toggleFilterBoxVis , isFiltersVisible} = animationHandler()
        
        return {    
                    filters , currFilter ,  selectFilter, 
                    isFiltersVisible , el_filterBox , toggleFilterBoxVis
                }
    },
}
</script>

<style lang="scss" scoped>
@import "@/shared";
.FilterBox-comp {
    border-radius: 5px;
    position: relative;
    width: 216px;
    .drop-menu {
        display: flex;
        align-items: center;
        cursor: pointer;
        border-radius: 5px;
        padding: 20px 20px;
        gap: 50px;
        width: inherit;
        .title {
            display: inline-block;
            font-weight: 600;
        }
    }
    .filters {
        display: flex;        
        flex-direction: column;
        position: absolute;
        display: none;

        background: inherit;
        border-radius: inherit;
        width: inherit;

        transform: translateY(5px);
        gap: 10px;
        padding: 20px;        
        p {
            width: fit-content;
            &:hover {
                font-weight: 600;
                cursor: pointer;
            }
        }
        .selected-filter {
            font-weight: 800;
            text-decoration: underline;
            &:hover {
                font-weight: 800;
            }
        }
    }  
}

</style>