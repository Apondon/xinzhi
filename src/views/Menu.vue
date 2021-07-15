<template lang="pug">
div.menu
    Bread(:target="target")
    el-form(:inline="true",:model="formInline",class="demo-form-inline")
        el-form-item(label="菜单名称")
            el-input(v-model="formInline.name",placeholder="请输入菜单名称")
        el-form-item(label="状态")
            el-select(v-model="formInline.status",placeholder="请选择状态")
                el-option(v-for="item in options",:key="item.value",:label="item.label",:value="item.value")
        el-form-item
            el-button(type="primary",icon="el-icon-search",@click="onSubmit") 搜索
        el-form-item
            el-button(icon="el-icon-refresh-left",@click="resetHandle") 重置
    div.menuBox
        el-button(type="primary",icon="el-icon-plus",plain,size="small",@click="addOne") 添加菜单
        el-table(:data="tableData",style="width: 100%",height="600px",:tree-props="{children: 'data',hasChildren:'hasChildren'}",border="true",row-key="id")
            el-table-column(label="菜单名称",prop="name")
            el-table-column(label="图标",prop="icon")
                template(#default="scpoe")
                    i(:class="scpoe.row.icon")
            el-table-column(label="路径",prop="path")
            el-table-column(label="状态")
                template(#default="scope")
                    span(v-show="scope.row.status==='1'") 正常
                    span(v-show="scope.row.status==='2'") 禁用
            el-table-column(label="类型")
                template(#default="scope")
                    span(v-show="scope.row.type==='1'") 类型一
                    span(v-show="scope.row.type==='2'") 类型二
            el-table-column(label="备注",prop="text")
            el-table-column(label="操作")
                template(#default="scope")
                    el-link.el-icon-edit(:underline="false",href="javascript:;",@click="editHandle(scope.$index,scope.row)") 编辑
                    el-link.el-icon-delete-solid(:underline="false",href="javascript:;",@click="deleteHandle(scope.$index,scope.row)") 删除
        el-pagination(
            @size-change="handleSizeChange",
            @current-change="handleCurrentChange",
            :current-page="currentPage4",
            :page-sizes="[10, 20, 30, 40]",
            :page-size="10",
            layout="total, sizes, prev, pager, next, jumper",
            :total="400") 
el-dialog(:title="title",v-model="dialogVisible",width="30%",:center="false")
    el-form(ref="form",:model="form",label-width="80px")
        el-form-item(label="菜单名称")
            el-input(v-model="form.name")
        el-form-item(label="等级")
            el-radio(v-model="form.level",:label="1") 一级菜单
            el-radio(v-model="form.level",:label="2") 二级菜单
        el-form-item(label="父级菜单",v-if="form.level == 2")
            el-select(v-model="form.group",placeholder="请选择状态")
                el-option(v-for="item in tableData",:key="item.id",:label="item.name",:value="item.id")
        el-form-item(label="使用类型")
            el-select(v-model="form.type",placeholder="请选择状态")
                el-option(v-for="item in options1",:key="item.value",:label="item.label",:value="item.value")
        el-form-item(label="菜单路径",v-if="form.level == 2")
            el-input(v-model="form.path")
        el-form-item(label="菜单备注")
            el-input(v-model="form.text")
        el-form-item(label="菜单状态")
            el-radio(v-model="form.type",label="1") 正常
            el-radio(v-model="form.type",label="2") 失效
    template(#footer)
        div.dialog-footer
            el-button(@click="closeHandle") 关闭
            el-button(type="primary") 提交
</template>

<script>
export default {
    data(){
        return{
            target:['系统管理','菜单管理'],
            formInline:{
                name:'',
                status:''
            },
            options:[
                {
                    label:'正常',
                    value:'1'
                },
                {
                    label:'失效',
                    value:'2'
                }
            ],
            // table
            tableData:[],
            tableList:[
                {
                    id:1,
                    name:'菜单名称1',
                    icon:'el-icon-s-tools',
                    path:'',
                    status:'1',
                    type:'1',
                    text:'备注',
                    level:1,
                    data:[
                        {
                            id:11,
                            group:1,
                            name:'菜单名称1',
                            icon:'el-icon-star-off',
                            path:'www.aaa.com',
                            status:'1',
                            type:'2',
                            level:2,
                            text:'备注',
                        }
                    ]
                },
                {
                    id:2,
                    name:'菜单名称2',
                    icon:'el-icon-s-goods',
                    path:'',
                    status:'1',
                    type:'1',
                    level:1,
                    text:'备注',
                    data:[
                        {
                            id:21,
                            group:2,
                            name:'菜单名称2',
                            icon:'el-icon-remove',
                            path:'www.bbb.com',
                            status:'1',
                            type:'2',
                            level:2,
                            text:'备注',
                        }
                    ]
                }
            ],
            // 分页
            currentPage4:1,
            // dialog
            title:'',
            dialogVisible:false,
            form:{
                level:1,
                id:1,
                name:'',
                icon:'',
                path:'',
                status:'',
                type:'',
                text:'',
                group:'' 
            },
            options1:[
                {
                    label:'全部',
                    value:'0'
                },
                {
                    label:'平台',
                    value:'1'
                },
                {
                    label:'机构',
                    value:'2'
                },
            ]
        }
    },
    methods:{
        onSubmit(){
            this.tableData = []
            for(let i = 0; i < this.tableList.length; i++){
                if(this.tableList[i].name == this.formInline.name && this.tableList[i].status == this.formInline.status){
                    this.tableData.push(this.tableList[i])
                }
            }
        },
        resetHandle(){
            this.tableData = this.tableList
            this.formInline = {
                name:'',
                status:''
            }
        },
        addOne(){
            this.title = '添加菜单'
            this.dialogVisible = true
        },
        closeHandle(){
            this.dialogVisible = false
        },
        editHandle(){

        },
        deleteHandle(index,row){
            if(row.level == 1){
                if(row.data.length){
                    let cfm = confirm('确定删除？')
                    if(!cfm) return false
                }
                for(let i = 0;i < this.tableData.length;i++){
                    if(this.tableData[i].id == row.id){
                        this.tableData.splice(i,1)
                        break
                    }
                }
            }
            if(row.level == 2){
                for(let i = 0;i < this.tableData.length;i++){
                    if(this.tableData[i].id == row.group){
                        console.log(index,row)
                        for(let j = 0; j < this.tableData[i].data.length ; j++){
                            if(this.tableData[i].data[j].id == row.id){
                                this.tableData[i].data.splice(j,1)
                                break
                            }
                        }
                        break;
                    }
                }  
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
.menu{
    box-sizing: border-box;
    padding:20px 45px;
    .el-form{
        margin-top: 20px;
        text-align: left;
    }
    .menuBox{
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