<template>
  <div>
    <header>
      <nav
        class="!fixed z-50 bg-white ml-0 w-full"
        :class="isShow ? 'sm:ml-[14rem]' : 'sm:ml-[3.5rem]'"
      >
        <div class="flex justify-between items-center w-full">
          <button
            @click="toggleSidebar"
            type="button"
            class="inline-flex items-center ms-3 display-block text-sm text-gray-500 rounded-lg sm:hidden focus:outline-none"
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              width="32"
              height="32"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          <div class="flex justify-between gap-5 items-center py-5 px-4 w-full">
            <div>
              <div class="flex gap-1 items-center">
                <p
                  class="sm:font-semibold font-normal sm:text-[20px] text-[10px] text-[#414141] sm:block hidden"
                >
                  Hi Welcome!
                </p>
                <img
                  src="@/static/Images/slap.webp"
                  alt=""
                  class="sm:block hidden"
                />
              </div>
              <p class="text-[#575757] text-sm font-light sm:block hidden">
                Login as Admin
              </p>
            </div>
            <div
              class="flex gap-4 items-center"
              :class="isShow ? 'sm:!mr-[15rem]' : 'sm:!mr-[4rem]'"
            >
              <img src="@/static/svg/moon.svg" alt="" />
              <img src="@/static/svg/bell.svg" alt="" />
              <h1 class="text-[#11263C] font-semibold text-[16px] capitalize">
                {{ profileData?.contactName || "admin" }}
              </h1>
              <div
                class="flex gap-2 cursor-pointer"
                @click="isDropdown = !isDropdown"
              >
                <img src="@/static/Images/header-image.webp" alt="" />
                <img src="@/static/svg/down-arrow.svg" alt="" />
              </div>
            </div>
          </div>
          <div class="relative">
            <div
              v-if="isDropdown"
              v-click-outside="closeDropdown"
              :class="isShow ? 'sm:right-[16rem] right-2' : 'sm:right-[5rem]'"
              class="z-50 absolute top-8 bg-white divide-y divide-gray-100 rounded-2xl w-40 shadow flex flex-col items-center dropdown-content"
              style="box-shadow: rgba(0, 0, 0, 0.5) 0px 6px 50px 0px"
            >
              <ul class="py-2 cursor-pointer" @click="closeDropdown">
                <nuxt-link to="/settings">
                  <li class="flex items-center gap-3 px-[18px]">
                    <img src="@/static/svg/settings-sliders.svg" alt="" />
                    <a class="block py-2.5 text-[#333333] font-medium text-base"
                      >Settings</a
                    >
                  </li>
                </nuxt-link>
                <li class="flex items-center gap-3 px-[18px]" @click="logOut">
                  <img src="@/static/svg/logout.svg" alt="" class="w-6 h-6" />
                  <a class="block py-2.5 text-[#333333] font-medium text-base"
                    >Logout</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <transition name="fade">
      <aside
        :class="
          isSidebarOpen ? 'translate-x-0 slide-in-right' : '-translate-x-full'
        "
        :style="{ width: sidebarWidth }"
        class="fixed top-0 left-0 z-40 h-screen transition-transform sm:translate-x-0 bg-[#F5F9FD] ease-in-out duration-500 delay-1000"
        aria-label="Sidebar"
      >
        <div class="bg-dashboard-img h-full py-7">
          <div>
            <div class="flex items-center justify-center gap-3">
              <img
                src="@/static/Images/slime.webp"
                alt=""
                class="cursor-pointer sm:block hidden"
                @click="toggleSidebarWidth"
              />
              <nuxt-link to="/dashboard">
                <img
                  src="@/static/Images/header-logo.webp"
                  alt=""
                  v-if="isShow"
                />
              </nuxt-link>
            </div>
            <div class="flex justify-center mt-12 sidebar">
              <ul
                class="flex flex-col text-white text-xl font-medium cursor-pointer w-full list-none relative"
              >
                <li
                  v-for="(tab, key) in sideBarItems"
                  :key="key"
                  @click="toggleSidebarItems(tab)"
                  :class="
                    previousPath == tab.href
                      ? 'bg-[#3683D5] text-white'
                      : 'text-[#686868]'
                  "
                >
                  <Nuxt-link
                    v-if="!tab.subItems"
                    :to="tab.href"
                    class="flex items-center gap-2 ml-5 py-[20px] relative group"
                  >
                    <img
                      :src="previousPath == tab.href ? tab.svg : tab.blackSvg"
                      alt=""
                    />
                    <div v-if="!isShow" :class="['tooltip', 'visible-tooltip']">
                      <span>
                        {{ tab?.name }}
                      </span>
                    </div>
                    <span
                      v-if="isShow"
                      class="flex gap-4 font-medium text-sm"
                      :class="
                        previousPath == tab.href
                          ? 'text-white'
                          : 'text-[#686868]'
                      "
                      >{{ tab.name }}</span
                    >
                  </Nuxt-link>
                  <div
                    v-if="tab.subItems"
                    class="flex items-center gap-2 ml-5 py-[20px] group"
                  >
                    <img
                      :src="
                        previousPath == tab.href ||
                        tab.subItems.some(
                          (subItem) => previousPath == subItem.href
                        )
                          ? tab.svg
                          : tab.blackSvg
                      "
                      alt=""
                    />
                    <div class="flex gap-10 items-center">
                      <span
                        v-if="!isShow"
                        :class="['sideitem-tooltip', 'visible-tooltip']"
                        class=""
                      >
                        <span class="mb-2"> Manage Serivces </span>
                        <span
                          v-for="(subItem, subIndex) in tab.subItems"
                          :key="subIndex"
                        >
                          <Nuxt-link
                            :to="subItem.href"
                            class="flex items-center gap-1"
                          >
                            <div
                              class="bg-white !w-1.5 !h-1.5 rounded-full"
                            ></div>
                            {{ subItem?.name }}
                          </Nuxt-link>
                        </span>
                      </span>
                      <span
                        v-if="isShow"
                        class="flex gap-4 font-medium text-sm"
                      >
                        {{ tab.name }}
                      </span>
                      <div v-if="isShow">
                        <img
                          src="@/static/svg/black-down-arrow.svg"
                          alt=""
                          class="w-5"
                          v-if="tab.isOpenSubMenu"
                        />
                        <img
                          src="@/static/svg/black-right-arrow.svg"
                          class="w-5"
                          alt=""
                          v-else
                        />
                      </div>
                    </div>
                  </div>
                  <div class="">
                    <transition name="fade" mode="out-in">
                      <ul class="slide-in-top" v-if="tab.isOpenSubMenu">
                        <li
                          v-for="subItem in tab.subItems"
                          :key="subItem.href"
                          :class="
                            previousPath == subItem.href
                              ? 'bg-[#3683D5] text-white'
                              : 'text-[#686868]'
                          "
                          class="pl-12"
                        >
                          <Nuxt-link
                            :to="subItem.href"
                            class="flex items-center gap-2 py-[10px]"
                          >
                            <span
                              :class="
                                previousPath == subItem.href
                                  ? 'bg-white'
                                  : ' bg-black'
                              "
                              class="w-1.5 h-1.5 rounded-full"
                            ></span>
                            <span
                              v-if="isShow"
                              :class="
                                previousPath == subItem.href
                                  ? 'text-white'
                                  : 'text-[#686868]'
                              "
                              class="flex gap-4 font-medium text-sm"
                              >{{ subItem.name }}</span
                            >
                          </Nuxt-link>
                        </li>
                      </ul>
                    </transition>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </transition>
    <div class="p-4 ml-0" :class="isShow ? 'sm:ml-[14rem]' : 'sm:ml-[3.5rem]'">
      <div
        v-if="isSidebarOpen"
        @click="isSidebarOpen = false"
        class="bg-gray-900/50 fixed sm:inset-full inset-0 z-30"
      ></div>
      <div class="mt-24">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import dashboardSvg from "@/static/svg/dashboard.svg";
import blackDashboardSvg from "@/static/svg/black-dashboard.svg";
import blackServicesSvg from "@/static/svg/black-services.svg";
import servicesSvg from "@/static/svg/services.svg";
import userSvg from "@/static/svg/user.svg";
import blackUserSvg from "@/static/svg/black-user.svg";
import carrierSvg from "@/static/svg/carrier.svg";
import blackCarrierSvg from "@/static/svg/black-carrier.svg";
import settingsSvg from "@/static/svg/settings.svg";
import blackSettingsSvg from "@/static/svg/black-settings.svg";
import bannerSvg from "@/static/svg/banner.svg";
import blackBannerSvg from "@/static/svg/black-banner.svg";
import blackCityManagementSvg from "@/static/svg/black-city-management.svg";
import cityManagementSvg from "@/static/svg/city-management.svg";
import cmsManagementSvg from "@/static/svg/cms.svg";
import blackCmsManagementSvg from "@/static/svg/black-cms.svg";
import manageRoleSvg from "@/static/svg/manage-role.svg";
import blackManageRoleSvg from "@/static/svg/black-manage-role.svg";
import blackManageServiceSvg from "@/static/svg/black-manage-services.svg";
import subAdminSvg from "@/static/svg/sub-admin.svg";
import blackSubAdminSvg from "@/static/svg/black-sub-admin.svg";
import Cookies from "js-cookie";
import { mapGetters, mapActions } from "vuex";

export default {
  middleware: ["auth", "permissionCheck"],
  data() {
    return {
      isSidebarOpen: false,
      isDropdown: false,
      expandedMenu: false,
      isShow: true,
      tooltipVisible: null,
      sidebarWidth: "14rem",
      sideBarItems: [
        {
          name: "Dashboard",
          href: "/dashboard",
          isActive: true,
          isOpenSubMenu: false,
          svg: dashboardSvg,
          blackSvg: blackDashboardSvg,
        },
        {
          name: "Order Management",
          href: "/services",
          isActive: false,
          isOpenSubMenu: false,
          svg: servicesSvg,
          blackSvg: blackServicesSvg,
        },
        {
          name: "User",
          href: "/user",
          isActive: false,
          isOpenSubMenu: false,
          svg: userSvg,
          blackSvg: blackUserSvg,
        },
        {
          name: "Carrier",
          href: "/carrier",
          isActive: false,
          isOpenSubMenu: false,
          svg: carrierSvg,
          blackSvg: blackCarrierSvg,
        },
        {
          name: "Banners",
          href: "/banners",
          isActive: false,
          isOpenSubMenu: false,
          svg: bannerSvg,
          blackSvg: blackBannerSvg,
        },
        {
          name: "Manage Services",
          isActive: false,
          isOpenSubMenu: false,
          svg: blackManageServiceSvg,
          blackSvg: blackManageServiceSvg,
          subItems: [
            { name: "Service", href: "/manage-services" },
            { name: "Transportation", href: "/manage-transportation" },
            {
              name: "Mode Of Transportation",
              href: "/manage-mode-of-transportation",
            },
            {
              name: "Port & Bridge",
              href: "/port-bridge",
            },
            {
              name: "Securing Equipment",
              href: "/securing-equipment",
            },
          ],
        },
        {
          name: "City Management",
          href: "/manage-area",
          isActive: false,
          isOpenSubMenu: false,
          svg: cityManagementSvg,
          blackSvg: blackCityManagementSvg,
        },
        {
          name: "Manage CMS",
          href: "/manage-cms",
          isActive: false,
          isOpenSubMenu: false,
          svg: cmsManagementSvg,
          blackSvg: blackCmsManagementSvg,
        },
        {
          name: "Manage Role",
          href: "/manage-role",
          isActive: false,
          isOpenSubMenu: false,
          svg: manageRoleSvg,
          blackSvg: blackManageRoleSvg,
        },
        {
          name: "Sub Admin",
          href: "/sub-admin",
          isActive: false,
          svg: subAdminSvg,
          blackSvg: blackSubAdminSvg,
        },
        {
          name: "Settings",
          href: "/settings",
          isActive: false,
          isOpenSubMenu: false,
          svg: settingsSvg,
          blackSvg: blackSettingsSvg,
        },
      ],
      previousPath: "/dashboard",
    };
  },
  watch: {
    "$route.path"(newPath) {
      this.previousPath = this.$router.history.current.fullPath;
      this.updateActiveTab(newPath);
    },
  },
  computed: {
    ...mapGetters({
      profileData: "auth/getUserProfile",
      permissionsData: "auth/getPermissionsData",
    }),
  },
  methods: {
    ...mapActions({
      checkPermissions: "auth/checkPermissions",
    }),
    closeDropdown() {
      this.isDropdown = false;
    },
    toggleSidebarItems(tab) {
      if (!this.isShow) {
        tab.isOpenSubMenu = false;
      } else {
        tab.isOpenSubMenu = !tab.isOpenSubMenu;
        this.isSidebarOpen = false;
      }
    },
    async logOut() {
      Cookies.remove("token");
      this.$router.push("/login");
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    showTooltip(index) {
      this.tooltipVisible = index;
    },
    hideTooltip() {
      this.tooltipVisible = null;
    },
    toggleSidebarWidth() {
      this.sidebarWidth = this.sidebarWidth === "14rem" ? "3.5rem" : "14rem";
      this.isShow = !this.isShow;
    },
    updateActiveTab(path) {
      this.sideBarItems.forEach((tab) => {
        if (tab.subItems) {
          const activeSubItem = tab.subItems.find((subItem) =>
            path.startsWith(subItem.href)
          );
          tab.isActive = !!activeSubItem;
          if (activeSubItem) {
            this.previousPath = activeSubItem.href;
            this.expandedMenu = this.sideBarItems.indexOf(tab);
          }
        } else if (path.startsWith(tab.href)) {
          tab.isActive = true;
          this.previousPath = tab.href;
        } else {
          tab.isActive = false;
        }
      });
    },
    async fetchPermissions() {
      try {
        await this.checkPermissions();
        if (this.permissionsData && this.permissionsData.menuDetails) {
          this.sideBarItems = this.sideBarItems.filter((item) => {
            const matchedMenu = this.permissionsData.menuDetails.find(
              (menu) => menu.menuTitle === item.name
            );
            return matchedMenu?.read;
          });
        } else {
          console.warn("menuDetails not found in API response.");
        }
      } catch (error) {
        console.log(error, "error");
      }
    },
  },
  beforeMount() {
    this.fetchPermissions();
    this.updateActiveTab(this.$router.history.current.fullPath);
  },
};
</script>
<style scoped>
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(3%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.slide-in-right {
  animation: slideInRight 0.5s ease-in-out forwards;
}
@keyframes slideInTop {
  from {
    opacity: 0;
    transform: translateY(-3%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-in-top {
  animation: slideInTop 0.5s ease-in-out forwards;
}
.rotate-86 {
  transform: rotate(-86deg);
  transition: transform 0.3s ease;
}
.tooltip {
  position: absolute;
  z-index: 999;
  left: 36px;
  top: 32px;
  transform: translateY(-50%);
  background-color: #3683d5;
  color: white;
  font-size: 16px;
  width: 180px;
  padding: 5px 5px;
  border-radius: 4px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}
.sideitem-tooltip {
  position: absolute;
  z-index: 999;
  left: 56px;
  top: 440px;
  transform: translateY(-50%);
  background-color: #3683d5;
  color: white;
  font-size: 16px;
  padding: 18px 24px;
  border-radius: 4px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease;
  width: 235px;
  display: flex !important;
  flex-direction: column !important;
  row-gap: 7px;
}

.group:hover .visible-tooltip {
  opacity: 1;
  visibility: visible;
  display: block;
}

.dropdown-content:after {
  content: "";
  position: absolute;
  top: 4px;
  right: 15%;
  margin-top: -15px;
  z-index: 1;
  border-bottom: solid 15px #fff;
  border-left: solid 12px transparent;
  border-right: solid 12px transparent;
}
</style>
