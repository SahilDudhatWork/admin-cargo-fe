<template>
  <div>
    <div>
      <h1 class="text-[#4B4B4B] font-normal text-[12px] mb-5 cursor-pointer">
        SECURING EQUIPMENT
      </h1>
    </div>
    <div>
      <OptionList
        labelText="Securing Equipment list"
        buttonText="Add Securing Equipment"
        listWidth="81%"
        @add="addsecuringEquipment"
      />
    </div>
    <div class="mt-6">
      <SecuringEquipmentTable
        :allData="allSecuringEquipmentData"
        @handleClick="editSecuringEquipment"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  layout: "dashboard",
  data() {
    return {
      allSecuringEquipmentData: {},
      flattenedData: [],
    };
  },
  methods: {
    ...mapActions({
      fetchTransitInfo: "transitinfo/fetchTransitInfo",
    }),
    editSecuringEquipment() {
      this.$router.push("/securing-equipment/edit-securing-equipment");
    },
    addsecuringEquipment() {
      this.$router.push("/securing-equipment/add-securing-equipment");
    },
    closeModal() {
      this.isModal = false;
    },
    async getTransitInfo() {
      try {
        const res = await this.fetchTransitInfo();
        this.allSecuringEquipmentData = res?.data?.securingEquipment;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted() {
    await this.getTransitInfo();
  },
};
</script>
