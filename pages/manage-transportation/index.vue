<template>
  <div>
    <div>
      <h1 class="text-[#4B4B4B] font-normal text-[12px] mb-5 cursor-pointer">
        TRANSPORTATION
      </h1>
    </div>
    <div>
      <OptionList
        labelText="Transportation list"
        buttonText="Add Transportation"
        listWidth="85%"
        @add="addTransportation"
        :isAddBtn="checkPermission?.add"
      />
    </div>
    <div class="mt-6">
      <TransportationTable
        :allData="allTransportationData"
        @deleteItem="removeTransportation"
        @handleClick="editTransportation"
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
import { mapActions, mapGetters } from "vuex";

export default {
  layout: "dashboard",
  data() {
    return {
      isModal: false,
      allTransportationData: [],
    };
  },
  computed: {
    ...mapGetters({
      getSinglePermission: "auth/getSinglePermission",
    }),
    checkPermission() {
      return this.getSinglePermission("Transportation");
    },
  },
  methods: {
    ...mapActions({
      fetchTransitInfo: "transitinfo/fetchTransitInfo",
      deleteTransportation: "transitinfo/deleteTransportation",
    }),
    editTransportation(id) {
      this.$router.push(`manage-transportation/edit-transportation/${id}`);
    },
    addTransportation() {
      this.$router.push("/manage-transportation/add-transportation");
    },
    closeModal() {
      this.isModal = false;
    },
    async handleDelete() {
      try {
        const res = await this.deleteTransportation({
          id: this.selectedId,
        });
        this.$toast.open({
          message: res?.msg,
        });
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
    async removeTransportation(id) {
      this.isModal = true;
      this.selectedId = id;
    },
    async getTransitInfo() {
      try {
        const res = await this.fetchTransitInfo();
        this.allTransportationData = res?.data?.typeOfTransportation;
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
