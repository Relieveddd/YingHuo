<!-- <template>
  <div>父组件方法一</div>
  <p>{{ message }}</p>
  <child :message="message" @changeMessage="message = $event" />
</template>
<script>
import child from "./child.vue";
export default {
  components: {
    child,
  },
  data() {
    return {
      message: "Hallo 哈默！",
    };
  },
};
</script> -->
<!-- <template>
  <div>父组件方法二</div>
  <p>{{ message }}</p>
  <child :message="message" :changeMsgFn="changeMessage" />
</template>
<script>
import child from "./child.vue";
export default {
  components: {
    child,
  },
  data() {
    return {
      message: "Hallo 哈默！",
    };
  },
  methods: {
    changeMessage() {
      this.message = "Bye";
    },
  },
};
</script> -->
<!-- <template>
  <div>父组件方法三</div>
  <p>{{ message }}</p>
  <child @click="changeChildNum" />
</template>
<script>
import child from "./child.vue";
export default {
  components: {
    child,
  },
  data() {
    return {
      message: "Hallo 哈默！",
    };
  },
  methods: {
    changeChildNum() {
      this.$children[0].number = 50;
    },
  },
};
</script> -->
<template>
  <div>父组件方法四</div>
  <p>{{ message }}</p>
  <child @click="changeChildNum" />
</template>
<script>
import child from "./child.vue";
export default {
  components: {
    child,
  },
  provide: {
    message: "halohalo 哈默",
  },
};
</script>
-->
