<template>
  <div>
    <div>
      <div class="flex items-center gap-3 mb-5">
        <h1 class="text-[#989898] font-normal text-[12px] cursor-pointer">
          <nuxt-link to="/user">USERS</nuxt-link>
        </h1>
        <img src="@/static/svg/right-arrow.svg" alt="" />
        <p class="text-[#1E1E1E] font-normal text-[12px] cursor-pointer">
          EDIT USER
        </p>
      </div>
      <form class="space-y-4 md:space-y-6 mt-6" @submit.prevent="editUser">
        <div class="w-[65%]">
          <div class="grid grid-cols-2 gap-y-2">
            <div>
              <label
                for="Company name"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >Company name</label
              >
              <input
                type="text"
                name="CompanyName"
                id="CompanyName"
                class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                placeholder="Your company name"
                v-model="formData.companyName"
              />
            </div>
            <div>
              <label
                for="ContactName"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >Contact name</label
              >
              <input
                type="text"
                name="ContactName"
                id="ContactName"
                placeholder="Your contact name"
                class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                v-model="formData.contactName"
              />
            </div>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >Email Address</label
              >
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your Email Address"
                class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                v-model="formData.email"
              />
            </div>
            <div>
              <label
                for="ContactNo"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >Contact No.</label
              >
              <label class="xl:w-[382px] relative flex cursor-pointer">
                <div class="flex justify-between">
                  <svg
                    width="24"
                    class="absolute ml-3 mb-3 mr-4 top-4"
                    viewBox="0 0 36 36"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <path
                      fill="#ED2939"
                      d="M36 27a4 4 0 0 1-4 4h-8V5h8a4 4 0 0 1 4 4v18z"
                    ></path>
                    <path
                      fill="#002495"
                      d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5H4z"
                    ></path>
                    <path fill="#EEE" d="M12 5h12v26H12z"></path>
                  </svg>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="absolute sm:right-3 right-2 top-4 cursor-pointer"
                  >
                    <path
                      d="M12.5 16.6667H4.16667C3.062 16.6653 2.00296 16.2259 1.22185 15.4448C0.440735 14.6637 0.00132321 13.6047 0 12.5L0 4.16667C0.00132321 3.062 0.440735 2.00296 1.22185 1.22185C2.00296 0.440735 3.062 0.00132321 4.16667 0L12.5 0C13.6047 0.00132321 14.6637 0.440735 15.4448 1.22185C16.2259 2.00296 16.6653 3.062 16.6667 4.16667V12.5C16.6653 13.6047 16.2259 14.6637 15.4448 15.4448C14.6637 16.2259 13.6047 16.6653 12.5 16.6667ZM4.16667 1.66667C3.50363 1.66667 2.86774 1.93006 2.3989 2.3989C1.93006 2.86774 1.66667 3.50363 1.66667 4.16667V12.5C1.66667 13.163 1.93006 13.7989 2.3989 14.2678C2.86774 14.7366 3.50363 15 4.16667 15H12.5C13.163 15 13.7989 14.7366 14.2678 14.2678C14.7366 13.7989 15 13.163 15 12.5V4.16667C15 3.50363 14.7366 2.86774 14.2678 2.3989C13.7989 1.93006 13.163 1.66667 12.5 1.66667H4.16667ZM20 15.8333V5C20 4.77899 19.9122 4.56702 19.7559 4.41074C19.5996 4.25446 19.3877 4.16667 19.1667 4.16667C18.9457 4.16667 18.7337 4.25446 18.5774 4.41074C18.4211 4.56702 18.3333 4.77899 18.3333 5V15.8333C18.3333 16.4964 18.0699 17.1323 17.6011 17.6011C17.1323 18.0699 16.4964 18.3333 15.8333 18.3333H5C4.77899 18.3333 4.56702 18.4211 4.41074 18.5774C4.25446 18.7337 4.16667 18.9457 4.16667 19.1667C4.16667 19.3877 4.25446 19.5996 4.41074 19.7559C4.56702 19.9122 4.77899 20 5 20H15.8333C16.938 19.9987 17.997 19.5593 18.7782 18.7782C19.5593 17.997 19.9987 16.938 20 15.8333Z"
                      fill="#1E1E1E"
                    />
                  </svg>
                  <span
                    class="absolute left-12 mb-3 mr-4 top-4 text-[#1E1E1E] font-normal text-base"
                    >+33</span
                  >
                  <div
                    class="border-r border-gray-400 h-[40%] absolute left-20 top-4"
                  ></div>
                  <input
                    type="number"
                    name="ContactNo"
                    id="ContactNo"
                    placeholder="Your Contact No."
                    class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[15px] bg-white pl-24 focus:outline-none mb-3"
                    v-model="formData.contactNumber"
                  />
                </div>
              </label>
            </div>
            <div class="">
              <label
                for="companyFormation"
                class="block mb-2 text-sm font-normal text-[#1E1E1E]"
                >Company Formation</label
              >
              <Dropdown
                :items="countriesList"
                :selectedLabel="selectedLabel"
                @getValue="getValue"
              />
            </div>
            <div v-if="selectedLabel === 'USA'">
              <inputFile
                item-label="W9 Form"
                :file="
                  typeof formData.companyFormation.usa.w9_Form == 'object'
                    ? formData.companyFormation.usa.w9_Form?.name
                    : formData.companyFormation.usa.w9_Form
                "
                @handleFileChange="uploadW9Form"
              />
            </div>
            <div v-if="selectedLabel === 'USA'">
              <inputFile
                item-label="Utility Bill"
                :file="
                  typeof formData.companyFormation.usa.utility_Bill == 'object'
                    ? formData.companyFormation.usa.utility_Bill?.name
                    : formData.companyFormation.usa.utility_Bill
                "
                @handleFileChange="uploadUtilityBill"
              />
            </div>
            <div v-if="selectedLabel === 'MEXICO'">
              <inputFile
                item-label="COPIA RFC Form"
                :file="
                  typeof formData.companyFormation.maxico.copia_Rfc_Form ==
                  'object'
                    ? formData.companyFormation.maxico.copia_Rfc_Form?.name
                    : formData.companyFormation.maxico.copia_Rfc_Form
                "
                @handleFileChange="uploadCopiaRfcForm"
              />
            </div>
            <div v-if="selectedLabel === 'MEXICO'">
              <inputFile
                item-label="Constance of Fiscal Situation"
                :file="
                  typeof formData.companyFormation.maxico
                    .constance_Of_Fiscal_Situation == 'object'
                    ? formData.companyFormation.maxico
                        .constance_Of_Fiscal_Situation?.name
                    : formData.companyFormation.maxico
                        .constance_Of_Fiscal_Situation
                "
                @handleFileChange="uploadConstanceOfFiscalSituation"
              />
            </div>
            <div v-if="selectedLabel === 'MEXICO'">
              <inputFile
                item-label="Proof of Favorable"
                :file="
                  typeof formData.companyFormation.maxico.proof_of_Favorable ==
                  'object'
                    ? formData.companyFormation.maxico.proof_of_Favorable?.name
                    : formData.companyFormation.maxico.proof_of_Favorable
                "
                @handleFileChange="uploadProofOfFavorable"
              />
            </div>
            <div v-if="selectedLabel === 'MEXICO'">
              <inputFile
                item-label="Proof of Address"
                :file="
                  typeof formData.companyFormation.maxico.proof_Of_Address ==
                  'object'
                    ? formData.companyFormation.maxico.proof_Of_Address?.name
                    : formData.companyFormation.maxico.proof_Of_Address
                "
                @handleFileChange="uploadProofOfAddress"
              />
            </div>
          </div>

          <div
            v-if="selectedLabel != 'Select option'"
            class="grid grid-cols-2 mt-1"
          >
            <div
              v-for="(reference, key) in formData.commercialReference"
              :key="key"
              class="grid gap-y-2"
            >
              <div>
                <h1 class="text-[#1E1E1E] font-medium text-base">
                  Commercial Reference {{ key + 1 }}
                </h1>
                <label
                  for="Company name"
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                  >Company name</label
                >
                <input
                  type="text"
                  name="CompanyName"
                  id="CompanyName"
                  class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                  placeholder="Your company name"
                  v-model="reference.companyName"
                />
              </div>
              <div>
                <label
                  for="ContactName"
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                  >Contact name</label
                >
                <input
                  type="text"
                  name="ContactName"
                  id="ContactName"
                  placeholder="Your contact name"
                  class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                  v-model="reference.contactName"
                />
              </div>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                  >Email Address</label
                >
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email Address"
                  class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                  v-model="reference.emailAddress"
                />
              </div>
              <div>
                <label
                  for="ContactNo"
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                  >Contact No.</label
                >
                <label class="xl:w-[382px] relative flex cursor-pointer">
                  <div class="flex justify-between">
                    <svg
                      width="24"
                      class="absolute ml-3 mb-3 mr-4 top-4"
                      viewBox="0 0 36 36"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <path
                        fill="#ED2939"
                        d="M36 27a4 4 0 0 1-4 4h-8V5h8a4 4 0 0 1 4 4v18z"
                      ></path>
                      <path
                        fill="#002495"
                        d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5H4z"
                      ></path>
                      <path fill="#EEE" d="M12 5h12v26H12z"></path>
                    </svg>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="absolute sm:right-3 right-2 top-4 cursor-pointer"
                    >
                      <path
                        d="M12.5 16.6667H4.16667C3.062 16.6653 2.00296 16.2259 1.22185 15.4448C0.440735 14.6637 0.00132321 13.6047 0 12.5L0 4.16667C0.00132321 3.062 0.440735 2.00296 1.22185 1.22185C2.00296 0.440735 3.062 0.00132321 4.16667 0L12.5 0C13.6047 0.00132321 14.6637 0.440735 15.4448 1.22185C16.2259 2.00296 16.6653 3.062 16.6667 4.16667V12.5C16.6653 13.6047 16.2259 14.6637 15.4448 15.4448C14.6637 16.2259 13.6047 16.6653 12.5 16.6667ZM4.16667 1.66667C3.50363 1.66667 2.86774 1.93006 2.3989 2.3989C1.93006 2.86774 1.66667 3.50363 1.66667 4.16667V12.5C1.66667 13.163 1.93006 13.7989 2.3989 14.2678C2.86774 14.7366 3.50363 15 4.16667 15H12.5C13.163 15 13.7989 14.7366 14.2678 14.2678C14.7366 13.7989 15 13.163 15 12.5V4.16667C15 3.50363 14.7366 2.86774 14.2678 2.3989C13.7989 1.93006 13.163 1.66667 12.5 1.66667H4.16667ZM20 15.8333V5C20 4.77899 19.9122 4.56702 19.7559 4.41074C19.5996 4.25446 19.3877 4.16667 19.1667 4.16667C18.9457 4.16667 18.7337 4.25446 18.5774 4.41074C18.4211 4.56702 18.3333 4.77899 18.3333 5V15.8333C18.3333 16.4964 18.0699 17.1323 17.6011 17.6011C17.1323 18.0699 16.4964 18.3333 15.8333 18.3333H5C4.77899 18.3333 4.56702 18.4211 4.41074 18.5774C4.25446 18.7337 4.16667 18.9457 4.16667 19.1667C4.16667 19.3877 4.25446 19.5996 4.41074 19.7559C4.56702 19.9122 4.77899 20 5 20H15.8333C16.938 19.9987 17.997 19.5593 18.7782 18.7782C19.5593 17.997 19.9987 16.938 20 15.8333Z"
                        fill="#1E1E1E"
                      />
                    </svg>
                    <span
                      class="absolute left-12 mb-3 mr-4 top-4 text-[#1E1E1E] font-normal text-base"
                      >+1</span
                    >
                    <div
                      class="border-r border-gray-400 h-[40%] absolute left-20 top-4"
                    ></div>
                    <input
                      type="number"
                      name="ContactNo"
                      id="ContactNo"
                      placeholder="Your Contact No."
                      class="xl:w-[382px] border border-gray-300 text-gray-900 rounded-lg block w-full px-3 py-[15px] bg-white pl-24 focus:outline-none mb-3"
                      v-model="reference.contactNo"
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div class="flex justify-center">
            <button
              class="text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium rounded-lg text-[16px] px-8 py-[15px] text-center mt-8 mr-40"
            >
              Update User
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  layout: "dashboard",
  data() {
    return {
      countriesList: [
        {
          label: "USA",
        },
        {
          label: "MEXICO",
        },
      ],
      selectedLabel: "Select option",
      formData: {
        companyName: "",
        contactName: "",
        contactNumber: "",
        email: "",
        scac: "",
        caat: "",
        insurancePolicy: "",
        oea: "",
        ctpat: "",
        companyFormationType: "",
        companyFormation: {
          usa: {
            w9_Form: "",
            utility_Bill: "",
          },
          maxico: {
            copia_Rfc_Form: "",
            constance_Of_Fiscal_Situation: "",
            proof_of_Favorable: "",
            proof_Of_Address: "",
          },
        },
        commercialReference: [
          {
            companyName: "",
            contactName: "",
            emailAddress: "",
            countryCode: "",
            contactNo: "",
          },
          {
            companyName: "",
            contactName: "",
            emailAddress: "",
            countryCode: "",
            contactNo: "",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      getSingleUserData: "user/getSingleUserData",
    }),
  },
  methods: {
    ...mapActions({
      fetchSingleUser: "user/fetchSingleUser",
      updateUser: "user/updateUser",
    }),
    getValue(item) {
      this.selectedLabel = item.label;
      this.formData.companyFormationType = item.label;
    },
    async uploadW9Form(event) {
      try {
        const file = event.target.files[0];
        this.formData.companyFormation.usa.w9_Form = file;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadUtilityBill(event) {
      try {
        const file = event.target.files[0];
        this.formData.companyFormation.usa.utility_Bill = file;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadCopiaRfcForm(event) {
      try {
        const file = event.target.files[0];
        this.formData.companyFormation.maxico.copia_Rfc_Form = file;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadConstanceOfFiscalSituation(event) {
      try {
        const file = event.target.files[0];
        this.formData.companyFormation.maxico.constance_Of_Fiscal_Situation =
          file;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadProofOfFavorable(event) {
      try {
        const file = event.target.files[0];
        this.formData.companyFormation.maxico.proof_of_Favorable = file;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadProofOfAddress(event) {
      try {
        const file = event.target.files[0];
        this.formData.companyFormation.maxico.proof_Of_Address = file;
      } catch (error) {
        console.log(error);
      }
    },
    async editUser() {
      try {
        const formData = new FormData();
        formData.append("id", this.formData._id);
        formData.append("companyName", this.formData.companyName);
        formData.append("contactName", this.formData.contactName);
        formData.append("contactNumber", `+1${this.formData.contactNumber}`);
        formData.append("email", this.formData.email);
        formData.append(
          "companyFormationType",
          this.formData.companyFormationType
        );
        if (this.selectedLabel === "USA") {
          delete this.formData.companyFormation.maxico;
          if (
            this.formData.companyFormation.usa.w9_Form != null &&
            typeof this.formData.companyFormation.usa.w9_Form == "object"
          ) {
            formData.append(
              "companyFormation_usa_w9_Form",
              this.formData.companyFormation.usa.w9_Form
            );
          }
          if (
            this.formData.companyFormation.usa.utility_Bill != null &&
            typeof this.formData.companyFormation.usa.utility_Bill == "object"
          ) {
            formData.append(
              "companyFormation_usa_utility_Bill",
              this.formData.companyFormation.usa.utility_Bill
            );
          }
        }
        if (this.selectedLabel === "MEXICO") {
          delete this.formData.companyFormation.usa;

          if (
            this.formData.companyFormation.maxico.copia_Rfc_Form != null &&
            typeof this.formData.companyFormation.maxico.copia_Rfc_Form ==
              "object"
          ) {
            formData.append(
              "companyFormation_maxico_copia_Rfc_Form",
              this.formData.companyFormation.maxico.copia_Rfc_Form
            );
          }
          if (
            this.formData.companyFormation.maxico
              .constance_Of_Fiscal_Situation != null &&
            typeof this.formData.companyFormation.maxico
              .constance_Of_Fiscal_Situation == "object"
          ) {
            formData.append(
              "companyFormation_maxico_constance_Of_Fiscal_Situation",
              this.formData.companyFormation.maxico
                .constance_Of_Fiscal_Situation
            );
          }
          if (
            this.formData.companyFormation.maxico.proof_of_Favorable != null &&
            typeof this.formData.companyFormation.maxico.proof_of_Favorable ==
              "object"
          ) {
            formData.append(
              "companyFormation_maxico_proof_of_Favorable",
              this.formData.companyFormation.maxico.proof_of_Favorable
            );
          }
          if (
            this.formData.companyFormation.maxico.proof_Of_Address != null &&
            typeof this.formData.companyFormation.maxico.proof_Of_Address ==
              "object"
          ) {
            formData.append(
              "companyFormation_maxico_proof_Of_Address",
              this.formData.companyFormation.maxico.proof_Of_Address
            );
          }
        }
        this.formData.commercialReference.forEach((ref, index) => {
          for (let key in ref) {
            let value = ref[key];

            if (key === "countryCode" || key === "contactNo") {
              value = `+1${value}`;
            }
            formData.append(`commercialReference[${index}][${key}]`, value);
          }
        });
        const response = await this.updateUser(formData);
        this.$toast.open({
          message: response.msg,
        });
        this.$router.push("/user");
      } catch (error) {
        this.$toast.open({
          message: error?.response?.data?.msg,
          type: "error",
        });
      }
    },
  },
  async asyncData({ params, store, redirect }) {
    const id = params.pathMatch;
    try {
      await store.dispatch("user/fetchSingleUser", { id: id });
    } catch (error) {
      return redirect("/user");
    }
  },
  async beforeMount() {
    this.formData = this.$lodash.cloneDeep(this.getSingleUserData);
    this.selectedLabel = this.formData.companyFormationType;
  },
};
</script>
