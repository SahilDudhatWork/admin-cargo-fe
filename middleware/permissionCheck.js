export default async function ({ store, route, redirect, from }) {
  try {
    const response = await store.dispatch("auth/checkPermissions");

    if (response && response.data) {
      const roleTitle = response.data.roleTitle;

      if (roleTitle === "Full Permission") {
        return;
      }

      const permissions = {
        "/user": { action: "read", permission: "User" },
        "/user/add-user": { action: "add", permission: "User" },
        "/user/edit-user": { action: "edit", permission: "User" },
        "/carrier": { action: "read", permission: "Carrier" },
        "/carrier/add-carrier": { action: "add", permission: "Carrier" },
        "/carrier/edit-carrier": { action: "edit", permission: "Carrier" },
        "/banners": { action: "read", permission: "Banners" },
        "/banners/add-banners": { action: "add", permission: "Banners" },
        "/banners/edit-banners": { action: "edit", permission: "Banners" },
        "/manage-cms": { action: "read", permission: "Manage CMS" },
        "/manage-cms/add-cms": { action: "add", permission: "Manage CMS" },
        "/manage-cms/edit-cms": { action: "edit", permission: "Manage CMS" },
        "/manage-area": { action: "read", permission: "City Management" },
        "/manage-area/add-area": {
          action: "add",
          permission: "City Management",
        },
        "/manage-area/edit-area": {
          action: "edit",
          permission: "City Management",
        },
        "/sub-admin": { action: "read", permission: "Sub Admin" },
        "/sub-admin/add-sub-admin": {
          action: "add",
          permission: "Sub Admin",
        },
        "/sub-admin/edit-sub-admin": {
          action: "edit",
          permission: "Sub Admin",
        },
        "/manage-role": { action: "read", permission: "Manage Role" },
        "/manage-role/add-role": { action: "add", permission: "Manage Role" },
        "/manage-role/edit-role": { action: "edit", permission: "Manage Role" },

        // _______________________Manage services____________

        "/manage-services": { action: "read", permission: "Service" },
        "/manage-services/add-service": {
          action: "add",
          permission: "Service",
        },
        "/manage-services/edit-service": {
          action: "edit",
          permission: "Service",
        },

        "/manage-transportation": {
          action: "read",
          permission: "Transportation",
        },
        "/manage-transportation/add-transportation": {
          action: "add",
          permission: "Transportation",
        },
        "/manage-transportation/edit-transportation": {
          action: "edit",
          permission: "Transportation",
        },

        "/manage-mode-of-transportation": {
          action: "read",
          permission: "Mode Of Transportation",
        },
        "/manage-mode-of-transportation/add-modeOfTransportation": {
          action: "add",
          permission: "Mode Of Transportation",
        },
        "/manage-mode-of-transportation/edit-modeOfTransportation": {
          action: "edit",
          permission: "Mode Of Transportation",
        },

        "/port-bridge": {
          action: "read",
          permission: "Port & Bridge",
        },
        "/port-bridge/add-port-bridge": {
          action: "add",
          permission: "Port & Bridge",
        },
        "/port-bridge/edit-port-bridge": {
          action: "edit",
          permission: "Port & Bridge",
        },

        "/securing-equipment": {
          action: "read",
          permission: "Securing Equipment",
        },
        "/securing-equipment/add-securing-equipment": {
          action: "add",
          permission: "Securing Equipment",
        },
        "/securing-equipment/edit-securing-equipment": {
          action: "edit",
          permission: "Securing Equipment",
        },
        // ___________________________________

        "/services": { action: "read", permission: "Order Management" },
        "/settings": { action: "read", permission: "Settings" },
        "/dashboard": { action: "read", permission: "Dashboard" },
      };

      const currentPath = route.fullPath.replace(/\/+$/, "");

      const currentPermission = permissions[currentPath];

      if (currentPermission) {
        const { action, permission } = currentPermission;
        const access = store.getters["auth/getSinglePermission"](permission);

        if (!access || !access[action]) {
          history.back();
        }
      }
    }
  } catch (error) {
    console.log(error, "error");
  }
}