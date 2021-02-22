<template>
  <div class="notFound_container">
    <div>
      <h1>page you are looking for is not found</h1>
      <router-link :to="{ name: 'Login' }">back to Login</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style lang="scss" scoped>
.notFound_container {
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.notFound_container div {
  width: 800px;
}
</style>