<template>
  <div>
    <div>
      <h1 class="text-[#4B4B4B] font-normal text-[12px] mb-5 cursor-pointer">
        <nuxt-link to="/user">USERS</nuxt-link>
      </h1>
    </div>
    <div>
      <OptionList
        labelText="User list"
        buttonText="Add User"
        listWidth="88%"
        @add="addUser"
      />
    </div>
    <div class="mt-6">
      <UserActionButton @add="allActionButtons" />
    </div>
    <div>
      <UserTable
        :allData="allUserData"
        :paginationText="paginationText"
        @handleVerify="handleVerify"
        @deleteItem="removeUser"
        @handleClick="editUser"
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
      allUserData: "user/getAllUserData",
      userPaginationData: "user/getUserPaginationData",
    }),
    paginationText() {
      return this.generatePaginationText(this.userPaginationData);
    },
  },
  methods: {
    ...mapActions({
      fetchAllUser: "user/fetchAllUser",
      userAddToBlock: "user/userAddToBlock",
      userVerified: "user/userVerified",
      userUnVerify: "user/userUnVerify",
      deleteUser: "user/deleteUser",
    }),
    async allActionButtons(type) {
      try {
        this.sortBy = type;
        const res = await this.fetchAllUser({ sortBy: this.sortBy });
      } catch (error) {
        this.$toast.open({
          message: error?.response?.data?.msg,
          type: "error",
        });
      }
    },
    editUser(item) {
      this.$router.push(`user/edit-user/${item._id}`);
    },
    addUser() {
      this.$router.push("/user/add-user");
    },
    async handleSubmit() {
      try {
        const response = await this.deleteUser({ id: this.selectedId });
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
    generatePaginationText(pagination) {
      const { current_page, limit, total } = pagination;

      const start = (current_page - 1) * limit + 1;
      const end = Math.min(current_page * limit, total);

      return `${start}-${end} of ${total}`;
    },
    async firstPage() {
      try {
        const res = await this.fetchAllUser({
          sortBy: this.sortBy,
          page: 1,
          limit: this.userPaginationData.limit,
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
        const res = await this.fetchAllUser({
          sortBy: this.sortBy,
          page: this.userPaginationData?.total_page,
          limit: 10,
        });
      } catch (error) {
        console.log(error);

        this.$toast.open({
          message: error?.response?.data?.msg,
          type: "error",
        });
      }
    },
    async prevPage() {
      try {
        const res = await this.fetchAllUser({
          sortBy: this.sortBy,
          page: this.userPaginationData.current_page - 1,
          limit: this.userPaginationData.limit,
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
        const res = await this.fetchAllUser({
          sortBy: this.sortBy,
          page: this.userPaginationData.current_page + 1,
          limit: this.userPaginationData.limit,
        });
      } catch (error) {
        this.$toast.open({
          message: error?.response?.data?.msg,
          type: "error",
        });
      }
    },
    closeModal() {
      this.isModal = false;
    },
    async removeUser(id) {
      this.isModal = true;
      this.selectedId = id;
    },
    async handleVerify(item) {
      try {
        if (item.verifyByAdmin) {
          try {
            const res = await this.userUnVerify(item);
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
            const res = await this.userVerified(item);
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
      const res = await this.fetchAllUser({ sortBy: this.sortBy });
    } catch (error) {
      this.$toast.open({
        message: error?.response?.data?.msg,
        type: "error",
      });
    }
  },
};
</script>
