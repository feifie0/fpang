<template>
    <section id="pageAdd">
        <!-- 标题区域 -->
        <div class="page-title">
            <div class="inline">
                <h1>一级标题：</h1>
                <el-input v-model="pageTitle.title" placeholder="请输入内容"></el-input>
                <i></i>
            </div>
            <div class="inline">
                <label>level：</label>
                <!-- <el-input v-model="pageTitle.level" placeholder="所在菜单名称"></el-input> -->
                <el-autocomplete
                    v-model="pageTitle.level"
                    value-key="name"
                    :fetch-suggestions="querySearch"
                    placeholder="一级菜单名称"
                    @select="handleSelect"
                ></el-autocomplete>
                <el-autocomplete
                    :disabled="!pageTitle.level"
                    v-model="pageTitle.level2"
                    value-key="name"
                    :fetch-suggestions="querySearch2"
                    placeholder="二级菜单名称"
                    @select="handleSelect"
                ></el-autocomplete>
                <i></i>
            </div>
            <div class="inline">
                <label>name：</label>
                <el-input v-model="pageTitle.name" placeholder="标题简写"></el-input>
                <i></i>
            </div>
            <div class="inline transition-box" v-for="(v,i) in pageTitle.text" :key="i">
                <label>{{v.type}}：</label>
                <el-input
                    v-if="v.type == 'text'"
                    type="textarea"
                    :autosize="true"
                    v-model="v.con"
                    placeholder="请输入内容"
                ></el-input>
                <div class="link-input" v-else-if="v.type == 'link'">
                    <el-input v-model="v.con" placeholder="请输入描述"></el-input>
                    <el-input v-model="v.link" placeholder="请输入连接"></el-input>
                </div>
                <i class="el-icon-delete" @click="removeItem(pageTitle.text,i)"></i>
            </div>
            <el-dropdown class="btn" @command="type => addRow(pageTitle.text,type)" trigger="click">
                <el-button type="primary" size="mini">
                    新增行
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="link">link</el-dropdown-item>
                    <el-dropdown-item command="text">text</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <!-- 区域 -->
        <div v-for="(block_item,block_index) in pageRegion" :key="block_index" class="page-region">
            <div class="block" v-if="block_index != 0">
                <div class="dividingLine">区分割线</div>
            </div>
            <div class="inline">
                <h2>区级标题：</h2>
                <el-input v-model="block_item.title" placeholder="请输入内容"></el-input>
                <i
                    v-if="block_index != 0"
                    @click="removeItem(pageRegion,block_index)"
                    class="el-icon-delete"
                ></i>
            </div>
            <div v-for="(item,index) in block_item.block" :key="index" class="block">
                <div class="inline">
                    <h3>块级标题：</h3>
                    <el-input v-model="item.title" placeholder="请输入内容"></el-input>
                    <i
                        v-if="index != 0"
                        @click="removeItem(block_item.block,index)"
                        class="el-icon-delete"
                    ></i>
                </div>
                <div v-for="(v,i) in item.con" :key="i" class="inline">
                    <label>{{v.type}}：</label>
                    <!-- text -->
                    <el-input v-if="v.type == 'text'" v-model="v.con" placeholder="请输入内容"></el-input>
                    <!-- code -->
                    <el-input
                        v-else-if="v.type == 'code'"
                        type="textarea"
                        :autosize="true"
                        v-model="v.con"
                        placeholder="请输入内容"
                    ></el-input>
                    <!-- title -->
                    <el-input v-else-if="v.type == 'title'" v-model="v.con" placeholder="请输入内容"></el-input>
                    <!-- img -->
                    <div v-else-if="v.type == 'img'" class="upload-img">
                        <el-upload
                            class="upload"
                            action="/upload/img"
                            :on-error="uploadError"
                            :on-success="(val) => v.con = `/assets/img/${val.name}`"
                            :before-upload="beforeupload"
                            :show-file-list="false"
                        >
                            <img v-if="v.con" :src="v.con" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                    <!-- list -->
                    <div v-else-if="v.type == 'list'" class="list">
                        <template v-for="(list_item,list_index) in v.con">
                            <el-input
                                size="mini"
                                :key="'b' + list_index"
                                v-model="v.con[list_index]"
                                placeholder="请输入内容"
                            ></el-input>
                            <i
                                v-if="list_index != 0"
                                :key="'a' + list_index"
                                @click="removeItem(v.con,list_index)"
                                class="el-icon-delete"
                            ></i>
                        </template>
                        <div class="btn">
                            <el-button @click="addLi(v.con)" type="primary" size="mini">新增列表项</el-button>
                        </div>
                    </div>
                    <i class="el-icon-delete" @click="removeItem(item.con,i)"></i>
                </div>
                <el-dropdown class="btn" @command="type => addRow(item.con,type)" trigger="click">
                    <el-button type="primary" size="mini">
                        新增行
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="title">title</el-dropdown-item>
                        <el-dropdown-item command="text">text</el-dropdown-item>
                        <el-dropdown-item command="code">code</el-dropdown-item>
                        <el-dropdown-item command="list">list</el-dropdown-item>
                        <!-- <el-dropdown-item command="img">img</el-dropdown-item> -->
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="btn">
                <el-button
                    @click="addblock(pageRegion[block_index].block)"
                    type="primary"
                    size="mini"
                >新增块</el-button>
            </div>
        </div>
        <div class="position">
            <el-button @click="pageShow = true" type="primary" size="medium ">预览</el-button>
            <el-button @click="setForm" type="primary" size="medium ">提交</el-button>
            <el-button @click="addRegion(pageRegion)" type="primary" size="medium">新增区</el-button>
        </div>
        <page
            :pageRegion="pageRegion"
            :pageTitle="pageTitle"
            @pageRemove="pageShow = false"
            v-if="pageShow"
        />
    </section>
</template>

<script>
import page from "~/components/page/index.vue";
export default {
    components: {
        page
    },
    data() {
        return {
            pageShow: false,
            navData: "",
            levelData1: "",
            levelData2: "",
            pageTitle: { title: "", text: [] },
            pageRegion: [{ title: "", block: [{ title: "", con: [] }] }]
        };
    },
    async mounted() {
        localStorage.getItem("pageTitle")
            ? (this.pageTitle = JSON.parse(localStorage.getItem("pageTitle")))
            : "";
        localStorage.getItem("pageData")
            ? (this.pageRegion = JSON.parse(localStorage.getItem("pageData")))
            : "";
        let {
            status,
            data: { mag }
        } = await this.$axios.get("/API/getNav");
        if (status == 200) {
            this.navData = mag;
        }
    },
    methods: {
        //level：下拉建议项 处理中间件
        querySearch(val, cb) {
            let array = this.navData;
            let callback = array.filter(item => item.name.indexOf(val) != -1);
            // 调用 callback 返回建议列表的数据
            cb(callback);
        },
        querySearch2(val, cb) {
            let callback = [];
            let array = this.navData.filter(
                item => item.name === this.pageTitle.level
            );
            if (array.length > 0) {
                callback = array[0].item.filter(
                    item => item.name.indexOf(val) != -1
                );
            }
            // 调用 callback 返回建议列表的数据
            cb(callback);
        },
        //level：下拉选择 选中项 触发事件
        handleSelect: function(val) {
            // console.log(val);
        },
        //
        pageRemove: function() {},
        // 新增区
        addRegion: function(data) {
            data.push({ title: "", block: [{ title: "", con: [] }] });
        },
        //新增块
        addblock: function(data) {
            data.push({ title: "", con: [] });
        },
        //新增行
        addRow: function(data, type) {
            data.push({ type, con: type == "list" ? [""] : "" });
        },
        //新增列表项
        addLi: function(data) {
            data.push("");
        },
        // 删除 元素
        removeItem: function(data, i) {
            data.splice(i, 1);
        },
        // img开始上传
        beforeupload: function() {
            // console.log("开始上传");
        },
        // img上传成功
        uploadSuccess: function(response, file, fileList) {
            // console.log("上传成功");
            // console.log(response.name);
        },
        // img上传出错
        uploadError: function(err, file, fileList) {
            // console.log("上传出错");
        },
        // 上传表单
        setForm: async function() {
            const loading = this.$loading({
                lock: true,
                text: "Loading",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            });
            // return
            let data = this.pageRegion,
                title = this.pageTitle,
                text = [];
            // data.
            if (!title.level) {
                text += `  请填写nav`;
            } else if (!title.level2) {
                text += `  请填写nav`;
            } else if (!title.name) {
                text += `  请填写name`;
            } else {
                title.text.forEach((item, i) => {
                    if (!item.con) {
                        text += `

                            title第${i + 1}项内容为空`;
                    } else if (item.type == "link" && !item.link) {
                        text += `

                            title第${i + 1}项链接为空`;
                    }
                });
            }
            data.forEach((v1, i1) => {
                if (!v1.title) {
                    text += `

                        第${i1 + 1}个区title为空`;
                }
                v1.block.forEach((v2, i2) => {
                    if (!v2.title) {
                        text += `

                            第${i1 + 1}个区,
                            第${i2 + 1}模块标题为空`;
                    }
                    v2.con.forEach((v3, i3) => {
                        if (v3.type == "list") {
                            v3.con.forEach((v4, i4) => {
                                if (!v4) {
                                    text += `

                                        第${i1 + 1}个区,
                                        第${i2 + 1}模块,
                                        第${i3 + 1}行列表,
                                        第${i4 + 1}项内容为空`;
                                }
                            });
                        } else if (!v3.type == "img") {
                            if (!v3.con) {
                                text += `

                                    第${i1 + 1}个区,
                                    第${i2 + 1}模块,
                                    第${i3 + 1}行内容为空`;
                            }
                        }
                    });
                });
            });
            if (text.length <= 0) {
                console.log("通过验证");
                let {
                    status,
                    data: { C, T, navCallback: N }
                } = await this.$axios.post(
                    "/API/addPage",
                    { data, title }
                );
                if (status === 200) {
                    loading.close();
                    console.log("T:", T);
                    console.log("C:", C);
                    console.log("N:", N);
                }
            } else {
                loading.close();
                console.log(text);
            }
        }
    }
};
</script>

<style lang='stylus' scoped>
#pageAdd {
    padding-bottom: 100px;
    position: relative;

    .page-title {
        border-bottom: 1px solid #ccc;
        padding: 10px 0;
        margin-bottom: 20px;
    }

    .block {
        padding-top: 10px;
    }

    .inline {
        display: flex;
        align-items: flex-start;
        border-bottom: 1px darken #888;

        & + .inline {
            margin-top: 10px;
        }

        label, h3, h2, h1 {
            display: inline-block;
            width: 120px;
            text-align: right;
            height: 40px;
            line-height: 40px;
        }

        & > .el-input, & > .el-textarea, & > .link-input, & > .list {
            width: calc(100% - 156px);
        }

        .link-input {
            display: flex;

            .el-input:nth-child(1) {
                width: 20%;
            }

            .el-input:nth-child(2) {
                width: 80%;
            }
        }

        .list {
            .el-input {
                width: 90%;
                margin-bottom: 5px;
            }

            .btn {
                width: 90%;
            }
        }

        i {
            width: 16px;
            margin: 0 10px;
            font-weight: 900;
            line-height: 40px;
        }

        i:hover {
            color: red;
            cursor: pointer;
        }

        .upload-img {
            .upload {
                width: 100px;
                line-height: 100px;
                text-align: center;
                border: 1px solid red;
                border-radius: 5px;

                > div {
                    width: 100px;
                    height: 100px;
                }
            }
        }
    }

    .btn {
        display: block;
        text-align: right;
        margin: 20px 10px;
    }

    .position {
        // position absolute
        // bottom 10px;
        width: calc(100% - 20px);
        text-align: center;

        .el-button {
            width: 80px;
        }
    }

    .dividingLine {
        width: 100%;
        height: 30px;
        font-size: 20px;
        text-align: center;
        position: relative;
        padding: 30px 0;
    }

    .dividingLine::before {
        content: '';
        display: inline-block;
        width: calc(50% - 40px);
        height: 0px;
        border-bottom: 2px dashed #888;
        position: absolute;
        left: 0;
        top: calc(50% - 1px);
    }

    .dividingLine::after {
        content: '';
        display: inline-block;
        width: calc(50% - 40px);
        height: 0px;
        border-bottom: 2px dashed #888;
        position: absolute;
        right: 0;
        top: calc(50% - 1px);
    }
}
</style>
