<template>
  <div class="game">
    <div class="paragraphe">
      <p class="col">Tentatives restantes: {{ tentativesRestantes }}</p>
      <p class="col" v-if="tentativesRestantes < 6">Statut dernière tentative: {{ statutDerniere }}</p>
    </div>

    <Chrono ref="chrono" />

    <br />

    <div class="paragraphe">
      <p>Saisir le mot !</p>
    </div>

    <div class="table-container">
      <div class="table-responsive">
        <Case
            v-for="(caseValeur, index) in inputValues"
            :key="index"
            :value="caseValeur"
            :indiceCase="index"
            @updateValue="modifierCase"
        />
      </div>
    </div>

    <key-board
        :disabled="isVictoire"
        :nbLettres="nbLettres"
        :lettresCorrectes="lettresCorrectes"
        :lettresMalPlaces="lettresMalplaces"
        @key-clicked="onKeyClicked"
        @valider-clicked="validerSaisie"
        @supprimer-lettre="supprimerLettre"
    />

    <button id="button-abandonner" class="buttons" @click="goToResult" :disabled="isVictoire">
      Abandonner la partie
    </button>

    <p class="paragraphe" v-if=" hasTried && !isWord">Le mot saisi n'est pas dans la liste</p>
    <p class="paragraphe" v-if="isVictoire">Victoire!</p>
  </div>
</template>

<script>
import Chrono from "./Chrono.vue";
import KeyBoard from "./KeyBoard.vue";
import Case from "./Case.vue";
import axios from "axios";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Game",
  components: { KeyBoard, Chrono, Case },

  data() {
    return {
      motADeviner: "",
      motSaisi: "",
      isWord: false,
      hasTried: false,
      lettresMalplaces: [],
      lettresCorrectes: [],
      isVictoire: false,
      tentativesRestantes: 6,
      statutDerniere: "",
      inputValues: ["-", "-", "-", "-", "-"],
      indiceModif: null,
      modifier: false,
      indiceInput: 0,
      nbLettres: 0,
    };
  },

  computed: {
    id() {
      return this.$store.getters.getLastGame;
    },
  },

  mounted() {
    this.$refs.chrono?.startChronometer();
    this.getMot();
  },

  methods: {
    ...mapGetters(["getLastGame"]),
    ...mapMutations(["updateNewGame"]),

    async getMot() {
      try {
        const response = await axios.get("https://vue-project-backend-eta.vercel.app/api/new-game");
        this.motADeviner = response.data.word.toUpperCase();
        console.log("Mot à deviner :", this.motADeviner);
      } catch (error) {
        console.error("Erreur lors de la récupération du mot:", error);
      }
    },

    modifierCase(indiceCase) {
      this.indiceModif = indiceCase;
      this.modifier = true;
    },

    onKeyClicked(value) {
      if (this.modifier) {
        this.inputValues[this.indiceModif] = value;
        this.modifier = false;
        this.indiceModif = null;
      } else {
        this.ajouterLettre(value);
      }
    },

    ajouterLettre(value) {
      if (this.indiceInput < 5) {
        while (this.inputValues[this.indiceInput] !== "-" && this.indiceInput < 5) {
          this.indiceInput++;
        }
        this.inputValues[this.indiceInput] = value;
        this.nbLettres++;
        this.indiceInput++;
      }
    },

    async validerSaisie() {
      this.motSaisi = this.inputValues.join("").toLowerCase();

      try {
        const { data } = await axios.post("https://vue-project-backend-eta.vercel.app/api/check-word", {
          word: this.motSaisi,
        });

        this.isWord = data.isWord;

        if (this.isWord) {
          this.verifierMot();
        } else {
          this.gererMotInvalide();
        }
      } catch (error) {
        console.error("Erreur lors de la validation du mot:", error);
      }
    },

    verifierMot() {
      this.hasTried = true;
      if (this.motSaisi.toLowerCase() === this.motADeviner.toLowerCase()) {
          this.gagnerPartie();
      } else {
        this.perdreTentative();
      }
    }
,

    gererMotInvalide() {
      if (this.tentativesRestantes > 0) {
        this.statutDerniere = "Mot saisi invalide !";
        this.tentativesRestantes--;
        this.reinitialiserSaisie();
      } else {
        this.finDePartie(false);
      }
    },

    perdreTentative() {
      if (this.tentativesRestantes > 1) {
        this.statutDerniere = "Mauvais mot!";
        this.tentativesRestantes--;
        this.analyserLettres();
      } else {
        this.finDePartie(false);
      }
    }
,

    gagnerPartie() {
      this.isVictoire = true;
      this.lettresCorrectes = [...this.inputValues];
      this.finDePartie(true);
    },

    analyserLettres() {
      this.lettresCorrectes = [];
      this.lettresMalplaces = [];

      for (let i = 0; i < 5; i++) {
        const lettre = this.inputValues[i];

        if (lettre === this.motADeviner[i]) {
          this.lettresCorrectes.push(lettre);
        } else if (this.motADeviner.includes(lettre) && !this.lettresCorrectes.includes(lettre)) {
          if (!this.lettresMalplaces.includes(lettre)) {
            this.lettresMalplaces.push(lettre);
          }
        }
      }
      this.lettresCorrectes = [...this.lettresCorrectes];
      this.lettresMalplaces = [...this.lettresMalplaces];
    }

    ,

    reinitialiserSaisie() {
      this.inputValues = ["-", "-", "-", "-", "-"];
      this.indiceInput = 0;
      this.nbLettres = 0;
    },

    supprimerLettre() {
      if (this.indiceInput > 0) {
        this.indiceInput--;
        this.inputValues[this.indiceInput] = "-";
        this.nbLettres--;
      }
    },
    finDePartie(victoire) {
      const newGame = {
        id: this.id,
        mot: this.motADeviner,
        isVictoire: victoire,
        tempsJeu: 600 - this.$refs.chrono.totalMilliseconds / 1000,
        nombreTentatives: 6 - this.tentativesRestantes + 1,
      };

      this.$store.commit("updateNewGame", newGame);
      this.$refs.chrono.stopChronometer();

      setTimeout(() => {
        this.$router.push({ name: "result", params: { victoire: victoire ? "victoire" : "defaite" } });
      }, 2000);
    },

    goToResult() {
      this.finDePartie(false);
    },
  },
};
</script>

<style scoped>
.game {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.paragraphe{
  color: white ;
  font-weight: bold;
}

</style>
