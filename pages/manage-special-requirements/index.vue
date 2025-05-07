<template>
  <div>
    <h1 class="text-[#4B4B4B] font-normal text-[12px] mb-5">
      PORT & BRIDGE > ADD PORT & BRIDGE
    </h1>

    <div class="flex flex-col md:flex-row gap-6">
      <div class="w-full md:w-1/3">
        <div class="mb-6 w-full">
          <label
            for="type"
            class="block mb-2 text-sm font-normal text-[#4B4B4B]"
          >
            Port & Bridge - Transportation - typeOfService*
          </label>
          <Dropdown
            :items="[
              { label: 'Transportation', value: 'transportation' },
              { label: 'Port Bridge', value: 'post_bridge' },
              { label: 'Type Of Service', value: 'typeOfService' },
            ]"
            :selectedLabel="selectedTypeLabel"
            @getValue="
              (val) => {
                selectedType = val.value;
                selectedTypeLabel = val.label;
                handleTypeSelection();
              }
            "
            :errors="errors?.selectedType"
          />
        </div>

        <div v-if="showTitleDropdown" class="mb-6 w-full">
          <label class="block mb-2 text-sm font-normal text-[#4B4B4B]">
            {{
              selectedType === "post_bridge"
                ? "Your Port & Bridge *"
                : selectedType === "transportation"
                ? "Your Transportation *"
                : selectedType === "typeOfService"
                ? "Your Type Of Service *"
                : ""
            }}
          </label>
          <Dropdown
            :items="
              availableTitles.map((t) => ({ label: t.title, value: t._id }))
            "
            :selectedLabel="selectedTitleLabel"
            @getValue="
              (val) => {
                selectedTitle = val.value;
                selectedTitleLabel = val.label;
                handleTitleSelection();
              }
            "
            :errors="errors?.selectedTitle"
          />
        </div>
      </div>

      <div v-if="showForm" class="w-full md:w-2/4">
        <h2 class="text-[#1E1E1E] font-medium text-sm mb-4">Requirement *</h2>

        <div class="mb-6">
          <div
            v-for="(item, index) in fetchedRequirements"
            :key="item._id || index"
            class="flex items-center justify-between gap-4 mb-3 p-3 border border-gray-200 rounded-md"
          >
            <div class="flex gap-4 w-full">
              <div class="w-full">
                <label class="block text-xs text-[#7A7A7A]">Type</label>
                <div
                  v-if="editingIndex !== index"
                  class="text-sm text-[#1E1E1E]"
                >
                  {{ item.type }}
                </div>
                <input
                  v-else
                  type="text"
                  v-model="editingField.type"
                  class="w-full px-2 py-1 border rounded"
                />
              </div>
              <div class="w-full">
                <label class="block text-xs text-[#7A7A7A]">Price</label>
                <div
                  v-if="editingIndex !== index"
                  class="text-sm text-[#1E1E1E]"
                >
                  {{ item.price }}
                </div>
                <input
                  v-else
                  type="number"
                  v-model.number="editingField.price"
                  class="w-full px-2 py-1 border rounded"
                />
              </div>
            </div>

            <div class="flex items-center gap-2 mt-4">
              <button
                v-if="editingIndex === index"
                @click="updateRequirement"
                class="text-white bg-gradient-to-r from-[#0457cb] to-[#2AA1EB] font-medium rounded-lg text-sm px-2.5 py-1"
              >
                Save
              </button>
              <img
                v-else
                src="@/static/svg/edit-icon.svg"
                alt="Edit"
                class="w-[17px] h-[17px] cursor-pointer"
                @click="editRequirement(index)"
              />
              <img
                src="@/static/svg/delete-icon.svg"
                alt="Delete"
                class="w-[20px] h-[20px] cursor-pointer"
                @click="deleteRequirement(index)"
              />
            </div>
          </div>
        </div>

        <div>
          <div
            v-for="(field, index) in formFields"
            :key="'form-' + index"
            class="flex items-center gap-4 mb-3 p-3 border border-gray-200 rounded-md"
          >
            <div class="flex gap-4 w-full">
              <div class="w-full">
                <label class="block text-xs text-[#7A7A7A]">Type *</label>
                <input
                  type="text"
                  v-model="field.type"
                  class="w-full px-2 py-1 border text-sm rounded"
                />
              </div>
              <div class="w-full">
                <label class="block text-xs text-[#7A7A7A]">Price *</label>
                <input
                  type="number"
                  v-model.number="field.price"
                  class="w-full px-2 py-1 border text-sm rounded"
                />
              </div>
            </div>

            <div class="flex items-center mt-6">
              <button
                v-if="index === 0"
                @click="addField"
                class="text-2xl bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] text-white rounded-full w-9 h-9 flex items-center justify-center"
              >
                +
              </button>
              <button
                v-else
                @click="removeField(index)"
                class="text-2xl bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] text-white rounded-full w-9 h-9 flex items-center justify-center"
              >
                –
              </button>
            </div>
          </div>

          <button
            class="mt-4 text-white bg-gradient-to-r from-[#0464CB] to-[#2AA1EB] font-medium rounded-lg text-sm px-5 py-2.5 w-full"
            @click="saveRequirements"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  layout: "dashboard",
  data() {
    return {
      selectedType: "",
      selectedTypeLabel: "",
      selectedTitle: "",
      showTitleDropdown: false,
      showForm: false,
      availableTitles: [],
      formFields: [{ type: "", price: null }],
      fetchedRequirements: [],
      editingIndex: null,
      editingField: { type: "", price: null },
      typeOptions: [
        { label: "Transportation", value: "transportation" },
        { label: "Port Bridge", value: "post_bridge" },
      ],
      errors: {},
    };
  },
  methods: {
    ...mapActions({
      fetchSpecialRequirements: "transitinfo/fetchSpecialRequirements",
      createSpecialRequirements: "transitinfo/createSpecialRequirements",
      fetchSpecialRequirementsDetails:
        "transitinfo/fetchSpecialRequirementsDetails",
      deleteSpecialRequirements: "transitinfo/deleteSpecialRequirements",
      updateSpecialRequirements: "transitinfo/updateSpecialRequirements",
    }),

    async handleTypeSelection() {
      this.showTitleDropdown = false;
      this.showForm = false;
      this.selectedTitleLabel = "";

      if (this.selectedType) {
        try {
          const res = await this.fetchSpecialRequirements({
            type: this.selectedType,
          });
          if (res?.status && Array.isArray(res.data)) {
            this.availableTitles = res.data.map((item) => ({
              _id: item._id,
              title: item.title,
            }));
            this.showTitleDropdown = true;
          }
        } catch (error) {
          this.$toast.open({
            message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
            type: "error",
          });
        }
      }
    },

    async handleTitleSelection() {
      if (this.selectedTitle) {
        this.showForm = true;
        this.formFields = [{ type: "", price: null }];
        try {
          const res = await this.fetchSpecialRequirementsDetails({
            id: this.selectedTitle,
            type: this.selectedType,
          });
          this.fetchedRequirements = Array.isArray(res.data) ? res.data : [];
        } catch (error) {
          this.$toast.open({
            message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
            type: "error",
          });
        }
      }
    },

    addField() {
      this.formFields.push({ type: "", price: null });
    },

    removeField(index) {
      this.formFields.splice(index, 1);
    },

    async saveRequirements() {
      const hasEmptyFields = this.formFields.some(
        (field) => !field.type || field.price === null || field.price <= 0,
      );
      if (hasEmptyFields) {
        this.$toast.open({
          message: "Please fill all requirement fields.",
          type: "error",
        });
        return;
      }

      const payload = {
        requirements: this.formFields.map((field) => ({
          type: field.type,
          price: field.price,
        })),
      };

      const selectedId = this.selectedTitle;

      try {
        const res = await this.createSpecialRequirements({
          type: this.selectedType,
          id: selectedId,
          data: payload,
        });

        this.$toast.open({ message: res.msg });

        // Push new entries into the displayed list
        this.fetchedRequirements.push(...payload.requirements);

        this.formFields = [{ type: "", price: null }];
      } catch (error) {
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },

    editRequirement(index) {
      this.editingIndex = index;
      this.editingField = { ...this.fetchedRequirements[index] };
    },

    async updateRequirement() {
      const item = this.fetchedRequirements[this.editingIndex];
      try {
        const res = await this.updateSpecialRequirements({
          type: this.selectedType,
          id: this.selectedTitle,
          requirementId: item._id,
          data: {
            type: this.editingField.type,
            price: this.editingField.price,
          },
        });

        this.$toast.open({
          message: res.msg || "Requirement updated successfully",
        });

        this.$set(this.fetchedRequirements, this.editingIndex, {
          ...item,
          ...this.editingField,
        });

        this.editingIndex = null;
        this.editingField = { type: "", price: null };
      } catch (error) {
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },

    async deleteRequirement(index) {
      const item = this.fetchedRequirements[index];
      try {
        const res = await this.deleteSpecialRequirements({
          type: this.selectedType,
          id: this.selectedTitle,
          requirementId: item._id,
        });
        this.$toast.open({
          message: res.msg || "Requirement deleted successfully",
        });
        this.fetchedRequirements.splice(index, 1);
      } catch (error) {
        this.$toast.open({
          message: error?.response?.data?.msg || this.$i18n.t("errorMessage"),
          type: "error",
        });
      }
    },
  },
};
</script>
