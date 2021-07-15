<template lang="pug">
div.user
    Bread(:target="target")
    el-form(:inline="true",:model="formInline",class="demo-form-inline")
        el-form-item(label="角色名称")
            el-input(v-model="formInline.name",placeholder="请输入角色名称")
        el-form-item
            el-button(type="primary",icon="el-icon-search",@click="onSubmit") 搜索
        el-form-item
            el-button(icon="el-icon-refresh-left",@click="resetHandle") 重置
    div.userBox
        el-button(type="primary",icon="el-icon-plus",plain,size="small",@click="addOne") 添加账号
        el-table(:data="tableData",style="width: 100%",height="600px",border="true")
            el-table-column(label="序号",type="index",width="50")
            el-table-column(label="ID",prop="id",width="90")
            el-table-column(label="名称",prop="name",width="220")
            el-table-column(label="备注",prop="text")
            el-table-column(label="操作",width="280")
                template(#default="scope")
                    el-link.el-icon-edit(:underline="false",href="javascript:;") 编辑
                    el-link.el-icon-s-operation(:underline="false",href="javascript:;") 权限
                    el-link.el-icon-delete-solid(:underline="false",href="javascript:;") 删除
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
            target:['系统管理','用户管理'],
            formInline:{
                name:''
            },
            tableData:[],
            tableList:[
                {
                    id:'',
                    name:'',
                    text:''
                }
            ],
            currentPage4:1,
            
        }
    },
    methods:{
        onSubmit(){
            this.tableData = []
            for(let i = 0; i < this.tableList.length; i++){
                if(this.tableList[i].name == this.formInline.name){
                    this.tableData.push(this.tableList[i])
                }
            }
        },
        resetHandle(){
            this.tableData = this.tableList
            this.formInline = {
                name:'',
            }
        },
        
        handleSizeChange(val){
            console.log(`每页 ${val} 条`)
        },
        handleCurrentChange(val){
            console.log(`当前页: ${val}`)
        },
    },
    mounted(){
        this.tableData = this.tableList
    }
}
</script>

<style lang="scss" scoped>
.user{
    box-sizing: border-box;
    padding:20px 45px;
    .el-form{
        margin-top: 20px;
        text-align: left;
    }
    .userBox{
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