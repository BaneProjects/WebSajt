<template>
  <div>
      <h1>Not Found</h1>
      <p>
          Oops sorry, but we couldn't find that page. Try going to
          <router-link :to="{ name: 'Home' }">
              Home
          </router-link>
      </p>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>