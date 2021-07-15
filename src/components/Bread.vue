<template lang="pug">
div.comp1
el-row(:gutter="20")
        el-col(:span="22")
            div.grid-content
                el-breadcrumb(separator-class="el-icon-arrow-right")
                    el-breadcrumb-item(:to="{ path: '/' }") 首页
                    el-breadcrumb-item(v-for="item in target") {{item}}
        el-col(:span="2")
            div.grid-content
                el-link.el-icon-arrow-left(:underline="false",@click="back()",href="javascript:;")
                el-link.el-icon-refresh(:underline="false",@click="refresh()",href="javascript:;")
</template>

<script>
export default {
    name: 'Bread',
    props: {
        target: Array
    },
    methods:{
        back(){
            window.history.length ? window.history.go(-1) : this.$router.push('/')   
        },
        refresh(){
            
        },
    }
}
</script>

<style lang="scss" scoped>
.el-link{
    margin: 0 10px;
}
</style>