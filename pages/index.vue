<template>
  <h1>index.vue</h1>
</template>

<script>
export default {
  asyncData ({ redirect }) {
    return redirect(301, '/feeds')
  }
}
</script>
