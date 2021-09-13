<template>
    <p class="TextField-comp">
        {{ field }}
        <span> {{ val != "" ? val : errorVal }} </span>
    </p>
</template>

<script>
export default {
    name: "TextField",
    props: {
        field: String,
        val: [String , Number],
        errorVal: String
    },
}
</script>

<style lang="scss" scoped>
.TextField-comp {
    font-weight: 600;
    span {
        font-weight: 300;
    }
}
</style>