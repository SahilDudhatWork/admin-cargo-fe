export default async (ctx, inject) => {
  const validatePhoneNumber = async (number) => {
    const phonePattern = /^\d{10}$/;
    if (number && !phonePattern.test(number)) {
      return false;
    }
    return true;
  };
  const validateNumber = async (value) => {
    let number = value.replace(/\D/g, "");

    if (number.length > 10) {
      number = number.slice(0, 10);
    }
    return number;
  };
  const validatePrice = async (value) => {
    let number = value.replace(/\D/g, "");
    return number;
  };
  const validateUserForm = async ({ form, isEdit = false }) => {
    const errors = {};
    const isEmpty = (value) => {
      return typeof value === "string" ? value.trim() === "" : !value;
    };
    const setError = (fieldName, message) => {
      errors[fieldName] = message;
    };

    const validateField = (field, fieldName, errorLabel) => {
      if (isEmpty(field)) {
        setError(fieldName, `${errorLabel} is required`);
      }
    };

    validateField(form.companyName, "companyName", "company-name");
    validateField(form.contactName, "contactName", "contact-name");
    validateField(form.contactNumber, "contactNumber", "contact-number");
    validateField(form.email, "email", "email");
    if (!isEdit) {
      validateField(form.password, "password", "password");
    }

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("email", "Invalid email format");
    }
    if (!(await validatePhoneNumber(form.contactNumber))) {
      setError("contactNumber", "Invalid contact-number format");
    }

    if (form.companyFormationType === "USA") {
      if (!form.companyFormation.usa.w9_Form) {
        setError("w9_Form", "W9 Form is required");
      }
      if (!form.companyFormation.usa.utility_Bill) {
        setError("utility_Bill", "Utility Bill is required");
      }
    } else if (form.companyFormationType === "MEXICO") {
      if (!form.companyFormation.maxico.copia_Rfc_Form) {
        setError("copia_Rfc_Form", "Copia Rfc Form is required");
      }
      if (!form.companyFormation.maxico.constance_Of_Fiscal_Situation) {
        setError(
          "constance_Of_Fiscal_Situation",
          "Constance Of Fiscal Situation is required"
        );
      }
      if (!form.companyFormation.maxico.proof_of_Favorable) {
        setError("proof_of_Favorable", "Proof Of Favorable is required");
      }
      if (!form.companyFormation.maxico.proof_Of_Address) {
        setError("proof_Of_Address", "Proof Of Address is required");
      }
    }

    form.commercialReference.forEach(async (ref, index) => {
      if (
        ref.companyName ||
        ref.contactName ||
        ref.emailAddress ||
        ref.contactNo
      ) {
        validateField(
          ref.companyName,
          `commercialReference[${index}].companyName`,
          "company-name"
        );
        validateField(
          ref.contactName,
          `commercialReference[${index}].contactName`,
          "contact-name"
        );
        validateField(
          ref.emailAddress,
          `commercialReference[${index}].emailAddress`,
          "email"
        );
        if (
          ref.emailAddress &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ref.emailAddress)
        ) {
          setError(
            `commercialReference[${index}].emailAddress`,
            "Invalid email format"
          );
        }
        validateField(
          ref.contactNo,
          `commercialReference[${index}].contactNo`,
          "contact-number"
        );
      }
      if (!(await validatePhoneNumber(ref.contactNo))) {
        setError(
          `commercialReference[${index}].contactNo`,
          "Invalid contact-number format"
        );
      }
    });

    return errors;
  };
  const validateCarrierForm = async ({ form, isEdit = false }) => {
    const errors = {};
    const isEmpty = (value) => {
      return typeof value === "string" ? value.trim() === "" : !value;
    };
    const setError = (fieldName, message) => {
      errors[fieldName] = message;
    };

    const validateField = (field, fieldName, errorLabel) => {
      if (isEmpty(field)) {
        setError(fieldName, `${errorLabel} is required`);
      }
    };

    validateField(form.companyName, "companyName", "company-name");
    validateField(form.contactName, "contactName", "contact-name");
    validateField(form.contactNumber, "contactNumber", "contact-number");
    validateField(form.email, "email", "email");
    validateField(form.password, "password", "password");

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("email", "Invalid email format");
    }
    if (!(await validatePhoneNumber(form.contactNumber))) {
      setError("contactNumber", "Invalid contact-number format");
    }

    // if (!form.scac) {
    //   setError("scac", "scac is required");
    // }
    // if (!form.caat) {
    //   setError("caat", "Caat is required");
    // }
    // if (!form.insurancePolicy) {
    //   setError("insurancePolicy", "InsurancePolicy is required");
    // }
    // if (!form.oea) {
    //   setError("oea", "Oea is required");
    // }
    // if (!form.ctpat) {
    //   setError("ctpat", "Ctpat is required");
    // }

    if (form.companyFormationType === "USA") {
      if (!form.companyFormation.usa.w9_Form) {
        setError("w9_Form", "W9 Form is required");
      }
      if (!form.companyFormation.usa.utility_Bill) {
        setError("utility_Bill", "Utility Bill is required");
      }
    } else if (form.companyFormationType === "MEXICO") {
      if (!form.companyFormation.maxico.copia_Rfc_Form) {
        setError("copia_Rfc_Form", "Copia Rfc Form is required");
      }
      if (!form.companyFormation.maxico.constance_Of_Fiscal_Situation) {
        setError(
          "constance_Of_Fiscal_Situation",
          "Constance Of Fiscal Situation is required"
        );
      }
      if (!form.companyFormation.maxico.proof_of_Favorable) {
        setError("proof_of_Favorable", "Proof Of Favorable is required");
      }
      if (!form.companyFormation.maxico.proof_Of_Address) {
        setError("proof_Of_Address", "Proof Of Address is required");
      }
    }

    form.commercialReference.forEach(async (ref, index) => {
      if (
        ref.companyName ||
        ref.contactName ||
        ref.emailAddress ||
        ref.contactNo
      ) {
        validateField(
          ref.companyName,
          `commercialReference[${index}].companyName`,
          "company-name"
        );
        validateField(
          ref.contactName,
          `commercialReference[${index}].contactName`,
          "contact-name"
        );
        validateField(
          ref.emailAddress,
          `commercialReference[${index}].emailAddress`,
          "email"
        );
        if (
          ref.emailAddress &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ref.emailAddress)
        ) {
          setError(
            `commercialReference[${index}].emailAddress`,
            "Invalid email format"
          );
        }
        validateField(
          ref.contactNo,
          `commercialReference[${index}].contactNo`,
          "contact-number"
        );
      }
      if (!(await validatePhoneNumber(ref.contactNo))) {
        setError(
          `commercialReference[${index}].contactNo`,
          "Invalid contact-number format"
        );
      }
    });

    return errors;
  };
  const validateBannerForm = async ({ form, selectedUserLabel }) => {
    const errors = [];

    const isEmpty = (value) => {
      return typeof value === "string" ? value.trim() === "" : !value;
    };

    const setError = (fieldName, message) => {
      errors[fieldName] = message;
    };

    const validateField = (field, fieldName, errorLabel, index) => {
      if (isEmpty(field)) {
        setError(`${fieldName}${index}`, `${errorLabel} is required`);
      }
    };

    if (selectedUserLabel === "Select option") {
      errors.push({ selectedUserLabel: "Please select an option" });
    }
    form.forEach((item, index) => {
      validateField(item.image, "image", "Banner Image", index);
    });

    return errors;
  };

  const validateServices = async ({
    form,
    selectedModeOfTransportationLabel,
  }) => {
    const errors = [];

    const isEmpty = (value) => {
      return typeof value === "string" ? value.trim() === "" : !value;
    };

    const setError = (fieldName, message) => {
      errors[fieldName] = message;
    };
    if (selectedModeOfTransportationLabel === "Select option") {
      setError("selectedModeOfTransportationLabel", "Please select an option");
    }
    if (isEmpty(form.title)) {
      setError("title", "title is required");
    }
    if (isEmpty(form.price)) {
      setError("price", "price is required");
    }

    return errors;
  };

  const validatePortBridge = async ({ form }) => {
    const errors = [];

    const isEmpty = (value) => {
      return typeof value === "string" ? value.trim() === "" : !value;
    };

    const setError = (fieldName, message) => {
      errors[fieldName] = message;
    };
    if (isEmpty(form.post_bridge)) {
      setError("post_bridge", "Post & Bridge is required");
    }

    form.requirements.forEach((item, index) => {
      if (isEmpty(item.type)) {
        setError(`type${index}`, "Type is required");
      }
      if (isEmpty(item.price)) {
        setError(`price${index}`, "Price is required");
      }
    });

    return errors;
  };

  const validateSecuringEquipment = async ({ form }) => {
    const errors = [];

    const isEmpty = (value) => {
      return typeof value === "string" ? value.trim() === "" : !value;
    };

    const setError = (fieldName, message) => {
      errors[fieldName] = message;
    };
    if (isEmpty(form.chains)) {
      setError("chains", "chains is required");
    }
    if (isEmpty(form.tarps)) {
      setError("tarps", "tarps is required");
    }
    if (isEmpty(form.straps)) {
      setError("straps", "straps is required");
    }

    return errors;
  };

  inject("validateUserForm", validateUserForm);
  inject("validateCarrierForm", validateCarrierForm);
  inject("validateBannerForm", validateBannerForm);
  inject("validateServices", validateServices);
  inject("validatePortBridge", validatePortBridge);
  inject("validateSecuringEquipment", validateSecuringEquipment);
  inject("validateNumber", validateNumber);
  inject("validatePrice", validatePrice);
};
