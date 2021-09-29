<template>
    <div class="procedure">
        <div class="header">
            <div class="first">
                <div class="line">
                    <div class="home" @click="route.back()">
                        <div class="text fs-r fw-r">HOME</div>
                    </div>
                    <div class="slash fs-l">/</div>
                    <div class="title fw-b">Procedure</div>
                </div>
                <div class="menu">
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
                        <Selector @change="(payload) => onChanged(payload)"></Selector>
                    </div>

                </div>
                <div class="origin"></div>
                <div class="arrow">
                    <div class="text fs-b fs-r">
                        &#9660;
                        <!-- &#8659; -->
                    </div>
                </div>
                <div class="selected-target"></div>
            </div>
            <div class="noop"></div>
            <div class="four-steps"></div>
        </div>

        <div class="footer">
            <div class="text fs-b fs-r">INLAB @ 2021</div>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { useRouter } from "vue-router";
import Menu from 'comps/Menu.vue'
import Selector from 'comps/Selector.vue'
const route = useRouter()


const onChanged = (payload:any) => {
    console.log(payload)
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
        .menu {
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
        .selected-target {
            margin-top: 30px;
            margin-left: 30px;
            width: 270px;
            height: 270px;
            box-sizing: border-box;
            border: 2px solid;
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

        .selected-target {
            margin-top: 30px;
        }
    }

    .noop {
        width: 50px;
        height: 100%;
    }

    .four-steps {
        flex: 1;
        height: 2000px;
        background-color: #ccc;
    }
}

.footer {
    margin-top: 60px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000;
    height: 300px;
    color: white;
}
</style>