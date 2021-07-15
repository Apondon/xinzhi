<template lang="pug">
div.menu
    Bread(:target="target")
</template>

<script>
export default {
    data(){
        return{
            target:['系统管理','菜单管理'],
        }
    }
}
</script>

<style lang="scss" scoped>

</style>