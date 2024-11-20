<template>
  <div>
    <div>
      <div class="flex items-center gap-3 mb-5">
        <h1 class="text-[#989898] font-normal text-[12px] cursor-pointer">
          <nuxt-link to="/manage-cms">CMS</nuxt-link>
        </h1>
        <img src="@/static/svg/right-arrow.svg" alt="" />
        <p class="text-[#1E1E1E] font-normal text-[12px] cursor-pointer">
          EDIT CMS
        </p>
      </div>
      <form class="space-y-4 md:space-y-6 mt-6" @submit.prevent="editCms">
        <div>
          <div
            class="grid lg:grid-cols-3 sm:grid-cols-2 :grid-cols-1 gap-y-4 sm:gap-4 lg:gap-4"
          >
            <div>
              <label
                for="Title"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >Title *</label
              >
              <input
                type="text"
                placeholder="Your Title"
                class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px] focus:outline-none"
                :class="
                  errors.title
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
                v-model="formData.title"
              />
              <span class="error-msg" v-if="errors.title">{{
                errors.title
              }}</span>
            </div>
            <div>
              <label
                for="SubTitle"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >Sub Title *</label
              >
              <input
                type="text"
                :class="
                  errors.subTitle
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
                placeholder="Your SubTitle"
                class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px] focus:outline-none"
                v-model="formData.subTitle"
              />
              <span class="error-msg" v-if="errors.subTitle">{{
                errors.subTitle
              }}</span>
            </div>
            <div class="">
              <label
                for="Role"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >Role *</label
              >
              <Dropdown
                :items="countriesList"
                :selectedLabel="selectedLabel"
                @getValue="getValue"
                :errors="errors?.selectedLabel"
              />
              <span class="error-msg" v-if="errors?.selectedLabel">{{
                errors?.selectedLabel
              }}</span>
            </div>
            <div>
              <label
                for="description"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >Description</label
              >
              <div class="editor-container">
                <VueEditor
                  v-model="formData.description"
                  placeholder="Your Description"
                />
              </div>
            </div>
          </div>
          <div class="flex justify-center">
            <button
              class="text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium rounded-lg text-[16px] px-8 py-[15px] text-center mt-8 sm:mr-40"
            >
              Update Cms
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  layout: "dashboard",
  data() {
    return {
      errors: {},
      selectedLabel: "Select option",
      countriesList: [
        {
          label: "User",
        },
        {
          label: "Carrier",
        },
        {
          label: "Operator",
        },
      ],
      formData: {
        title: "",
        subTitle: "",
        description: "",
        role: "",
      },
    };
  },
  methods: {
    ...mapActions({
      fetchSingleCms: "cms/fetchSingleCms",
      updateCms: "cms/updateCms",
    }),
    getValue(item) {
      this.selectedLabel = item.label;
      this.formData.role = item.label;
    },
    async getportBridge() {
      try {
        const res = await this.fetchSingleCms({
          id: this.cmdId,
        });
        this.formData = res.data;
        this.selectedLabel = res?.data?.role || "";
      } catch (error) {
        console.log(error, "error");
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
    async editCms() {
      try {
        this.errors = await this.$validateCms({
          form: this.formData,
          selectedLabel: this.selectedLabel,
        });

        if (Object.keys(this.errors).length > 0) {
          this.$toast.open({
            message: "Please fix the errors before submitting.",
            type: "error",
          });
          return;
        }

        const res = await this.updateCms(this.formData);
        this.$toast.open({
          message: res.msg,
        });
        this.$router.push("/manage-cms");
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
    await this.getportBridge();
  },
  async asyncData({ params }) {
    return {
      cmdId: params.pathMatch,
    };
  },
};
</script>
