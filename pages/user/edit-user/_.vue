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
                :class="
                  errors?.companyName
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
                id="CompanyName"
                class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                placeholder="Your company name"
                v-model="formData.companyName"
              />
              <span class="error-msg" v-if="errors?.companyName">{{
                errors?.companyName
              }}</span>
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
                :class="
                  errors.contactName
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
                placeholder="Your contact name"
                class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                v-model="formData.contactName"
              />
              <span class="error-msg" v-if="errors.contactName">{{
                errors.contactName
              }}</span>
            </div>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >Email Address</label
              >
              <input
                disabled
                type="email"
                name="email"
                id="email"
                :class="
                  errors.email
                    ? 'border border-red-600'
                    : 'border border-gray-300'
                "
                placeholder="Your Email Address"
                class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                v-model="formData.email"
              />
              <span class="error-msg" v-if="errors.email">{{
                errors.email
              }}</span>
            </div>
            <div>
              <label
                for="ContactNo"
                class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                >Contact No.</label
              >
              <label class="xl:w-[382px] relative flex cursor-pointer flex-col">
                <div class="flex justify-between">
                  <CountryDropdown
                    :items="countries"
                    :selectedLabel="formData?.countryCode"
                    @getValue="getCountry"
                    class="absolute mb-3 mr-4"
                  />
                  <div
                    class="border-r border-gray-400 h-[40%] absolute left-20 top-4"
                  ></div>
                  <input
                    type="text"
                    name="ContactNo"
                    id="ContactNo"
                    :class="
                      errors.contactNumber
                        ? 'border border-red-600'
                        : 'border border-gray-300'
                    "
                    placeholder="Your Contact No."
                    class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[15px] bg-white pl-24 focus:outline-none mb-1"
                    v-model="formData.contactNumber"
                  />
                </div>
                <span class="error-msg" v-if="errors.contactNumber">{{
                  errors.contactNumber
                }}</span>
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
            <div v-if="selectedLabel == 'USA'">
              <inputFile
                :errors="errors.w9_Form"
                item-label="W9 Form"
                :fileData="formData?.companyFormation?.usa?.w9_Form"
                :file="
                  typeof formData?.companyFormation?.usa?.w9_Form == 'object'
                    ? formData?.companyFormation?.usa?.w9_Form?.name
                    : formData?.companyFormation?.usa?.w9_Form
                "
                @handleFileChange="uploadW9Form"
              />
              <span class="error-msg" v-if="errors.w9_Form">{{
                errors.w9_Form
              }}</span>
            </div>
            <div v-if="selectedLabel == 'USA'">
              <inputFile
                item-label="Utility Bill"
                :fileData="formData?.companyFormation?.usa?.utility_Bill"
                :errors="errors.utility_Bill"
                :file="
                  typeof formData?.companyFormation?.usa?.utility_Bill ==
                  'object'
                    ? formData?.companyFormation?.usa?.utility_Bill?.name
                    : formData?.companyFormation?.usa?.utility_Bill
                "
                @handleFileChange="uploadUtilityBill"
              />
              <span class="error-msg" v-if="errors.utility_Bill">{{
                errors.utility_Bill
              }}</span>
            </div>
            <div v-if="selectedLabel == 'MEXICO'">
              <inputFile
                item-label="COPIA RFC Form"
                :fileData="formData?.companyFormation?.maxico?.copia_Rfc_Form"
                :errors="errors?.copia_Rfc_Form"
                :file="
                  typeof formData?.companyFormation?.maxico?.copia_Rfc_Form ==
                  'object'
                    ? formData?.companyFormation?.maxico?.copia_Rfc_Form?.name
                    : formData?.companyFormation?.maxico?.copia_Rfc_Form
                "
                @handleFileChange="uploadCopiaRfcForm"
              />
              <span class="error-msg" v-if="errors?.copia_Rfc_Form">{{
                errors?.copia_Rfc_Form
              }}</span>
            </div>
            <div v-if="selectedLabel == 'MEXICO'">
              <inputFile
                :errors="errors?.constance_Of_Fiscal_Situation"
                item-label="Constance of Fiscal Situation"
                :fileData="
                  formData?.companyFormation?.maxico
                    ?.constance_Of_Fiscal_Situation
                "
                :file="
                  typeof formData?.companyFormation?.maxico
                    ?.constance_Of_Fiscal_Situation == 'object'
                    ? formData?.companyFormation?.maxico
                        ?.constance_Of_Fiscal_Situation?.name
                    : formData?.companyFormation?.maxico
                        ?.constance_Of_Fiscal_Situation
                "
                @handleFileChange="uploadConstanceOfFiscalSituation"
              />
              <span
                class="error-msg"
                v-if="errors?.constance_Of_Fiscal_Situation"
                >{{ errors?.constance_Of_Fiscal_Situation }}</span
              >
            </div>
            <div v-if="selectedLabel == 'MEXICO'">
              <inputFile
                item-label="Proof of Favorable"
                :fileData="
                  formData?.companyFormation?.maxico?.proof_of_Favorable
                "
                :errors="errors?.proof_of_Favorable"
                :file="
                  typeof formData?.companyFormation?.maxico
                    ?.proof_of_Favorable == 'object'
                    ? formData?.companyFormation?.maxico?.proof_of_Favorable
                        ?.name
                    : formData?.companyFormation?.maxico?.proof_of_Favorable
                "
                @handleFileChange="uploadProofOfFavorable"
              />
              <span class="error-msg" v-if="errors?.proof_of_Favorable">{{
                errors?.proof_of_Favorable
              }}</span>
            </div>
            <div v-if="selectedLabel == 'MEXICO'">
              <inputFile
                :errors="errors?.proof_Of_Address"
                item-label="Proof of Address"
                :fileData="formData?.companyFormation?.maxico?.proof_Of_Address"
                :file="
                  typeof formData?.companyFormation?.maxico?.proof_Of_Address ==
                  'object'
                    ? formData?.companyFormation?.maxico?.proof_Of_Address?.name
                    : formData?.companyFormation?.maxico?.proof_Of_Address
                "
                @handleFileChange="uploadProofOfAddress"
              />
              <span class="error-msg" v-if="errors?.proof_Of_Address">{{
                errors?.proof_Of_Address
              }}</span>
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
                  :class="
                    errors[`commercialReference[${key}].companyName`]
                      ? 'border border-red-600'
                      : 'border border-gray-300'
                  "
                  id="CompanyName"
                  class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                  placeholder="Your company name"
                  v-model="reference.companyName"
                />
                <span
                  class="error-msg"
                  v-if="errors[`commercialReference[${key}].companyName`]"
                >
                  {{ errors[`commercialReference[${key}].companyName`] }}
                </span>
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
                  :class="
                    errors[`commercialReference[${key}].contactName`]
                      ? 'border border-red-600'
                      : 'border border-gray-300'
                  "
                  placeholder="Your contact name"
                  class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                  v-model="reference.contactName"
                />
                <span
                  class="error-msg"
                  v-if="errors[`commercialReference[${key}].contactName`]"
                >
                  {{ errors[`commercialReference[${key}].contactName`] }}
                </span>
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
                  :class="
                    errors[`commercialReference[${key}].emailAddress`]
                      ? 'border border-red-600'
                      : 'border border-gray-300'
                  "
                  placeholder="Your Email Address"
                  class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[14px]"
                  v-model="reference.emailAddress"
                />
                <span
                  class="error-msg"
                  v-if="errors[`commercialReference[${key}].emailAddress`]"
                >
                  {{ errors[`commercialReference[${key}].emailAddress`] }}
                </span>
              </div>
              <div>
                <label
                  for="ContactNo"
                  class="block mb-2 text-sm font-normal text-[#4B4B4B]"
                  >Contact No.</label
                >
                <label
                  class="xl:w-[382px] relative flex cursor-pointer flex-col"
                >
                  <div class="flex justify-between">
                    <CountryDropdown
                      :items="countries"
                      :selectedLabel="reference?.countryCode"
                      @getValue="
                        (value) => getReferenceCountry(value, reference)
                      "
                      class="absolute mb-3 mr-4"
                    />
                    <div
                      class="border-r border-gray-400 h-[40%] absolute left-20 top-4"
                    ></div>
                    <input
                      type="number"
                      name="ContactNo"
                      id="ContactNo"
                      :class="
                        errors[`commercialReference[${key}].contactNo`]
                          ? 'border border-red-600'
                          : 'border border-gray-300'
                      "
                      placeholder="Your Contact No."
                      class="xl:w-[382px] text-gray-900 rounded-lg block w-full px-3 py-[15px] bg-white pl-24 focus:outline-none mb-1"
                      v-model="reference.contactNo"
                    />
                  </div>
                  <span
                    class="error-msg"
                    v-if="errors[`commercialReference[${key}].contactNo`]"
                  >
                    {{ errors[`commercialReference[${key}].contactNo`] }}
                  </span>
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
      countries: [
        {
          key: 1,
          value: 1,
        },
        {
          key: 52,
          value: 52,
        },
      ],
      errors: {},
      selectedLabel: "Select option",
      formData: {
        companyName: "",
        contactName: "",
        countryCode: 1,
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
            countryCode: 1,
            contactNo: "",
          },
          {
            companyName: "",
            contactName: "",
            emailAddress: "",
            countryCode: 1,
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
    getCountry(item) {
      this.formData.countryCode = item.value;
    },
    getReferenceCountry(item, ref) {
      ref.countryCode = item.value;
    },
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
        // this.errors = await this.$validateUserForm({
        //   form: this.formData,
        //   isEdit: true,
        // });

        // if (Object.keys(this.errors).length > 0) {
        //   this.$toast.open({
        //     message: "Please fix the errors before submitting.",
        //     type: "error",
        //   });
        //   return;
        // }

        const formData = new FormData();
        formData.append("accountId", this.formData.accountId);
        formData.append("companyName", this.formData?.companyName);
        formData.append("contactName", this.formData?.contactName);
        formData.append("contactNumber", this.formData.contactNumber);
        formData.append("countryCode", this.formData.countryCode);
        formData.append("email", this.formData?.email);
        formData.append(
          "companyFormationType",
          this.formData?.companyFormationType
        );
        if (this.selectedLabel == "USA") {
          delete this.formData?.companyFormation?.maxico;
          if (
            this.formData?.companyFormation?.usa?.w9_Form != null &&
            typeof this.formData?.companyFormation?.usa?.w9_Form == "object"
          ) {
            formData.append(
              "companyFormation_usa_w9_Form",
              this.formData?.companyFormation?.usa?.w9_Form
            );
          }
          if (
            this.formData?.companyFormation?.usa?.utility_Bill != null &&
            typeof this.formData?.companyFormation?.usa?.utility_Bill ==
              "object"
          ) {
            formData.append(
              "companyFormation_usa_utility_Bill",
              this.formData?.companyFormation?.usa?.utility_Bill
            );
          }
        }
        if (this.selectedLabel == "MEXICO") {
          delete this.formData?.companyFormation?.usa;

          if (
            this.formData?.companyFormation?.maxico?.copia_Rfc_Form != null &&
            typeof this.formData?.companyFormation?.maxico?.copia_Rfc_Form ==
              "object"
          ) {
            formData.append(
              "companyFormation_maxico_copia_Rfc_Form",
              this.formData?.companyFormation?.maxico?.copia_Rfc_Form
            );
          }
          if (
            this.formData?.companyFormation?.maxico
              ?.constance_Of_Fiscal_Situation != null &&
            typeof this.formData?.companyFormation?.maxico
              ?.constance_Of_Fiscal_Situation == "object"
          ) {
            formData.append(
              "companyFormation_maxico_constance_Of_Fiscal_Situation",
              this.formData?.companyFormation?.maxico
                ?.constance_Of_Fiscal_Situation
            );
          }
          if (
            this.formData?.companyFormation?.maxico?.proof_of_Favorable !=
              null &&
            typeof this.formData?.companyFormation?.maxico
              ?.proof_of_Favorable == "object"
          ) {
            formData.append(
              "companyFormation_maxico_proof_of_Favorable",
              this.formData?.companyFormation?.maxico?.proof_of_Favorable
            );
          }
          if (
            this.formData?.companyFormation?.maxico?.proof_Of_Address != null &&
            typeof this.formData?.companyFormation?.maxico?.proof_Of_Address ==
              "object"
          ) {
            formData.append(
              "companyFormation_maxico_proof_Of_Address",
              this.formData?.companyFormation?.maxico?.proof_Of_Address
            );
          }
        }
        this.formData.commercialReference.forEach((ref, index) => {
          for (let key in ref) {
            let value = ref[key];

            if (key === "contactNo") {
              value = value ? `${value}` : "";
            }
            if (key === "countryCode") {
              value = `${value}`;
            }
            if (
              value &&
              value != "" &&
              value != null &&
              key != "accountId" &&
              key != "_id"
            ) {
              formData.append(`commercialReference[${index}][${key}]`, value);
            }
          }
        });
        const response = await this.updateUser(formData);
        this.$toast.open({
          message: response.msg,
        });
        this.$router.push("/user");
      } catch (error) {
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
  },
  async asyncData({ params, store, redirect }) {
    const id = params.pathMatch;
    try {
      await store.dispatch("user/fetchSingleUser", { accountId: id });
    } catch (error) {
      return redirect("/user");
    }
  },
  async beforeMount() {
    this.formData = this.$lodash.cloneDeep(this.getSingleUserData);
    this.selectedLabel = this.formData.companyFormationType
      ? this.formData.companyFormationType
      : "Select option";
  },
};
</script>

<style scoped>
.error-msg {
  font-size: 14px;
  font-weight: 400;
  color: red;
}
</style>
