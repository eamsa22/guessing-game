<template>
  <div class="card keyboard" id="game-keyboard">
    <div class="table-responsive">
      <Key
          @key-clicked="onKeyClick"
          v-for="keyValue in keys1"
          :key="keyValue"
          :value="keyValue"
          :isCorrect="lettresCorrectes.includes(keyValue)"
          :isWrongPlace="!lettresCorrectes.includes(keyValue) && lettresMalPlaces.includes(keyValue)"
          :disabled="disabled"
      />
    </div>
    <div class="table-responsive">
      <Key
          @key-clicked="onKeyClick"
          v-for="keyValue in keys2"
          :key="keyValue"
          :value="keyValue"
          :isCorrect="lettresCorrectes.includes(keyValue)"
          :isWrongPlace="lettresMalPlaces.includes(keyValue) && !lettresCorrectes.includes(keyValue)"
          :disabled="disabled"
      />
    </div>
    <div class="table-responsive">
      <Key
          @key-clicked="onKeyClick"
          v-for="keyValue in keys3"
          :key="keyValue"
          :value="keyValue"
          :isCorrect="lettresCorrectes.includes(keyValue)"
          :isWrongPlace="lettresMalPlaces.includes(keyValue) && !lettresCorrectes.includes(keyValue)"
          :disabled="disabled"
      />
      <input
          id="button-valider"
          class="button"
          type="button"
          value="valider"
          :disabled="nbLettres < 5 || disabled"
          @click="validerMot"
      />
      <input
          class="button"
          type="button"
          value="supprimer"
          :disabled="nbLettres === 0 || disabled"
          @click="supprimerLettre"
      />
    </div>
  </div>
</template>

<script>
import Key from './Key.vue';

export default {
  name: "key-board",
  components: {
    Key,
  },
  data() {
    return {
      keys1: ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      keys2: ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M'],
      keys3: ['W', 'X', 'C', 'V', 'B', 'N'],
    };
  },
  props: {
    disabled: Boolean,
    lettresCorrectes: Array,
    lettresMalPlaces: Array,
    nbLettres: Number,
  },

  methods: {
    onKeyClick(value) {
      this.$emit('key-clicked', value);
    },
    validerMot() {
      this.$emit('valider-clicked');
    },
    supprimerLettre() {
      this.$emit('supprimer-lettre');
    }
  },
  emits: ['key-clicked', 'valider-clicked', 'supprimer-lettre'],
};
</script>

<style scoped>
.keyboard {
  display: flex;
  justify-content: center;
  margin: 30px;
}
.button {
  background-color: cornflowerblue;
  color: white;
  width: 110px;
  height: 49px;
  border-color: cornflowerblue;
  margin-right: 10px;
  cursor: pointer;
}
.button:disabled {
  background-color: rgb(128, 128, 128);
  border-color: rgb(128, 128, 128);
  cursor: not-allowed;
}
</style>
