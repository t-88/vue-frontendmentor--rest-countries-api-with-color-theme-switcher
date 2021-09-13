<template>
    <div :class="['SearchBox-comp comp',{'light': isLightMode,'dark': !isLightMode}]">
        <SvgMananger name="search" :_class="['search-icon',{'icon-dark': !isLightMode }]"/>
        <input type="text" placeholder="Search for country..." v-model="shearchVal">
    </div>
</template>

<script>
import { ref , watch } from 'vue'
import SvgMananger from "@/components/SvgMananger"
export default {
    name: "SearchBox",
    components: {
        SvgMananger,
    },
    props: {
        isLightMode: Boolean,
    },
    setup(props,{ emit }) {
        const shearchVal = ref("")
        watch(shearchVal, () => {
            emit("shearch",shearchVal.value)
        })
        return { shearchVal }
    },
}
</script>

<style lang="scss" scoped>
@import "@/shared";
.dark {
    background: hsl(209, 23%, 22%);
    input {
        background: inherit;
    }
}
.light {
    background: white;
    ::placeholder {
        color: hsl(0, 0%, 52%);
    }
}
.SearchBox-comp {
    height: fit-content;
    display: flex;
    width: 350px;
    gap: 20px;
    padding: 20px 25px;
    border-radius: 5px;

    input {
        border: transparent;
        outline: none;
        width: 100%;
        font-weight: 600;
        font-size: 16px;
    }
}
</style>