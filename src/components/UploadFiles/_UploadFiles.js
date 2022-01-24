// @vue/component

import Vue from 'vue'
import uploader from 'vue-simple-uploader'
import UploadFiles from './UploadFiles.vue'

Vue.use(uploader)

/* eslint-disable no-new */
new Vue({
    render(createElement) {
        return createElement(UploadFiles)
    }
}).$mount('#app')

export default {
    name: 'Uploadfiles',

    components: {},

    mixins: [],

    props: {},

    data () {
        return {}
    },

    computed: {},

    watch: {},

    created () {},

    methods: {}
}
