<!-- <template>
  <div>
    <p>孩子方法一</p>
    <p>{{ message }}</p>
    <button @click="handleClick">按钮</button>
  </div>
</template>
<script>
export default {
  props: ["message"],
  methods: {
    handleClick() {
      this.$emit("changeMessage", "Bye");
    },
  },
};
</script> -->
<!-- <template>
  <div>
    <p>孩子方法二</p>
    <p>{{ message }}</p>

    <button @click="changeMsgFn">按钮</button>
  </div>
</template>
<script>
export default {
  props: ["message", "changeMsgFn"],
};
</script> -->
<!-- <template>
  <div>
    <p>孩子方法三</p>
    <p>{{ number }}</p>
    <p>{{ parentMessage }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      number: 10,
    };
  },
  computed: {
    parentMessage() {
      return this.$parent.message;
    },
  },
};
</script> -->
<!-- <template>
  <div>
    <p>孩子方法四</p>
    <p>{{ message }}</p>
  </div>
</template>
<script>
export default {
  inject: ["message"],
};
</script> -->
