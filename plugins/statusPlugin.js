export default (ctx, inject) => {
  const checkQr = (status) => {
    return status !== "NewAssignments" && status !== "Pending";
  };
  const checkUserUpload = (status) => {
    return status !== "NewAssignments";
  };
  const checkProofOfPhotography = (status) => {
    return status === "Completed";
  };

  inject("checkQr", checkQr);
  inject("checkUserUpload", checkUserUpload);
  inject("checkProofOfPhotography", checkProofOfPhotography);
};
