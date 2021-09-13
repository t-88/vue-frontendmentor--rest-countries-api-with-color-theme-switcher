<template>
    <p class="TextBlock-comp"> {{ text }} </p>
</template>

<script>
export default {
    name: "TextBlock",
    props: {
        text: String
    }
}
</script>

<style lang="scss" scoped>
.TextBlock-comp {
    align-self: center;
    width: fit-content;
    padding: 5px 20px;
    background: white;
    border-radius: 5px;
    font-weight: 300 !important;
      box-shadow: #00000026 0px 0px 7px 0px;
}
.TextBlock-dark {
    background: #2b3945;
}
</style>