<template>
  <div>
    <div>
      <h1 class="text-[#4B4B4B] font-normal text-[12px] mb-5 cursor-pointer">
        <nuxt-link to="/carrier">CARRIER</nuxt-link>
      </h1>
    </div>
    <div>
      <OptionList
        labelText="Carrier list"
        buttonText="Add Carrier"
        listWidth="86%"
        @add="addCarrier"
      />
    </div>
    <div class="mt-6">
      <CarrierActionButton @add="allActionButtons" />
    </div>
    <div>
      <CarrierTable
        :allData="allCarrierData"
        :paginationText="paginationText"
        @handleVerify="handleVerify"
        @deleteItem="removeCarrier"
        @handleClick="editCarrier"
        @firstPage="firstPage"
        @prevPage="prevPage"
        @nextPage="nextPage"
        @lastPage="lastPage"
      />
      <DeleteAlertModal
        :isModal="isModal"
        @handleSubmit="handleSubmit"
        @close="closeModal"
      />
    </div>
    <!-- <CarrierList /> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  layout: "dashboard",
  data() {
    return {
      isModal: false,
      selectedItem: null,
      sortBy: "all",
    };
  },
  computed: {
    ...mapGetters({
      allCarrierData: "carrier/getAllCarrierData",
      carrierPaginationData: "carrier/getCarrierPaginationData",
    }),
    paginationText() {
      return this.generatePaginationText(this.carrierPaginationData);
    },
  },
  methods: {
    ...mapActions({
      fetchAllCarrier: "carrier/fetchAllCarrier",
      carrierVerified: "carrier/carrierVerified",
      carrierUnVerify: "carrier/carrierUnVerify",
      deleteCarrier: "carrier/deleteCarrier",
    }),
    async allActionButtons(type) {
      try {
        this.sortBy = type;

        const res = await this.fetchAllCarrier({ sortBy: this.sortBy });
      } catch (error) {
        this.$toast.open({
          message: error?.response?.data?.msg,
          type: "error",
        });
      }
    },
    editCarrier(item) {
      this.$router.push(`carrier/edit-carrier/${item._id}`);
    },
    addCarrier() {
      this.$router.push("/carrier/add-carrier");
    },
    closeModal() {
      this.isModal = false;
    },
    generatePaginationText(pagination) {
      const { current_page, limit, total } = pagination;

      const start = (current_page - 1) * limit + 1;
      const end = Math.min(current_page * limit, total);

      return `${start}-${end} of ${total}`;
    },
    async prevPage() {
      try {
        const res = await this.fetchAllCarrier({
          sortBy: this.sortBy,
          page: this.carrierPaginationData.current_page - 1,
          limit: this.carrierPaginationData.limit,
        });
      } catch (error) {
        this.$toast.open({
          message: error?.response?.data?.msg,
          type: "error",
        });
      }
    },
    async nextPage() {
      try {
        const res = await this.fetchAllCarrier({
          sortBy: this.sortBy,
          page: this.carrierPaginationData.current_page + 1,
          limit: this.carrierPaginationData.limit,
        });
      } catch (error) {
        this.$toast.open({
          message: error?.response?.data?.msg,
          type: "error",
        });
      }
    },
    async firstPage() {
      try {
        const res = await this.fetchAllCarrier({
          sortBy: this.sortBy,
          page: 1,
          limit: this.carrierPaginationData.limit,
        });
      } catch (error) {
        this.$toast.open({
          message: error?.response?.data?.msg,
          type: "error",
        });
      }
    },
    async lastPage() {
      try {
        const res = await this.fetchAllCarrier({
          sortBy: this.sortBy,
          page: this.carrierPaginationData?.total_page,
          limit: this.carrierPaginationData.limit,
        });
      } catch (error) {
        this.$toast.open({
          message: error?.response?.data?.msg,
          type: "error",
        });
      }
    },
    async handleSubmit() {
      try {
        const response = await this.deleteCarrier({ id: this.selectedId });
        this.$toast.open({
          message: response.msg,
        });
        this.isModal = false;
      } catch (error) {
        this.$toast.open({
          message: error?.response?.data?.msg,
          type: "error",
        });
      }
    },
    removeCarrier(id) {
      this.isModal = true;
      this.selectedId = id;
    },
    async handleVerify(item) {
      try {
        if (item.verifyByAdmin) {
          try {
            const res = await this.carrierUnVerify(item);
            this.$toast.open({
              message: res.msg,
            });
          } catch (error) {
            this.$toast.open({
              message: error?.response?.data?.msg,
              type: "error",
            });
          }
        } else {
          try {
            const res = await this.carrierVerified(item);
            this.$toast.open({
              message: res.msg,
            });
          } catch (error) {
            this.$toast.open({
              message: error?.response?.data?.msg,
              type: "error",
            });
          }
        }
      } catch (error) {
        this.$toast.open({
          message: error?.response?.data?.msg,
          type: "error",
        });
      }
    },
  },
  async mounted() {
    try {
      const res = await this.fetchAllCarrier({ sortBy: this.sortBy });
    } catch (error) {
      this.$toast.open({
        message: error?.response?.data?.msg,
        type: "error",
      });
    }
  },
};
</script>
