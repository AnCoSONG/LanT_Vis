<template>
    <div class="select-bar" :class="{ 'opened': opened }" @click="toggle">
        <div class="selected-value serif fw-b fs-m" v-if="selected !== null">{{ DATA[selected].text }}</div>
        <div class="selected-value serif fw-b fs-m placeholder" v-else>请选择</div>
        <div class="arrow">&#9660;</div>
        <div class="selector-options-bar" v-show="opened">
            <div class="upper-triangle"></div>
            <div class="selector-options-list serif fw-r">
                <div
                    class="selector-options-item"
                    :class="{ 'selected': index == selected }"
                    v-for="(item, index) in DATA"
                    @click="select(index, item)"
                    :key="index"
                >
                    <div class="text">{{ item.text }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue'
import { DATA } from '../utils/index'
import id_map from '../assets/map.json'

// 定义如何开启
const opened = ref(false)

const toggle = () => {
    opened.value = !opened.value
}
// 定义数据常量

const emits = defineEmits<{ (e: 'change', payload: any): void }>()
const selected = ref<keyof typeof DATA | null>(null)

const select = (index: string | any, data: any) => {
    selected.value = index
    emits('change', index)
}

defineExpose({
    select
})

</script>
<style scoped lang="scss">
.select-bar {
    width: 100%;
    height: 40px;
    cursor: pointer;
    // background-color: #000;

    border-bottom: 2px solid;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .selected-value {
        margin-bottom: 2px;

        &.placeholder {
            color: #666;
            font-size: 20px;
        }
    }

    .arrow {
        color: #ccc;
        position: absolute;
        right: 2px;
        transition: transform 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    .selector-options-bar {
        // display: none;
        position: absolute;
        width: 200px;
        top: 50px;
        background-color: #fff;
        // background-color: #333;
        padding: 10px 0px;
        box-sizing: border-box;
        border: 2px solid;

        // padding: 5px 10px;

        .upper-triangle {
            border-top: 2px solid;
            border-right: 2px solid;
            background-color: white;
            width: 8px;
            height: 8px;
            position: absolute;
            left: 50%;
            top: -1px;
            transform: translate(-50%, -50%) rotate(-45deg);
        }

        .selector-options-list {
            height: 200px;
            overflow-y: scroll;
            overflow-x: hidden;
            .selector-options-item {
                // border-bottom: 1px solid;
                font-size: 20px;
                padding: 5px 20px;
                cursor: pointer;

                &.selected {
                    background-color: #eee;
                    // border-radius: 4px;
                }

                &:hover {
                    background-color: #e5e5e5;
                }
            }
        }
    }
}

.select-bar.opened {
    .arrow {
        transform: rotate(-180deg);
    }
}
</style>