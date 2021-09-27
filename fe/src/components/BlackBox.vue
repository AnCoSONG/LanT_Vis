<template>
    <div class="black-box" :class="hasLine ? 'btml': ''">
        <div class="text">
            <slot />
        </div>
    </div>
</template>
<script setup lang='ts'>
import { toRef } from 'vue'
const props = defineProps({
    hasLine: Boolean
})
const hasLine = toRef(props, 'hasLine')
</script>
<style lang="scss" scoped>
.black-box {
    background-color: #000;
    height: 100%;
    width: 10vw;
    max-width: 200px;
    max-height: 40px;
    position: relative;
    box-sizing: border-box;
    margin-right: 15px;
    // margin-bottom: -2px;

    &.btml::after {
        content: "";
        width: 94%;
        height: 3px;
        background-color: white;
        position: absolute;
        bottom: 4px;
        left: 2.4%;
    }

    .text {
        font-family: DINCondensed-Bold;
        font-size: 20px;
        color: #ffffff;
        letter-spacing: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>