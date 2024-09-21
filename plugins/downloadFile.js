export default async (ctx, inject) => {
  const downloadFile = async (file) => {
    const link = document.createElement("a");
    link.href = file.src;
    link.download = file.name;
    link.addEventListener("click", (event) => event.stopPropagation(), {
      once: true,
    });
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  inject("downloadFile", downloadFile);
};
