<template>
    <div>
        <div>
            <button :class="activeButton === 'all' ? 'bg-[#3683D5] text-white' : 'bg-[#E6F0FA] text-[#4B4B4B]'" class="rounded-lg font-medium text-[12px] py-[5px] px-3" @click="actionButton('all')">All</button>
            <button :class="activeButton === 'newAddedCarriers' ? 'bg-[#3683D5] text-white' : 'bg-[#E6F0FA] text-[#4B4B4B]'" class="rounded-lg font-medium text-[12px] py-[5px] px-4" @click="actionButton('newAddedCarriers')">Newly added Carriers</button>
            <button :class="activeButton === 'blockedCarriers' ? 'bg-[#3683D5] text-white' : 'bg-[#E6F0FA] text-[#4B4B4B]'" class="rounded-lg font-medium text-[12px] py-[5px] px-[15px]" @click="actionButton('blockedCarriers')">Blocked Carriers</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeButton: 'all'
        }
    },
    methods:{
        actionButton(type){
            this.activeButton = type;
            this.$emit('add',type)
        },
    }
}

</script>
