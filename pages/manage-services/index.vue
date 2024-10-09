<template>
  <div>
    <div>
      <h1 class="text-[#4B4B4B] font-normal text-[12px] mb-5 cursor-pointer">
        SERVICES
      </h1>
    </div>
    <div>
      <OptionList
        labelText="Service list"
        buttonText="Add Service"
        listWidth="86%"
        @add="addService"
      />
    </div>
    <div class="mt-4">
      <ServicesTable
        :allData="allServiceData"
        @deleteItem="removeService"
        @handleClick="editService"
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
      allServiceData: [],
    };
  },
  methods: {
    ...mapActions({
      fetchTransitInfo: "transitinfo/fetchTransitInfo",
      deleteService: "transitinfo/deleteService",
    }),
    editService(id) {
      this.$router.push(`manage-services/edit-service/${id}`);
    },
    addService() {
      this.$router.push("/manage-services/add-service");
    },
    closeModal() {
      this.isModal = false;
    },
    async handleDelete() {
      try {
        const res = await this.deleteService({
          id: this.selectedId,
        });
        this.$toast.open({
          message: res.msg,
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
    removeService(id) {
      this.isModal = true;
      this.selectedId = id;
    },
    async getTransitInfo() {
      try {
        const res = await this.fetchTransitInfo();
        this.allServiceData = res?.data?.typeOfService;
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
