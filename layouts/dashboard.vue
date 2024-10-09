<template>
  <div>
    <header>
      <nav
        class="!fixed z-50 bg-white sm:ml-[15rem] w-full"
        :style="{ marginLeft: contentLeft }"
      >
        <div class="flex justify-between items-center w-full">
          <button
            @click="toggleSidebar"
            type="button"
            class="inline-flex items-center ms-3 display-block text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none"
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
          <div
            class="flex justify-between gap-5 items-center py-5 px-4"
            :style="{ width: contentWidth }"
          >
            <div>
              <div class="flex gap-1 items-center">
                <p class="font-semibold text-[20px] text-[#414141]">
                  Hi Welcome!
                </p>
                <img src="@/static/Images/slap.webp" alt="" />
              </div>
              <p class="text-[#575757] text-sm font-light">Login as Admin</p>
            </div>
            <div class="flex gap-4 items-center">
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
              class="z-50 absolute right-[16rem] top-8 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer"
                aria-labelledby="dropdownHoverButton"
                @click="closeDropdown"
              >
                <li>
                  <a
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Profile</a
                  >
                </li>
                <li>
                  <a
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Settings</a
                  >
                </li>
                <li>
                  <a
                    @click="logOut"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Log out</a
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
        <div class="bg-dashboard-img h-full py-7 dark:bg-gray-800">
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
                class="flex flex-col text-white text-xl font-medium cursor-pointer w-full list-none"
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
                    class="flex items-center gap-2 ml-5 py-[20px]"
                  >
                    <img
                      :src="previousPath == tab.href ? tab.svg : tab.blackSvg"
                      alt=""
                    />

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
                    class="flex items-center gap-2 ml-5 py-[20px]"
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
                        v-if="isShow"
                        class="flex gap-4 font-medium text-sm"
                      >
                        {{ tab.name }}
                      </span>
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
    <div class="p-4 sm:ml-[15rem]" :style="{ marginLeft: contentLeft }">
      <div
        v-if="isSidebarOpen"
        @click="isSidebarOpen = false"
        class="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30"
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
// import manageServiceSvg from "@/static/svg/manage-service.svg";
import blackManageServiceSvg from "@/static/svg/black-manage-services.svg";
import Cookies from "js-cookie";
import { mapGetters } from "vuex";

export default {
  middleware: "auth",
  data() {
    return {
      isSidebarOpen: false,
      isDropdown: false,
      expandedMenu: false,
      isShow: true,
      sidebarWidth: "14rem",
      contentLeft: "15rem",
      contentWidth: "87%",
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
          name: "Services",
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
          name: "Setting",
          href: "/setting",
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
  beforeMount() {
    this.updateActiveTab(this.$router.history.current.fullPath);
  },
  computed: {
    ...mapGetters({
      profileData: "auth/getUserProfile",
    }),
  },
  methods: {
    closeDropdown() {
      this.isDropdown = false;
    },
    toggleSidebarItems(tab) {
      if (tab?.name == "Manage Services") {
        tab.isOpenSubMenu = !tab.isOpenSubMenu;
      }
    },
    async logOut() {
      Cookies.remove("token");
      this.$router.push("/login");
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    toggleSidebarWidth() {
      this.sidebarWidth = this.sidebarWidth === "14rem" ? "3.5rem" : "14rem";
      this.contentLeft = this.contentLeft === "15rem" ? "3.5rem" : "15rem";
      this.contentWidth = this.contentWidth === "87%" ? "97%" : "87%";
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
</style>
