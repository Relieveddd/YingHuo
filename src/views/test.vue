<template>
  <div class="amount">
    <div style="display: flex">
      <span>￥</span>
      <transition-group name="list" tag="p">
        <p
          style="display: inline-block"
          v-for="(item, index) in todayAmountComputed"
          :key="item + index"
        >
          {{ item }}
        </p>
      </transition-group>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
const todayAmount = ref(0);
const platformSales1 = ref(4090013);
// const todayAmountComputed = (computed = () => {
//   return this.todayAmount.split("");
// });

// onMounted = () => {
//   setInterval(() => {
//     if (this.todayAmount === "0") {
//       this.todayAmount = "1000";
//     }
//     this.todayAmount = "" + Math.floor(Math.random() * 10000);
//   }, 2000);
// };
</script>
<style scoped>
* {
  margin: 0px;
  padding: 0px;
}

body,
html {
  min-width: 1920px;
  min-height: 1080px;
  width: 100%;
  height: 100%;
}

#app {
  position: relative;
}

.amount {
  color: gold;
  font-size: 85px;
  display: flex;
  justify-content: center;
}

.list-enter-active,
.list-leave-active {
  transition: transform 1s ease, opacity 1s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(50%);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(-50%);
}
</style>
