import {createLocalVue} from '@vue/test-utils'
import Vuex from 'vuex'
import storeConfig from '@/store/modules/menu'
import {cloneDeep} from 'lodash'


describe('testing the vuex store', function () {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const store = new Vuex.Store(cloneDeep(storeConfig))
    test('return true when "toggle menu show" is committed', () => {
        expect(store.state.show).toBe(false)
        store.commit('toggleMenuShow', true)
        expect(store.state.show).toBe(true)
    })
    it('should return false when islock is empty, or return the argument given', function () {
        expect(store.state.isLock).toBe(false)
        store.state.isLock=true
        expect(store.state.isLock).toBe(true)
    });
    it('should return number of index', function () {
        expect(store.state.leftMenuActiveIndex).toBe("0")
        store.commit('changeLeftMenuActiveIndex','1-1')
        expect(store.state.leftMenuActiveIndex).toBe('1-1')
    });
})


