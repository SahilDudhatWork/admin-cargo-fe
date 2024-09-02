<template>
  <div>
    <div>
      <button
        :class="
          activeButton === 'all'
            ? 'bg-[#3683D5] text-white'
            : 'bg-[#E6F0FA] text-[#4B4B4B]'
        "
        @click="actionButton('all')"
        class="rounded-lg font-medium text-[12px] py-[5px] px-3"
      >
        All
      </button>
      <button
        :class="
          activeButton === 'recent'
            ? 'bg-[#3683D5] text-white'
            : 'bg-[#E6F0FA] text-[#4B4B4B]'
        "
        @click="actionButton('recent')"
        class="rounded-lg font-medium text-[12px] py-[5px] px-4"
      >
        New Requests
      </button>
      <button
        :class="
          activeButton === 'blocked'
            ? 'bg-[#3683D5] text-white'
            : 'bg-[#E6F0FA] text-[#4B4B4B]'
        "
        @click="actionButton('blocked')"
        class="rounded-lg font-medium text-[12px] py-[5px] px-[15px]"
      >
        Blocked
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeButton: "all",
    };
  },
  methods: {
    actionButton(type) {
      this.activeButton = type;
      this.$emit("add", type);
    },
  },
};
</script>
