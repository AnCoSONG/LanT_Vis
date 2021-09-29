<template>
    <div class="menu">
        <div class="menu-line"></div>
        <div class="menu-line"></div>
        <div class="menu-line"></div>
    </div>
</template>
<script setup lang='ts'>

</script>
<style scoped lang="scss">
.menu {
    margin-top: 4px;
    width: 32px;
    height: min-content;

    .menu-line {
        width: 32px;
        height: 4px;
        background-color: black;
        margin-bottom: 6px;
        transition: all 0.3s ease-in-out;
        &:last-child {
            margin-bottom: 0px;
        }
    }

    &:hover {
        cursor: pointer;
        .menu-line {
            transform: translateY(-2px);
            box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.1);
            // cursor: pointer;
        }
    }
}
</style>