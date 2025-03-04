<template>
  <div v-if="nombreParties == 0 ">
     <h1> Pas de parties jouées encore !</h1>
  </div>
  <div v-else>
    <h1> Page Statistiques </h1>
    <table class="table">
    <thead>
    <tr>
    <td> date </td>
    <td> Mot a deviner </td>
    <td> status </td>
    <td> nombre de tentaives </td>
    <td> temps de jeu </td>
    </tr>
    </thead>
    <tbody>
    <tr v-for="game in games">
      <td> {{ game.date.toLocaleString()}} </td>
      <td> {{ game.mot}} </td>
      <td v-if="game.isVictoire"> partie gagnée </td> <td v-else> partie perdue </td>
      <td> {{ game.nombreTentatives}} </td>
      <td> {{ game.tempsJeu}} </td>
    </tr>
    </tbody>
  </table>
    <div class="stats">
       <h3> temps moyen de jeu  : </h3>  <p> {{ this.tempsMoyenJeu}} secondes </p>
      <h3> nombre de tentatives moyennes  :  </h3>  <p> {{this.nombreTentativesMoyennes}}</p>
      <h3> le % de victoire  : </h3>  <p>{{ this.pourcentageVictoire }} % </p>
    </div>
  </div>
  <div>
    <router-link to="/"> <button class="buttons"> page d'accueil </button></router-link>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name : "stats",
  computed : {
      nombreParties:function (){
        return this.$store.getters.getLastGame
      },
      games : function() {
        return this.$store.getters.getAll
      },
      tempsMoyenJeu : function() {
        let tempsTotale =0;
         for (let game of this.games) {
           console.log(game.tempsJeu);
           tempsTotale += game.tempsJeu;
         }
         console.log(tempsTotale)
         return tempsTotale/this.nombreParties

         },
      nombreTentativesMoyennes : function() {
        let tentativesTotale = 0 ;
        for (let game of this.games) {
          tentativesTotale += game.nombreTentatives;
        }
        return tentativesTotale/this.nombreParties
      },
      pourcentageVictoire : function(){
        let nbVictoire=0;
        for (let game of this.games) {
          if (game.isVictoire == true) {
            nbVictoire += 1
          }
        }
        return (nbVictoire/this.nombreParties)*100
      }
  },
  methods : {
    ...mapGetters(['getLastGame']),
    ...mapGetters(['getAll']),

  }
}

</script>

<style scoped>

h1{
  color: aliceblue;
}
h3{
  color:cadetblue;
}
.table{
  color : beige;
}
p{
  color:blanchedalmond;
}

</style>