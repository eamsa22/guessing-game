<template>
  <div :id="'case' + indiceCase" :class="{ 'case': true, 'clicked': isClicked }" @click="onClick">
    {{ value }}
  </div>
</template>

<script>
export default {
  name: "Case",
  props: {
    value: {
      type: String,
    },
    indiceCase: {
      type: Number,
    },
  },
  data() {
    return {
      isClicked: false,
    };
  },
  methods: {
    onClick() {
      this.isClicked = true;
      this.$emit("updateValue", this.indiceCase);

      setTimeout(() => {
        this.isClicked = false;
      }, 2000);
    },
  },
};
</script>

<style scoped>
.case {
  color: black;
  font-weight: bold;
  background-color: white;
  border-color: white;
  width: 40px;
  height: 40px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;
  margin-top: 10px;
}

.clicked {
  background-color: lightblue;
}
</style>
