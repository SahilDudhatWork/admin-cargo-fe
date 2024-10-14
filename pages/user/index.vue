<template>
  <div>
    <div>
      <h1 class="text-[#4B4B4B] font-normal text-[12px] mb-5 cursor-pointer">
        USERS
      </h1>
    </div>
    <div class="relative">
      <img
        src="@/static/svg/search.svg"
        alt=""
        class="absolute right-3 top-[18px] cursor-pointer"
      />
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search by user name/ID"
        class="border border-gray-300 text-gray-900 rounded-lg block px-3 py-[14px] focus:outline-none mb-4 w-full"
        v-model="search"
        @keyup="searchText"
      />
    </div>
    <div>
      <OptionList
        labelText="User list"
        buttonText="Add User"
        listWidth="92%"
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
      selectedItem: null,
      sortBy: "all",
      search: "",
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
    async getAllUser(payload) {
      let { sortBy, page, limit, keyWord } = payload;
      sortBy = sortBy || "";
      page = page || 1;
      limit = limit || 10;
      keyWord = keyWord || "";
      await this.fetchAllUser({
        sortBy: sortBy,
        page: page,
        limit: limit,
        keyWord: keyWord,
      });
    },
    async allActionButtons(type) {
      try {
        this.sortBy = type;
        const res = await this.getAllUser({
          keyWord: this.search,
          sortBy: this.sortBy,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    editUser(item) {
      this.$router.push(`user/edit-user/${item.accountId}`);
    },
    addUser() {
      this.$router.push("/user/add-user");
    },
    async handleDelete() {
      try {
        const response = await this.deleteUser({ accountId: this.selectedId });
        this.$toast.open({
          message: response.msg,
        });
        this.isModal = false;
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
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
        await this.getAllUser({
          sortBy: this.sortBy,
          keyWord: this.search,
          page: 1,
          limit: this.userPaginationData.limit,
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
        await this.getAllUser({
          sortBy: this.sortBy,
          keyWord: this.search,
          page: this.userPaginationData?.total_page,
          limit: 10,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async prevPage() {
      try {
        await this.getAllUser({
          sortBy: this.sortBy,
          keyWord: this.search,
          page: this.userPaginationData.current_page - 1,
          limit: this.userPaginationData.limit,
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
        await this.getAllUser({
          sortBy: this.sortBy,
          keyWord: this.search,
          page: this.userPaginationData.current_page + 1,
          limit: this.userPaginationData.limit,
        });
      } catch (error) {
        console.log(error);
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
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
            console.log(error);
            this.$toast.open({
              message:
                error?.response?.data?.msg || this.$i18n.t("errorMessage"),
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
            console.log(error);
            this.$toast.open({
              message:
                error?.response?.data?.msg || this.$i18n.t("errorMessage"),
              type: "error",
            });
          }
        }
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
      await this.getAllUser({
        keyWord: this.search,
        sortBy: this.sortBy,
      });
    } catch (error) {
      console.log(error);
      this.$toast.open({
        message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
        type: "error",
      });
    }
  },
  async created() {
    this.searchText = this.$lodash.debounce(async (payload) => {
      await this.getAllUser({ keyWord: this.search, sortBy: this.sortBy });
    }, 1000);
  },
};
</script>
