<template>
  <div>
    <div class="relative">
      <button
        @click="toggleDropdown"
        class="dropdown-list relative mx-0 font-normal rounded-lg text-base focus:outline-none py-[14px] mt-[2px] text-center inline-flex justify-between w-20"
        :class="[
          selectedLabel === 'Select option'
            ? 'text-[#989898]'
            : 'text-[#1E1E1E]',
        ]"
        type="button"
      >
        <span class="flex items-center gap-3 ml-3">
          <img
            src="@/static/svg/usa-flag.svg"
            alt=""
            class="w-6 h-6"
            v-if="selectedLabel === 1"
          />
          <img
            src="@/static/svg/mexico.svg"
            alt=""
            class="w-6 h-6"
            v-if="selectedLabel === 52"
          />
          <span class="flex">
            <span>+</span> <span>{{ selectedLabel }}</span>
          </span>
        </span>
      </button>
      <div
        v-if="isDropdown"
        v-click-outside="closeDropdown"
        class="!z-[999] bg-white rounded-lg shadow-lg w-full dark:bg-gray-700 absolute"
      >
        <ul class="text-base text-gray-700 cursor-pointer">
          <li>
            <a
              v-for="(item, key) in items"
              :key="key"
              @click.prevent="selectItem(item)"
              class="flex items-center gap-3 px-2 hover:bg-gray-100"
            >
              <img
                src="@/static/svg/usa-flag.svg"
                alt=""
                class="w-6 h-6"
                v-if="item.value === 1"
              />
              <img
                src="@/static/svg/mexico.svg"
                alt=""
                class="w-6 h-6"
                v-if="item.value === 52"
              />
              <span class="py-[10px] font-medium flex">
                <span>+</span> <span>{{ item.value }}</span>
              </span>
            </a>
          </li>
        </ul>
      </div>
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
      type: Number,
      default: 1,
      required: true,
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
      this.isDropdown = !this.isDropdown;
    },
    selectItem(items) {
      this.isDropdown = false;
      this.$emit("getValue", items);
    },
  },
};
</script>
