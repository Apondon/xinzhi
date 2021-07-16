<template lang="pug">
div.role
    Bread(:target="target")
    el-form(:inline="true",:model="formInline",class="demo-form-inline")
        el-form-item(label="角色名称")
            el-input(v-model="formInline.name",placeholder="请输入角色名称")
        el-form-item
            el-button(type="primary",icon="el-icon-search",@click="onSubmit") 搜索
        el-form-item
            el-button(icon="el-icon-refresh-left",@click="resetHandle") 重置
    div.roleBox
        el-button(type="primary",icon="el-icon-plus",plain,size="small",@click="addOne") 添加角色
        el-table(:data="tableData",style="width: 100%",height="600px",:border="true")
            el-table-column(label="序号",type="index",width="50")
            el-table-column(label="ID",prop="id")
            el-table-column(label="姓名",prop="name")
            el-table-column(label="备注",prop="text")
            el-table-column(label="操作",width="280")
                template(#default="scope")
                    el-link.el-icon-edit(:underline="false",href="javascript:;",@click="editHandle(scope.$index,scope.row)") 编辑
                    el-link.el-icon-s-fold(:underline="false",href="javascript:;",@click="powerHandle(scope.$index,scope.row)") 权限
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
        el-form-item(label="角色名称")
            el-input(v-model="form.name")
        el-form-item(label="备注")
            el-input(v-model="form.text")
    template(#footer)
        div.dialog-footer
            el-button(@click="closeHandle") 关闭
            el-button(type="primary",@click="submitHandle") 提交

el-dialog(title="添加权限",v-model="powerVisible",width="30%",:center="false")
    el-tree(
        :data="data",
        show-checkbox,
        node-key="id",
        :default-checked-keys="[]",
        :props="defaultProps",
        :default-expand-all="true",
        ref="tree")
    template(#footer)
        div.dialog-footer
            el-button(@click="closePowerHandle") 关闭
            el-button(type="primary",@click="submitPowerHandle") 提交
</template>

<script>
export default{
    data(){
        return{
            target:['系统管理','角色管理'],
            formInline:{
                name:'',
            },
            tableData:[],
            tableList:[
                {
                    id:1,
                    name:'用户1',
                    text:'备注1',
                    power:[

                    ]
                },
                 {
                    id:2,
                    name:'用户2',
                    text:'备注2',
                    power:[

                    ]
                }
            ],
            currentPage4:1,
            // dialog 新增修改
            dialogVisible:false,
            title:'',
            form:{
                name:'',
                text:''
            },
            isEdit:false,
            editIndex:0,
            // 权限管理
            powerVisible:false,
            data:[
                {
                    id: 1,
                    label: '客户档',
                    children: [
                        {
                            id: 11,
                            label: '客户档案',
                        },
                        {
                            id: 12,
                            label: '转诊病人',
                        }
                    ]
                }, 
                {
                    id: 2,
                    label: '业务员',
                    children: [
                        {
                            id: 21,
                            label: '新建业务员'
                        }, 
                        {
                            id: 22,
                            label: '业务员管理'
                        }
                    ]
                }, 
                {
                    id: 3,
                    label: '协作单位',
                    children: [
                        {
                            id: 31,
                            label: '新建协作单位'
                        }, 
                        {
                            id: 32,
                            label: '协作单位'
                        },
                        {
                            id: 33,
                            label: '协作单位账号'
                        }
                    ]
                },
                {
                    id: 4,
                    label: '工作日志',
                    children: [
                        {
                            id: 41,
                            label: '日志查看'
                        }, 
                        {
                            id: 42,
                            label: '日志统计'
                        },
                        
                    ]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            powerIndex:0,

        }
    },
    methods:{
        onSubmit(){
            this.tableData = []
            this.tableList.map(item => 
                {
                    if(item.name == this.formInline.name){
                        this.tableData.push(item)
                    }
                }
            )
        },
        resetHandle(){
            this.tableData = this.tableList
            this.formInline.name = ''
        },
        addOne(){
            this.dialogVisible = true
            this.isEdit = false
            this.title = '添加角色'
            this.form = {
                name: '',
                text: ''
            }
        },
        editHandle(index,row){
            this.dialogVisible = true
            this.isEdit = true
            this.editIndex = index
            this.title = '修改角色'
            this.form = {
                name: row.name,
                text: row.text
            }
        },
        powerHandle(index,row){
            this.powerIndex = index
            this.powerVisible = true
            this.$nextTick(() => {
                this.$refs.tree.setCheckedKeys(row.power) 
            })

        },
        deleteHandle(index){
            this.tableData.splice(index,1)
        },
        // dialog
        closeHandle(){
            this.dialogVisible = false
        },
        submitHandle(){
            if(this.isEdit){
                this.tableData[this.editIndex].name = this.form.name
                this.tableData[this.editIndex].text = this.form.text  
            }
            if(!this.isEdit){
                this.tableData.push(
                    {
                        id:this.tableData.length,
                        name:this.form.name,
                        text:this.form.text,
                        power:[

                        ]
                    }
                )
            }
            this.editIndex = 0
            this.dialogVisible = false
        },
        // 权限
        closePowerHandle(){
            this.powerVisible = false
        },
        submitPowerHandle(){
            console.log(this.$refs.tree.getCheckedKeys());
            this.tableData[this.powerIndex].power = this.$refs.tree.getCheckedKeys()
            this.powerVisible = false
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

<style lang="scss">
.role{
    box-sizing: border-box;
    padding:20px 45px;
    .el-form{
        margin-top: 20px;
        text-align: left;
    }
    .roleBox{
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