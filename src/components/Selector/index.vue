<template>
  <div class="selector" v-focus>
    <SelectorInput :placeholder="placeholder" />
    <SelectorMenu :data="menuData" />
  </div>
</template>

<script>
import SelectorInput from "./input.vue";
import focus from "./directives/focus.js";
import SelectorMenu from "./Menu.vue";
import menuData from "../data/selector";
export default {
  name: "Selector",
  props: {
    placeholder: String,
  },
  directives: {
    focus,
  },
  components: {
    SelectorInput,
  },
  setup() {
    return { menuData };
  },
};
</script>

<style lang="scss" scoped>
.selector {
  position: relative;
  width: 300px;
}
</style>
