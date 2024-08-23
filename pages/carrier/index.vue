<template>
    <div>
        <div>
            <h1 class="text-[#4B4B4B] font-normal text-[12px] mb-5 cursor-pointer"><nuxt-link to="/carrier">CARRIER</nuxt-link></h1>
        </div>
        <div>
            <OptionList  labelText="Carrier list" buttonText="Add Carrier" listWidth="86%" @add="addCarrier"/>
        </div>
        <div class="mt-6">
          <CarrierActionButton @add="allActionButtons"/>
        </div>
        <CarrierList />
    </div>
</template>

<script>
export default {
    layout:'dashboard',
    methods: {
        allActionButtons(type){
            console.log(type);
        },
        addCarrier(){
            this.$router.push('/carrier/add-carrier')
        }
    },
}
</script>