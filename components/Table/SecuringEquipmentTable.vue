<template>
  <div>
    <div class="mt-6">
      <div class="relative overflow-x-auto w-[71%]">
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
                chains
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                tarps
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-[#000000] font-normal text-[12px]"
              >
                straps
              </th>
              <th
                scope="col"
                class="py-3 rounded-tr-lg text-[#000000] font-normal text-[12px]"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody v-if="allData">
            <tr class="bg-white border-b cursor-pointer">
              <td class="px-6 py-6">#</td>
              <td class="px-6">
                <span class="text-[#000000] font-normal text-xs pt-3">{{
                  allData?.chains
                }}</span>
              </td>
              <td class="px-6">
                <span class="text-[#000000] font-normal text-xs pt-3">{{
                  allData?.tarps
                }}</span>
              </td>
              <td>
                <span class="text-[#000000] font-normal text-xs pb-5 px-6">
                  {{ allData?.straps }}
                </span>
              </td>

              <td class="flex items-center gap-2">
                <img
                  src="@/static/svg/edit-icon.svg"
                  alt=""
                  class="w-[17px] h-[17px] mt-6"
                  @click="$emit('handleClick')"
                />
                <img
                  src="@/static/svg/delete-icon.svg"
                  alt=""
                  class="w-[20px] h-[20px] mt-6"
                  @click="$emit('deleteItem')"
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
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>
