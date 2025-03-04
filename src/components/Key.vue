<!-- Key.vue -->
<template>
  <button :id="'touche' + value" @click="onKeyClick" :class="{ key: true, correct: isCorrect , wrongPlace: isWrongPlace}" :disabled= "disabled" >{{value}}</button>
</template>

<script>
export default {
  props: {
    value: String,
    isCorrect: Boolean,
    isWrongPlace:Boolean,
    disabled:false
  },
  methods: {
    onKeyClick() {
      this.$emit('key-clicked', this.value);
    },
  },
};
</script>

<style scoped>
.key {
  background-color:cornflowerblue;
  color:white;
  width: 50px;
  height: 50px;
  display: inline-block;
  text-align: center;
  line-height: 50px;
  margin: 5px;
  cursor: pointer;
  font-weight: bold;
  border-color: cornflowerblue;
}

.correct {
  background-color: green;
  color: white;
}
.wrongPlace {
  background-color: coral;
  color: white;
}
</style>
