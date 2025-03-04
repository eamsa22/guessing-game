<template>
  <div>
    <p style="color: white; font-weight: bold">Temps restant</p>
    <div :class="{ chronoOn: !timeOut, chronoOff: timeOut }">
      <p class="chrono-time">{{ formattedTime }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chrono",
  data() {
    return {
      totalSeconds:0,
      totalMilliseconds: 600000,
      timerInterval: null,
      stopped: false,
      timeOut: false,
    };
  },
  computed: {
    formattedTime() {
      const minutes = Math.floor(this.totalMilliseconds / (60 * 1000));
      const seconds = Math.floor((this.totalMilliseconds % (60 * 1000)) / 1000);

      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    },
  },
  created() {
    console.log("Le composant Chrono a été créé.");
    this.startChronometer();
  },
  beforeDestroy() {
    this.stopChronometer();
  },
  methods: {
    startChronometer() {
      this.timerInterval =setInterval(this.updateTimer, 1)
    },
    updateTimer(){
      if (this.totalMilliseconds > 0 && !this.stopped) {
        this.totalMilliseconds -=10;
      } else if (this.totalMilliseconds <= 0) {
        this.stopChronometer();
        console.log("Countdown completed!");
        this.timeOut = true;
        setTimeout(() => {
          this.$router.push({ name: "result", params: { victoire: "defaite" } });
        }, 2000);
      }
    },
    stopChronometer() {
      this.stopped = true;
      clearInterval(this.timerInterval);
      console.log("Chronometer stopped");
    },
  },
};
</script>

<style scoped>
.chronoOn {
  background-color: cornflowerblue;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  color: white;
  font-size: 18px;
  width: 150px;
}
.chronoOff {
  background-color: red;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  color: white;
  font-size: 18px;
  width: 150px;
}
.chrono-time {
  margin: 0;
  font-weight: bold;
}
</style>
