<template>
<div>
    <button @click="toggleDropdown" class="dropdown-list relative bg-white mx-0 text-[#5B638B] font-semibold rounded-lg text-base py-[14px] w-full xl:w-[382px] text-center inline-flex justify-between px-2" :class="isDropdown ? ' border-t border-r border-l rounded-none' : 'border'" type="button">
        <span class="flex gap-2 justify-between">
            <span>{{ selectedLabel }}</span>
            <svg v-if="isDropdown" class="absolute right-2 top-4" fill="#000000" height="20" width="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.40832 13.1583C4.48579 13.2364 4.57796 13.2984 4.67951 13.3407C4.78106 13.383 4.88998 13.4048 4.99999 13.4048C5.11 13.4048 5.21892 13.383 5.32047 13.3407C5.42202 13.2984 5.51419 13.2364 5.59166 13.1583L9.40832 9.34163C9.48579 9.26352 9.57796 9.20153 9.67951 9.15922C9.78106 9.11691 9.88998 9.09513 9.99999 9.09513C10.11 9.09513 10.2189 9.11691 10.3205 9.15922C10.422 9.20153 10.5142 9.26352 10.5917 9.34163L14.4083 13.1583C14.4858 13.2364 14.578 13.2984 14.6795 13.3407C14.7811 13.383 14.89 13.4048 15 13.4048C15.11 13.4048 15.2189 13.383 15.3205 13.3407C15.422 13.2984 15.5142 13.2364 15.5917 13.1583C15.7469 13.0022 15.834 12.7909 15.834 12.5708C15.834 12.3506 15.7469 12.1394 15.5917 11.9833L11.7667 8.1583C11.2979 7.69013 10.6625 7.42717 9.99999 7.42717C9.33749 7.42717 8.70207 7.69013 8.23332 8.1583L4.40832 11.9833C4.25311 12.1394 4.16599 12.3506 4.16599 12.5708C4.16599 12.7909 4.25311 13.0022 4.40832 13.1583Z" fill="#1E1E1E" />
            </svg>
            <svg v-else class="absolute right-2 top-4" fill="#000000" height="17" width="17" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 330.002 330.002" xml:space="preserve">
                <path id="XMLID_229_" d="M327.001,99.751c-4.971-6.628-14.374-7.971-21-3l-140.997,105.75L24.001,96.751
                        c-6.628-4.971-16.029-3.626-21,3c-4.971,6.627-3.627,16.03,3,21l150.004,112.5c2.667,2,5.833,3,9,3c3.166,0,6.333-1,9-3
                        l149.996-112.5C330.628,115.781,331.972,106.379,327.001,99.751z" />
            </svg>
            <svg v-if="isSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="Downarrow" width="20" height="20">
                <path d="M16 22a2 2 0 0 1-1.41-.59l-10-10a2 2 0 0 1 2.82-2.82L16 17.17l8.59-8.58a2 2 0 0 1 2.82 2.82l-10 10A2 2 0 0 1 16 22Z" fill="#5B638B" class="color000000 svgShape">
                </path>
            </svg>
        </span>
    </button>
    <div v-if="isDropdown" v-click-outside="closeDropdown" class="z-50 bg-white rounded-lg shadow  xl:w-[382px] w-full dark:bg-gray-700">
        <ul class="text-sm text-gray-700 dark:text-gray-200 cursor-pointer">
            <li v-for="(item,index) in items" :key="index">
                <a @click.prevent="selectItem(item,index)">
                    <span class="block px-4 py-[16px] font-medium border border-gray-200">
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
    },
    data() {
        return {
            isDropdown: false
        }
    },
    methods: {
        closeDropdown() {
            this.isDropdown = false
        },
        toggleDropdown() {
            this.isDropdown = !this.isDropdown;
            if (this.isDropdown) {
                this.$nextTick(() => {
                    this.$el.querySelector('.dropdown-list').scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                });
            }
        },
        selectItem(item) {
            this.isDropdown = false;
            this.$emit("getValue", item);
        },
    },
}
</script>
