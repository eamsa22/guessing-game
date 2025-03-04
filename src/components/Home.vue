<template>
  <div>
    <h1 class="paragrapheTitle">Guessing game</h1>
    <div>
      <router-link to="/Game">
        <button id ="button-start-game" @click="startGame" class="buttons">Démarrer une partie </button>
      </router-link>
      <router-link to="/stats">
        <button id="button-stat" @click="viewPreviousGames" class="buttons"> Consulter parties précédentes </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name : "Home" ,
  methods : {
    startGame:function() {
      this.addNewGame({id:0,mot:"",date:new Date(),isVictoire:false,nombreTentatives:0,tempsJeu:0.0})
    },
    ...mapMutations(['addNewGame']),
  }
};
</script>

<style>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.buttons{
  background-color:cornflowerblue;
  color:white;
  text-align: center;
  font-weight: bold;
  border-color: cornflowerblue;
  width: 300px;
  margin-top: 20px;
}
.paragrapheTitle{
  font-weight: bold;
  color: white;
  margin-top: 10px;
}
</style>
