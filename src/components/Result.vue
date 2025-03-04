
<template >
  <div class="contenu">
    <div class="messageV" v-if="result">
      <h1> Bravo , vous avez gangé  </h1>
    </div>
    <div class="messageD" v-else>
      <h1> Oups , partie perdue ! </h1>
    </div>
      <router-link to="/"> <button id="result-retour-acceuil" class="buttons"> page d'accueil </button></router-link>
  </div>
</template>


<script >
export default {
  name : "result",
  computed: {
    result: function () {
      return this.$route.params.victoire === "victoire"
    },
  },
  }


</script>

<style scoped>

.messageD{
 color: red;
}
.messageV{
  color: forestgreen;
}
</style>