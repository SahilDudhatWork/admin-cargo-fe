<template>
  <div>
    <button
      @click="toggleDropdown"
      class="dropdown-list relative bg-white mx-0 text-[#5B638B] font-semibold rounded-lg text-base py-1.5 w-[140px] text-center inline-flex justify-between px-2"
      :class="[
        isDropdown ? ' border-t border-r border-l rounded-t-lg' : 'border',
        !computedIsDisabled ? 'bg-white' : 'bg-[#efefef4d]',
      ]"
      type="button"
      :disabled="computedIsDisabled"
    >
      <span class="flex gap-2 justify-between">
        <span>{{ selectedLabel || "Select option" }}</span>
        <img
          src="@/static/svg/up-arrow.svg"
          alt=""
          v-if="computedIsDisabled"
          class="absolute right-3 top-5"
        />
        <div v-else>
          <img
            v-if="!computedIsDisabled"
            src="@/static/svg/down-arrow.svg"
            alt=""
            class="absolute right-4 top-4"
          />
        </div>
      </span>
    </button>
    <div
      v-if="isDropdown"
      v-click-outside="closeDropdown"
      class="!z-[999] bg-white rounded-lg shadow-md w-[140px] absolute"
    >
      <ul class="text-sm text-gray-700 cursor-pointer mb-2">
        <li v-for="(item, index) in items" :key="index">
          <a @click.prevent="selectItem(item, index)">
            <span class="block px-4 py-2.5 font-medium hover:bg-gray-100">
              {{ item.label }}
            </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    selectedLabel: {
      type: String,
      required: true,
    },
    isSvg: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedIsDisabled() {
      return this.isDisabled || this.items.length === 0;
    },
  },
  data() {
    return {
      isDropdown: false,
    };
  },
  methods: {
    closeDropdown() {
      this.isDropdown = false;
    },
    toggleDropdown() {
      if (this.computedIsDisabled) return;
      this.isDropdown = !this.isDropdown;
      // if (this.isDropdown) {
      //   this.$nextTick(() => {
      //     this.$el.querySelector(".dropdown-list").scrollIntoView({
      //       behavior: "smooth",
      //       block: "start",
      //     });
      //   });
      // }
    },
    selectItem(item) {
      this.isDropdown = false;
      this.$emit("getValue", item);
    },
  },
};
</script>
