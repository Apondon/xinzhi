<template lang="pug">
div.log
    Bread(:target="target")
    el-form(:inline="true",:model="formInline")
        el-form-item(label="日志类型")
            el-select(v-model="formInline.logType",placeholder="请选择")
                el-option(v-for="item in options",:key="item.value",:label="item.label",:value="item.value")
        el-form-item(label="日志标题")
            el-input(v-model="formInline.logTitle",placeholder="请输入文章名称")
        el-form-item(label="时间范围")
            el-date-picker(v-model="formInline.logTime",type="daterange")
        el-form-item
            el-button(type="primary",icon="el-icon-search",@click="searchHandle") 搜索
        el-form-item
            el-button(icon="el-icon-refresh-left",@click="resetHandle") 重置
    el-table(:data="tableData",style="width: 100%",height="600px",border="true")
        el-table-column(label="序号",type="index",width="50")
        el-table-column(prop="title",label="日志标题",width="180")
        el-table-column(prop="type",label="日志类型",width="180")
            template(#default="scope")
                span(v-show="scope.row.type===1") 系统日志
                span(v-show="scope.row.type===2") 操作日志
                span(v-show="scope.row.type===3") 登录日志
        el-table-column(prop="content",label="日志内容",width="180")
        el-table-column(prop="ip",label="日志ip")
        el-table-column(prop="time",label="创建时间")   
    el-pagination(
        @size-change="handleSizeChange",
        @current-change="handleCurrentChange",
        :current-page="currentPage4",
        :page-sizes="[10, 20, 30, 40]",
        :page-size="10",
        layout="total, sizes, prev, pager, next, jumper",
        :total="400")     
</template>

<script>
export default {
    data(){
        return{
            target:['系统管理','日志管理'],
            formInline:{
                logType:'',
                logTitle:'',
                logTime:''
            },
            tableData:[],
            tableList:[
                {
                    title:'系统登陆',
                    type:1,
                    content:'宏方红登录系统',
                    ip:'61.158.188.2',
                    time:'2021-07-14 09:30:10'
                },
                {
                    title:'系统登陆',
                    type:1,
                    content:'宏方红登录系统',
                    ip:'61.158.188.2',
                    time:'2021-07-14 09:30:10'
                },
                {
                    title:'系统登陆',
                    type:2,
                    content:'宏方红登录系统',
                    ip:'61.158.188.2',
                    time:'2021-07-14 09:30:10'
                },
                {
                    title:'系统登陆',
                    type:2,
                    content:'宏方红登录系统',
                    ip:'61.158.188.2',
                    time:'2021-07-14 09:30:10'
                },
                {
                    title:'系统登陆',
                    type:3,
                    content:'宏方红登录系统',
                    ip:'61.158.188.2',
                    time:'2021-07-14 09:30:10'
                }
            ],
            options: [
                {
                    value: 1,
                    label: '系统日志'
                }, 
                {
                    value: 2,
                    label: '操作日志'
                }, 
                {
                    value: 3,
                    label: '登录日志'
                }
            ],
            // 分页
            currentPage4:1,
        }
    },
    methods:{
        searchHandle(){
            if(!this.formInline.logType) return false
            this.tableData = []
            for(let i=0;i<this.tableList.length;i++){
                if(this.tableList[i].type == this.formInline.logType)
                    this.tableData.push(this.tableList[i])
            }
        },
        resetHandle(){
            this.formInline = {
                logType:'',
                logTitle:'',
                logTime:''
            }
            this.tableData = this.tableList
        },
        handleSizeChange(val){
            console.log('handleSizeChange')
            console.log(`每页 ${val} 条`)
        },
        handleCurrentChange(val){
            console.log('handleCurrentChange')
            console.log(`当前页: ${val}`)
        }
    },
    mounted(){
        this.tableData = this.tableList
    }
}
</script>

<style lang="scss" scoped>
.log{
    padding:20px;
    text-align: left;
    .el-form{
        margin-top:20px;
    }
    .el-pagination{
        text-align: right;
    }
}
</style>