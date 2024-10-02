<template>
  <div>
    <div class="mt-6">
      <div class="relative overflow-x-auto w-[71%]">
        <table class="w-full text-left rtl:text-right">
          <thead class="bg-[#F4F4F4]">
            <tr>
              <th
                scope="col"
                class="pl-6 py-3 rounded-tl-lg text-[#000000] font-normal text-[12px]"
              >
                Sr. no
              </th>
              <th
                scope="col"
                class="py-3 text-[#000000] font-normal text-[12px]"
              >
                Image
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                Role
              </th>
              <th
                scope="col"
                class="py-3 rounded-tr-lg text-[#000000] font-normal text-[12px]"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody v-if="allData?.length > 0">
            <tr
              class="bg-white border-b cursor-pointer"
              v-for="(item, index) in allData"
              :key="index"
            >
              <th
                scope="row"
                class="pl-6 ftext-[#000000] font-normal text-[12px]"
              >
                <span class="">#</span>
              </th>
              <div class="flex">
                <td
                  class="pr-6 py-3"
                  v-for="(banner, index) in item?.banners"
                  :key="`image-${index}`"
                >
                  <img
                    @click="downloadFileItem(banner)"
                    :src="banner?.image"
                    alt="Banner"
                    class="w-16 h-12 rounded-lg"
                  />
                </td>
              </div>
              <td class="px-6 text-[#000000] font-normal text-xs">
                {{ item?.role }}
              </td>
              <td>
                <div class="flex items-center gap-2">
                  <img
                    src="@/static/svg/edit-icon.svg"
                    alt=""
                    class="w-[17px] h-[17px]"
                    @click="editUser(item)"
                  />
                  <!-- <img
                    src="@/static/svg/delete-icon.svg"
                    alt=""
                    class="w-[20px] h-[20px]"
                    @click="$emit('deleteItem', item?._id)"
                  /> -->
                </div>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td
                colspan="8"
                class="text-xl font-medium text-gray-400 text-center py-10"
              >
                No records available
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    allData: {
      type: Array,
      required: true,
    },
    paginationText: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    editUser(item) {
      this.$emit("handleClick", item);
    },
    downloadFileItem(banner) {
      const imageUrl = banner?.image;

      const link = document.createElement("a");
      link.href = imageUrl;

      const fileName = imageUrl.split("/").pop();
      link.download = fileName;

      link.click();
      link.remove();
    },
  },
};
</script>
