<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand :to="{ name: 'index' }">FeedRouter</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" />

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'feeds' }" active-class="nav-link-active">Feeds</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container>
      <Nuxt />
    </b-container>
  </div>
</template>

<style>
.nav-link-active {
  color: white !important;
}
</style>
