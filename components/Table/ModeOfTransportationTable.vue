<template>
  <div>
    <div class="mt-6">
      <div class="relative overflow-x-auto">
        <table class="w-full text-left rtl:text-right">
          <thead class="bg-[#F4F4F4]">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 rounded-tl-lg text-[#000000] font-normal text-[12px]"
              >
                Sr. no
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                Transportation ID
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                Transportation
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                Title
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                Price
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                Description
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
              <td class="px-6 py-6">#</td>
              <td scope="row" class="px-6 ftext-[#000000] font-normal text-xs">
                <span class="border-b border-black">{{ item?._id }}</span>
              </td>
              <td class="px-6">
                <span class="text-[#000000] font-normal text-xs pt-3">{{
                  item?.mode
                }}</span>
              </td>
              <td class="px-6">
                <span class="text-[#000000] font-normal text-xs pt-3">{{
                  item?.title
                }}</span>
              </td>
              <td>
                <span class="text-[#000000] font-normal text-xs pb-5 px-6">
                  {{ item?.price }}
                </span>
              </td>
              <td class="px-6 text-[#000000] font-normal text-xs">
                {{ item?.description }}
              </td>
              <td class="flex items-center gap-2">
                <img
                  src="@/static/svg/edit-icon.svg"
                  alt=""
                  class="w-[17px] h-[17px] mt-6"
                  @click="$emit('handleClick', item._id)"
                />
                <img
                  src="@/static/svg/delete-icon.svg"
                  alt=""
                  class="w-[20px] h-[20px] mt-6"
                  @click="$emit('deleteItem', item._id)"
                />
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
  },
  data() {
    return {};
  },
};
</script>
