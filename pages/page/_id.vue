<template>
    <div>
        <page :pageRegion="pageRegion" :pageTitle="pageTitle" />
    </div>
</template>
<script>
import page from "~/components/page/index.vue";
export default {
    components: {
        page
    },
    data() {
        return {
            pageID: this.$route.params.id,
            pageRegion: [],
            pageTitle: {}
        };
    },
    watch: {
        // $route(to, from) {
        //     console.log(to)
        //     this.pageID = this.$route.params.pageID
        // }
    },
    mounted() {
        // console.log(this.$route.params.id)
        this.pageRegion = JSON.parse(localStorage.getItem("pageData"));
        this.pageTitle = JSON.parse(localStorage.getItem("pageTitle"));
    }
};
</script>

<style>
</style>
