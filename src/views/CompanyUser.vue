<template lang="pug">
div.companyUser
    Bread(:target="target")
    el-form(:inline="true",:model="formInline",class="demo-form-inline")
        el-form-item(label="协作单位")
            el-input(v-model="formInline.name",placeholder="请输入名称",clearable)
        el-form-item(label="用户状态")
            el-select(v-model="formInline.status",placeholder="请选择",clearable)
                el-option(v-for="item in sOptions",:key="item.value",:label="item.label",:value="item.value")
        el-form-item(label="时间范围")
            el-date-picker(v-model="formInline.value1",type="date",placeholder="选择日期",value-format="YYYY-MM-DD",clearable)
        el-form-item
            el-button(type="primary",icon="el-icon-search",@click="onSubmit") 搜索
        el-form-item
            el-button(icon="el-icon-refresh-left",@click="resetHandle") 重置
    div.companyUserBox
        el-table(:data="tableData",style="width: 100%",height="600px",border="true")
            el-table-column(label="序号",type="index",width="50")
            el-table-column(label="机构名称",prop="ogz")
            el-table-column(label="协作单位",prop="name")
            el-table-column(label="姓名",prop="name")
            el-table-column(label="性别",prop="sex")
                template(#default="scope")
                    span(v-show="scope.row.sex===1") 男
                    span(v-show="scope.row.sex===2") 女
            el-table-column(label="联系人",prop="connect")
            el-table-column(label="手机号",prop="tele")
            el-table-column(label="登录后ip",prop="ip")
            el-table-column(label="状态",prop="status")
                template(#default="scope")
                    span(v-show="scope.row.status===1") 正常
                    span(v-show="scope.row.status===2") 禁用
            el-table-column(label="备注",prop="lastTime")
            el-table-column(label="创建时间",prop="createTime")
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
            target:['协作单位','协作单位账号'],
            formInline:{
                name:'',
                status:'',
                value1:''
            },
            sOptions:[
                {
                    label:'正常',
                    value:1
                },
                {
                    label:'禁用',
                    value:2
                },
                {
                    label:'锁定',
                    value:3
                },
            ],
            tableData:[],
            tableList:[{id:1}],
            // 分页
            currentPage4:1,
          
        }
    },
    methods:{
        onSubmit(){},
        resetHandle(){},
         // 分页
        handleSizeChange(val){
            console.log(`每页 ${val} 条`)
        },
        handleCurrentChange(val){
            console.log(`当前页: ${val}`)
        },
    },
    mounted(){
        for(let i in this.tableList){
            this.tableData.push(this.tableList[i])
        }
    }
}
</script>

<style lang="scss" scoped>
.companyUser{
    box-sizing: border-box;
    padding:20px 45px;
    .el-form{
        margin-top: 20px;
        text-align: left;
    }
    .companyUserBox{
        margin-top: 20px;
        text-align: left;
    }
    .el-table{
        margin-top:20px;
        .el-link{
            margin:0 10px;
        }
    }
    .el-pagination{
        text-align: right;
    }
}
</style>