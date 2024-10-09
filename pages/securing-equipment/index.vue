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
        listWidth="70%"
        @add="addsecuringEquipment"
      />
    </div>
    <div class="mt-6">
      <SecuringEquipmentTable
        :allData="allSecuringEquipmentData"
        @deleteItem="removeSecuringEquipment"
        @handleClick="editSecuringEquipment"
      />
      <DeleteAlertModal
        :isModal="isModal"
        @handleSubmit="handleDelete"
        @close="closeModal"
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
      isModal: false,
      allSecuringEquipmentData: {},
      flattenedData: [],
    };
  },
  methods: {
    ...mapActions({
      fetchTransitInfo: "transitinfo/fetchTransitInfo",
      deleteModeOfTransportation: "transitinfo/deleteModeOfTransportation",
    }),
    editSecuringEquipment() {
      this.$router.push("/securing-equipment/edit-securing-equipment");
    },
    addsecuringEquipment() {
      this.$router.push("/securing-equipment/add-securing-equipment");
    },
    async handleDelete() {
      try {
        await this.getTransitInfo();
        this.isModal = false;
      } catch (error) {
        console.log(error, "error");
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    closeModal() {
      this.isModal = false;
    },
    async removeSecuringEquipment(id) {
      this.isModal = true;
      this.selectedId = id;
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
