<template>
    <div class="title-quote-wrapper">
        <div class="title serif">
            <div class="no">{{no}}</div>
            <div class="main-title">{{title}}</div>
        </div>
        <blockquote class="quote fs-s">
            {{quote}}
        </blockquote>
    </div>
</template>
<script setup lang='ts'>
defineProps<{no: string, title: string, quote: string}>()
</script>
<style scoped lang="scss">
.title-quote-wrapper {
    width: calc(90vw - 350px);
    height: auto;
    position: relative;
    display: flex;
    flex-flow: nowrap column;
    justify-content: flex-start;
    align-items: flex-start;

    .title {
        font-size: 40px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;

        .no {
            margin-right: 20px;
        }
    }

    .quote {
        color: #646464;
        line-height: 30px;
        position: relative;
        margin: 20px 0;
        padding-left: 20px;

        border-left: 3px solid #d3d3d3;
        word-break: break-all;
        &:before {
            content: "";
            position: relative;
            left: 0px;
            top: 0px;
            bottom: 0px;
            width: 20px;
            
        }
    }
}
</style>