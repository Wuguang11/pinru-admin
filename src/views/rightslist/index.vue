<template>
  <div>
    <BreadCrumb :menus="$store.state.menusInfo[1]" index="1"></BreadCrumb>
  </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue'
export default {
  name: 'rightslist',
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
