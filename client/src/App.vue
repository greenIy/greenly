<template>
  <router-view/>
</template>

<script>
import AuthService from './router/auth';

export default {
  async mounted() {

    // Caso o token do utilizador seja válido
    if (await AuthService.isLoggedIn()) {
      this.$store.dispatch('setUser', await AuthService.getUser())
      this.$store.dispatch('setState', true);
    } else {
    // Caso seja inexistente ou inválido
      this.$store.dispatch('setUser', null)
      this.$store.dispatch('setState', false);
    }
  }
};

</script>

