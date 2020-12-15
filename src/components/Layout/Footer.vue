<template>
    <div class="footer">
        <router-link
            v-for="(item, index) in tabs"
            :key="'tabs' + index"
            :to="item.path"
            exact-active-class="active"
        >
            {{ item.name }}
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'my-footer',
    data () {
        return {
            tabs: [
                { name: '首页', path: '/home' },
                { name: '分类', path: '/home/type' },
                { name: '提示', path: '/home/tips' },
                { name: '我的', path: '/home/me' }
            ]
        }
    }
}
</script>

<style lang="scss">
@import "./footer.scss";
</style>
