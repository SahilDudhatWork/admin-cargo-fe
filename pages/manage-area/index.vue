<template>
  <div>
    <div>
      <h1 class="text-[#4B4B4B] font-normal text-[12px] mb-5 cursor-pointer">
        AREA
      </h1>
    </div>
    <div>
      <OptionList
        labelText="Area list"
        buttonText="Add Area"
        listWidth="92%"
        @add="addArea"
        :isAddBtn="checkPermission?.add"
      />
    </div>
    <div class="mt-4">
      <AreaTable
        :allData="allArea"
        @deleteItem="deleteAreaConfirm"
        @handleClick="editArea"
        :paginationText="paginationText"
        :areaPaginationData="areaPaginationData"
        @firstPage="firstPage"
        @prevPage="prevPage"
        @nextPage="nextPage"
        @lastPage="lastPage"
        :isEditBtn="checkPermission?.edit"
        :isDeleteBtn="checkPermission?.delete"
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
      allArea: [],
      areaPaginationData: {},
      selectedId: "",
    };
  },
  computed: {
    ...mapGetters({
      getSinglePermission: "auth/getSinglePermission",
    }),
    paginationText() {
      return this.generatePaginationText(this.areaPaginationData);
    },
    checkPermission() {
      return this.getSinglePermission("City Management");
    },
  },
  methods: {
    ...mapActions({
      fetchAreas: "coordinate/fetchAreas",
      deleteArea: "coordinate/deleteArea",
    }),
    generatePaginationText(pagination) {
      const { current_page, limit, total } = pagination;

      const start = (current_page - 1) * limit + 1;
      const end = Math.min(current_page * limit, total);

      return `${start}-${end} of ${total}`;
    },
    editArea(id) {
      this.$router.push(`manage-area/edit-area/${id}`);
    },
    addArea() {
      this.$router.push("/manage-area/add-area");
    },
    closeModal() {
      this.isModal = false;
    },
    async handleDelete() {
      try {
        const res = await this.deleteArea({
          id: this.selectedId,
        });
        this.$toast.open({
          message: res.msg,
        });
        await this.getAreas();
        this.isModal = false;
      } catch (error) {
        console.log(error, "error");
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    deleteAreaConfirm(id) {
      this.isModal = true;
      this.selectedId = id;
    },
    async getAreas(payload = {}) {
      try {
        let { page, limit } = payload;
        page = page || 1;
        limit = limit || 10;
        const res = await this.fetchAreas({
          page: page,
          limit: limit,
        });
        this.allArea = res.data.response;
        this.areaPaginationData = res.data.pagination;
      } catch (error) {
        console.log(error);
      }
    },
    async prevPage() {
      try {
        await this.getAreas({
          page: this.areaPaginationData.current_page - 1,
          limit: this.areaPaginationData.limit,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async nextPage() {
      try {
        await this.getAreas({
          page: this.areaPaginationData.current_page + 1,
          limit: this.areaPaginationData.limit,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async firstPage() {
      try {
        await this.getAreas({
          page: 1,
          limit: this.areaPaginationData.limit,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async lastPage() {
      try {
        await this.getAreas({
          page: this.areaPaginationData?.total_page,
          limit: this.areaPaginationData.limit,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
  },
  async mounted() {
    try {
      await this.getAreas();
    } catch (error) {
      console.log(error);
      this.$toast.open({
        message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
        type: "error",
      });
    }
  },
};
</script>
