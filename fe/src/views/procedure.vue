<template>
    <div class="procedure">
        <div class="header">
            <div class="first">
                <div class="line">
                    <div class="home" @click="router.back()">
                        <div class="text fs-r fw-r">HOME</div>
                    </div>
                    <div class="slash fs-l">/</div>
                    <div class="title fw-b">Procedure</div>
                </div>
                <div class="menu-wrapper">
                    <Menu></Menu>
                </div>
            </div>
            <div class="second">
                <div class="noop"></div>
                <div class="desc">
                    <div class="text fs-s fw-r">
                        The whole procedure of human-machine collaboration for calligraphy
                        restoration consists of 4 steps.
                    </div>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="which-char">
                <div class="control-line">
                    <div class="legend">
                        <div class="text fs-r fw-b">CHAR</div>
                    </div>
                    <div class="noop"></div>
                    <div class="selector-wrapper">
                        <Selector @change="(payload) => onChanged(payload)" ref="selector"></Selector>
                    </div>
                </div>
                <div class="origin">
                    <img
                        :src="oriImgUrl"
                        alt
                        style="width:100%; height: 100%;object-fit: contain;"
                        v-if="oriImgUrl !== ''"
                    />
                    <div class="placeholder fs-l serif" v-else>&nbsp;?&nbsp;</div>
                </div>
                <div class="arrow">
                    <div class="text fs-b fs-r">
                        &#9660;
                        <!-- &#8659; -->
                    </div>
                </div>
                <div class="target">
                    <img
                        :src="tgtImgUrl"
                        alt
                        style="width:100%; height: 100%;object-fit: contain;"
                        v-if="tgtImgUrl !== ''"
                    />
                    <div class="placeholder fs-l serif" v-else>&nbsp;?&nbsp;</div>
                </div>
            </div>
            <div class="noop"></div>
            <div class="four-steps">
                <div class="p1">
                    <TitleAndQuote
                        no="1"
                        title="Collection"
                        quote="Distributes cards to the calligraphy master and collect them to get high quality data."
                    />
                    <div class="content">
                        <img :src="cardImgUrl" alt style="height: 100%; object-fit: contain;" />
                    </div>
                </div>
                <div class="p2">
                    <TitleAndQuote
                        no="2"
                        title="Preprocessing"
                        quote="Preprocessing transfer the character into binaray image style, which is easier for processing."
                    />
                    <div class="content">
                        <div
                            class="block"
                            v-for="(item, index) in preprocessingImgUrls"
                            :key="index"
                        >
                            <img :src="item" alt style="object-fit: contain;" />
                        </div>
                    </div>
                </div>
                <div class="p3">
                    <div class="title-quote-wrapper">
                        <div class="functions-title-wrapper">
                            <div class="title serif">
                                <div class="no">3</div>
                                <div class="main-title">Evaluation</div>
                            </div>
                            <div class="functions">
                                <div
                                    class="function-item"
                                    :class="{ active: p3_functions_active == 0 }"
                                    @click="active_exculsively(0b00000)"
                                >Origin</div>
                                <div
                                    class="function-item"
                                    :class="{ active: (p3_functions_active & 0b10000) > 0 }"
                                    @click="active_exculsively(0b10000)"
                                >S1 Eval</div>
                                <div
                                    class="function-item"
                                    :class="{ active: (p3_functions_active & 0b01000) > 0 }"
                                    @click="active_exculsively(0b01000)"
                                >S1 Feature</div>
                                <div
                                    class="function-item"
                                    :class="{ active: (p3_functions_active & 0b00100) > 0 }"
                                    @click="active_exculsively(0b00100)"
                                >S2 Feat</div>
                                <div
                                    class="function-item"
                                    :class="{ active: (p3_functions_active & 0b00010) > 0 }"
                                    @click="active_exculsively(0b00010)"
                                >S3 Eval</div>
                                <div
                                    class="function-item"
                                    :class="{ active: (p3_functions_active & 0b00001) > 0 }"
                                    @click="active_exculsively(0b00001)"
                                >S3 Feature</div>
                            </div>
                        </div>
                        <blockquote
                            class="quote fs-s"
                        >Distributes cards to the calligraphy master and collect them to get high quality data.
                            <ul>
                                <li>S1 Eval means stage 1 evaluation.</li>
                            </ul>
                        </blockquote>
                    </div>
                    <div class="content">
                        <div
                            class="interactive-item"
                            v-for="(item, index) in evaluation_data"
                            :key="index"
                            :class="{ notpassed: get_passed(item), selected: is_selected(item) }"
                        >
                            <img
                                :src="get_which_url_to_be_shown(item)"
                                class="interactive-item-img"
                                v-if="is_img_mode(p3_functions_active)"
                                :class="{
                                    notpassed: get_passed(item)
                                }"
                            />
                            <!-- v-else 展示feat -->
                            <v-chart
                                class="chart chart_s1"
                                :option="buildOption(item, 's1')"
                                :class="{ notpassed: get_passed(item) }"
                                v-else-if="p3_functions_active == 8"
                            />
                            <v-chart
                                class="chart chart_s1"
                                :option="buildOption(item, 's2')"
                                :class="{ notpassed: get_passed(item) }"
                                v-else-if="p3_functions_active == 4"
                            />
                            <v-chart
                                class="chart chart_s1"
                                :option="buildOption(item, 's3')"
                                :class="{ notpassed: get_passed(item) }"
                                v-else-if="p3_functions_active == 1"
                            />
                        </div>
                    </div>
                </div>
                <div class="p4">
                    <TitleAndQuote
                        no="4"
                        title="Results"
                        quote="The following six images are the result of three-stage evaluation."
                    />
                    <div class="content">
                        <div class="block" v-for="(item, index) in best6" :key="index">
                            <img :src="item" style="object-fit:contain;" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer">
            <div class="text fs-b fs-r">INLAB @ 2021</div>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { useRouter, useRoute } from "vue-router";
import { onMounted, ref, reactive } from "vue";
import Menu from 'comps/Menu.vue'
import Selector from 'comps/Selector.vue'
import TitleAndQuote from "comps/TitleAndQuote.vue";
import { getImageUrl, getAssetsUrl } from '../utils/index'
import { DATA } from '../utils/index'
const router = useRouter()
const route = useRoute()
const oriImgUrl = ref('')
const oriOriginUrl = ref('')
const oriS1evalUrl = ref('')
const oriS3evalUrl = ref('')
const tgtImgUrl = ref('')
const cardImgUrl = ref('')
const preprocessingImgUrls = reactive(new Array(48).fill(null))
// const s1_eval
const p3_imgs_pathes = reactive(new Array(48).fill(null))
const evaluation_data = ref<Object>({})
const best6 = reactive(new Array(6).fill(null))

const onChanged = (payload: string | Event) => {
    // 拿到payload对整页数据进行更新
    // console.log(payload)
    const curData = DATA[payload as keyof typeof DATA]
    oriImgUrl.value = curData.ori_url ?? ''
    oriOriginUrl.value = curData.ori_url ?? ''
    oriS1evalUrl.value = curData.s1_url ?? ''
    tgtImgUrl.value = curData.fixed_url ?? ''
    oriS3evalUrl.value = curData.s3_url ?? ''
    cardImgUrl.value = curData.card_url ?? ''
    for (let i = 0; i < 48; i++) {
        preprocessingImgUrls[i] = curData.preprocessing_urls[i]
        p3_imgs_pathes[i] = curData.preprocessing_urls[i]
    }
    evaluation_data.value = curData.evaluation
    // console.log(curData.best6)
    for (let i = 0; i < 6; i++) {
        best6[i] = curData.best6[i]
    }
    // console.log(best6)
}

const selector = ref(null)
type SelectorType = {
    select: (index: string) => void
}
onMounted(() => {
    if (route.query.index && selector.value) {
        console.log(route.query, selector.value);
        (selector.value! as SelectorType).select(route.query.index as string)
    }
})

const p3_functions_active = ref(0b00000)
// 是否显示图像
const is_img_mode = (bin: number) => {
    if (bin == 0 || bin == 16 || bin == 2) {
        return true;
    }
    return false;
}
// 获取当前应该使用的图像url
const get_which_url_to_be_shown = (item: any) => {
    if (p3_functions_active.value == 0) {
        return item.url
    } else if (p3_functions_active.value == 16) {
        return item.s1.feature_url
    } else if (p3_functions_active.value == 2) {
        return item.s3.feature_url
    } else {
        throw new Error('mode error')
    }
}
// 判断当前是否显示模糊效果
const get_passed = (item: any) => {
    // console.log(item.s3)
    if (p3_functions_active.value == 16 || p3_functions_active.value == 8) { // S1 eval or feat
        return !item.s1.passed
    } else if (p3_functions_active.value == 2 || p3_functions_active.value == 1) { // S3 eval or feat
        return !item.s3.passed;
    } else if (p3_functions_active.value == 4) { // S2 eval/feat
        return !item.s2.passed
    }
}
const is_selected = (item: any) => {
    return (p3_functions_active.value == 2 || p3_functions_active.value == 1) && item.selected;
}
const active_exculsively = (bin: number) => {
    // bin 必须为二进制
    p3_functions_active.value = bin
    // 模式为00000, 10000, 00010时，需要显示图片
    const img_mode = is_img_mode(bin)
    if (img_mode) {
        if (bin == 0) { // Origin
            oriImgUrl.value = oriOriginUrl.value
        } else if (bin == 16) { // S1 Eval
            oriImgUrl.value = oriS1evalUrl.value
        } else if (bin == 2) { // S3 Eval
            oriImgUrl.value = oriS3evalUrl.value;
        }
    } else {
        // 显示可视化时
        oriImgUrl.value = oriOriginUrl.value;
    }

}

const buildOption = (item: any, type: string) => {
    // console.log(item.s1.vis.ori)
    if (type == 's1') { // S1 eval
        return {
            legend: {
                data: ['Origin', 'Current']
            },
            xAxis: {
                type: 'category',
                data: new Array(20).fill(0).map((i, id) => id + 1)
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Origin',
                    data: item.s1.vis.ori,
                    type: 'line',
                    smooth: true,
                },
                {
                    name: 'Current',
                    data: item.s1.vis.cur,
                    type: 'line',
                    smooth: true
                }
            ]
        }
    } else if (type == 's2') { // S2 eval
        return {
            legend: {
                data: ['Current']
            },
            xAxis: {
                type: 'category',
                data: new Array(4).fill(0).map((i, id) => id + 1)
            },
            yAxis: {
                type: 'value',
                max: 150,
                min: 0
            },
            series: [
                {
                    name: 'Current',
                    data: item.s2.vis.cur,
                    type: 'bar',
                    smooth: true
                }
            ]
        }
    } else if (type == 's3') { // S3 eval
        return {
            legend: {
                data: ['Origin', 'Current']
            },
            radar: {
                indicator: [
                    { name: '', max: 500 },
                    { name: '', max: 500 },
                    { name: '', max: 500 },
                    { name: '', max: 500 },
                    { name: '', max: 500 },
                    { name: '', max: 500 }
                ]
            },
            series: [
                {
                    name: 'Origin vs Current',
                    data: [
                        {
                            value: item.s3.vis.ori,
                            name: 'Origin',
                        },
                        {
                            value: item.s3.vis.cur,
                            name: 'Current',
                        }
                    ],
                    type: 'radar',
                },
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.header {
    margin-top: 60px;
    width: 100%;

    .first,
    .second {
        display: flex;
        flex-flow: nowrap row;
        justify-content: space-between;
        align-items: center;
    }

    .first {
        .line {
            width: 90vw;
            display: flex;
            flex-flow: nowrap row;
            justify-content: flex-start;
            align-items: center;
            .home {
                background-color: black;
                position: relative;
                height: 50px;
                width: 300px;
                color: white;
                display: flex;
                flex-flow: nowrap column;
                justify-content: center;
                align-items: center;

                &:hover {
                    cursor: pointer;
                }

                &::after {
                    content: "";
                    position: absolute;
                    left: 4px;
                    right: 4px;
                    bottom: 4px;
                    height: 4px;
                    background-color: white;
                }

                .text {
                    font-family: DINCondensed-Bold;
                }
            }

            .slash {
                // color: #aaa;
                width: 50px;
                text-align: center;
            }
            .title {
                font-size: 64px;
            }
        }
        .menu-wrapper {
            flex: 1;
        }
    }

    .second {
        width: 90vw;
        margin-top: 20px;
        .noop {
            width: 350px;
        }

        .desc {
            border: 2px solid #000;
            height: auto;
            flex: 1;
            padding: 20px 40px;

            .text {
                word-break: break-all;
            }
        }
    }
}
.main {
    margin-top: 60px;
    width: 100%;
    display: flex;
    flex-flow: nowrap row;
    justify-content: space-between;
    align-items: flex-start;
    height: auto;

    .which-char {
        position: sticky;
        top: 0px;
        // background-color: #aaa;
        // height: 600px;
        width: 300px;

        .control-line {
            display: flex;
            flex-flow: nowrap row;
            justify-content: space-between;
            align-items: flex-start;
            background-color: #fff;

            .legend {
                background-color: #000;
                height: 40px;
                flex: 1;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .noop {
                height: 100%;
                background-color: #fff;
                width: 15px;
            }

            .selector-wrapper {
                flex: 1;
            }
        }

        .origin,
        .target {
            margin-top: 30px;
            margin-left: 30px;
            width: 270px;
            height: 270px;
            box-sizing: border-box;
            border: 2px solid;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .arrow {
            margin-top: 30px;
            display: flex;
            flex-flow: nowrap row;
            justify-content: center;
            align-items: center;
            width: 270px;
            margin-left: 30px;
        }

        .target {
            margin-top: 30px;
        }
    }

    .noop {
        width: 50px;
        height: 100%;
    }

    .four-steps {
        flex: 1;
        // height: 2000px;
        // background-color: #ccc;

        .p1 {
            margin-bottom: 30px;

            .content {
                width: 100%;
                height: 300px;
                overflow-x: auto;
                overflow-y: hidden;
            }
        }

        .p2 {
            margin-bottom: 30px;
            .content {
                width: calc(100vw - 350px);
                height: 200px;
                overflow-x: auto;
                overflow-y: hidden;
                display: flex;
                flex-flow: nowrap row;
                justify-content: flex-start;
                align-items: center;
                background-color: #eee;

                .block {
                    width: 150px;
                    height: 150px;
                    margin-left: 20px;
                    // margin-right: 10px;
                    border: 2px solid;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #fff;
                    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);

                    img {
                        width: 146px;
                        height: 146px;
                    }

                    &:last-child {
                        margin-right: 20px;
                    }
                }
            }
        }

        .p3 {
            margin-bottom: 30px;

            .title-quote-wrapper {
                width: calc(90vw - 350px);

                height: auto;
                position: relative;
                display: flex;
                flex-flow: nowrap column;
                justify-content: flex-start;
                align-items: flex-start;

                .functions-title-wrapper {
                    width: 100%;
                    display: flex;
                    flex-flow: nowrap row;
                    justify-content: space-between;
                    align-items: center;
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

                    .functions {
                        margin-bottom: -5px;
                        display: flex;
                        flex-flow: nowrap row;
                        justify-content: flex-end;
                        align-items: center;

                        .function-item {
                            width: auto;
                            height: auto;
                            border: 1px dashed;
                            cursor: pointer;
                            user-select: none;
                            position: relative;
                            margin-left: 30px;
                            font-size: 16px;
                            padding: 5px 15px;
                            box-sizing: border-box;
                            z-index: 1;
                            transition: box-shadow 0.3s ease-in-out;

                            &:hover {
                                box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
                            }

                            &.active {
                                border-style: solid;
                                box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
                            }
                        }
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

            .content {
                width: calc(90vw - 350px);
                // height: 1000px;
                display: flex;
                flex-flow: wrap row;
                justify-content: flex-start;
                align-items: flex-start;
                box-sizing: border-box;

                .interactive-item {
                    width: calc((90vw - 350px - 3 * 20px) / 4);
                    height: calc((90vw - 350px - 3 * 20px) / 4);
                    // background-color: #aaa;
                    border: 2px solid #eee;
                    margin-right: 20px;
                    margin-bottom: 20px;
                    box-sizing: border-box;
                    position: relative;
                    &:nth-child(4n) {
                        margin-right: 0px;
                    }
                    transition: border-style 0.3s ease-in-out;

                    @media screen and (max-width: 1200px) {
                        width: calc((90vw - 350px - 1 * 20px) / 2);
                        height: calc((90vw - 350px - 1 * 20px) / 2);
                        &:nth-child(2n) {
                            margin-right: 0px !important;
                        }

                        &:nth-child(4n) {
                            margin-right: 20px;
                        }
                    }

                    &.notpassed {
                        // display: none;
                        border-style: dashed;
                    }
                    &.selected {
                        border-color: black;
                        box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.1);
                    }

                    .interactive-item-img {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                        transition: filter 0.3s ease-in-out;
                        &.notpassed {
                            filter: opacity(0.2) blur(4px);
                        }
                    }

                    .chart {
                        width: 100%;
                        height: 100%;
                        transition: filter 0.3s ease-in-out;

                        &.notpassed {
                            filter: opacity(0.5) blur(2px);
                        }
                    }
                }
            }
        }

        .p4 {
            .content {
                width: calc(100vw - 350px);
                height: 200px;
                overflow-x: auto;
                overflow-y: hidden;
                display: flex;
                flex-flow: nowrap row;
                justify-content: flex-start;
                align-items: center;
                background-color: #eee;

                .block {
                    height: 150px;
                    width: 150px;
                    border: 2px solid;
                    box-sizing: border-box;
                    margin-left: 20px;
                    // margin-right: 10px;
                    background-color: #fff;
                    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.2);

                    img {
                        width: 146px;
                        height: 146px;
                    }

                    &:last-child {
                        margin-right: 20px;
                    }
                }
            }
        }
    }
}

.footer {
    margin-top: 100px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000;
    height: 300px;
    color: white;
}
</style>