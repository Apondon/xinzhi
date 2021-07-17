<template lang="pug">
el-container
    el-header(v-if="ifRouter") 
        el-menu(:default-active="activeIndex",class="el-menu-demo" mode="horizontal",@select="handleSelect")
            el-menu-item(index="1") 处理中心
            el-submenu(index="2")
                template(#title) 我的工作台
                el-menu-item(index="2-1") 选项1
                el-menu-item(index="2-2") 选项2
                el-menu-item(index="2-3") 选项3
            el-submenu(index="2-4")
                template(#title) 选项4
                el-menu-item(index="2-4-1") 选项1
                el-menu-item(index="2-4-2") 选项2
            el-menu-item(index="3",disabled) 消息中心
            el-menu-item(index="4")
                a(href="javascrtpt:;") 订单管理 
        div.line
    el-container
        el-aside(width="200px",v-if="ifRouter") 
            el-container
                el-aside(width="200px" style="background-color: rgb(238, 241, 246)")
                    el-menu(:default-openeds="['1']")
                        el-submenu(index="1",v-for="item in nav")
                            template(#title)
                                i(:class="item.icon") 
                                .
                                    {{item.name}}
                            el-menu-item-group
                                //- template(#title) {{item.name}}
                                el-menu-item(v-for="i in item.list")
                                    router-link(:to="i.url") {{i.name}}
        el-main 
            router-view  
</template>

<script>
export default {
  data(){
    return{
      ifRouter:false,
      nav:[
        {
          name:'系统设置',
          icon:'el-icon-setting',
          list:[
            {
              name:'菜单管理',
              url:'/menu'
            },
            {
              name:'用户管理',
              url:'/user'
            },
            {
              name:'角色管理',
              url:'/role'
            },
            {
              name:'知识库',
              url:'/knowledge'
            },
            {
              name:'字典管理',
              url:'/word'
            },
            {
              name:'公告资讯',
              url:'/'
            },
            {
              name:'日志管理',
              url:'/log'
            },
            {
              name:'登录',
              url:'/login'
            }
          ]
        },
        {
          name:'业务员管理',
          icon:'el-icon-user-solid'
        },
        {
          name:'协作单位',
          icon:'el-icon-office-building'
        }
      ]
    }
  },
  watch:{
    $route(to,from){
      if(to.name !== 'Login'){
        this.ifRouter = true
      }
      if(to.name == 'Login'){
        this.ifRouter = false
      }  
    }
  },
  handleSelect(){

  }

}
</script>


<style lang="scss">
html,body{
  width: 100%;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.el-container{
  display: flex;
  width: 100%;
  height: 100%;
  .el-main{
    padding: 0;
  }
}
.el-header{
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .el-menu--horizontal{
    width: 100%;
  }
}
.el-container{
  flex:1;
}
.el-aside{
  height: 100%;
  overflow-y: scroll;
}
</style>
