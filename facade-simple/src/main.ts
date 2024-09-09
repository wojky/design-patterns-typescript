import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { TranslationService } from "./translation.service";

document.getElementById("lang")?.addEventListener("click", () => {
  TranslationService.language = TranslationService.language === "EN" ? "PL" : "EN";

  document.getElementById("lang")!.textContent = `Toast Language: ${TranslationService.language}`;
});

document.getElementById("simple")?.addEventListener("click", () => {
  Toastify({
    duration: 1500,
    gravity: "top",
    position: "right",
    text: "This is toast",
    style: {
      background: "green",
    },
  }).showToast();
});

document.getElementById("translation")?.addEventListener("click", async () => {
  const { translation } = await TranslationService.translate("NOTIFICATIONS.EXAMPLE");

  const toast = Toastify({
    duration: 1500,
    gravity: "top",
    position: "right",
    text: translation,
  });

  toast.options.onClick = () => {
    toast.hideToast();
  };

  toast.showToast();
});
