<template>
    <div>
        <div>
            <OptionList  labelText="Carrier list" buttonText="Add Carrier" listWidth="86%"/>
        </div>
        <div class="mt-6">
          <CarrierActionButton />
        </div>
        <CarrierList />
    </div>
</template>

<script>
export default {
    layout:'dashboard'
}
</script>