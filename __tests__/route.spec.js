import {mount, createLocalVue} from "@vue/test-utils";
import VueRouter from 'vue-router'
import routes from "@/router"

const localVue = createLocalVue()
localVue.use(VueRouter)

mount(Component, {
    localVue,
    routes
})
