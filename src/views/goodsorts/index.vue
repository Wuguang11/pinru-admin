<template>
  <div>
    <BreadCrumb :menus="$store.state.menusInfo[2]" index="2"></BreadCrumb>
  </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue'
export default {
  name: 'goodsorts',
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: { BreadCrumb }
}
</script>

<style scoped lang='less'>
</style>
