<template lang="pug">
div.role
    Bread(:target="target")
</template>

<script>
export default {
    data(){
        return{
            target:['系统管理','角色管理'],
        }
    }
}
</script>

<style lang="scss" scoped>

</style>