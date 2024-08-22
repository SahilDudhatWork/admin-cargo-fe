<template>
    <div>
        <div>
            <button class="bg-[#3683D5] rounded-lg text-white font-medium text-[12px] py-[5px] px-3" @click="toggleButton('All')">All</button>
            <button class="bg-[#E6F0FA] rounded-lg text-[#4B4B4B] font-medium text-[12px] py-[5px] px-4" @click="toggleButton('addCarrier')">Newly added Carriers</button>
            <button class="bg-[#E6F0FA] rounded-lg text-[#4B4B4B] font-medium text-[12px] py-[5px] px-[15px]" @click="toggleButton('blockCarrier')">Blocked Carriers</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isButton:"All"
        }
    },
    methods:{
    toggleButton(type) {
      this.isButton = type === "All";
    },
    }
}

</script>
