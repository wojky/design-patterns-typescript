import { NotificationService, TranslatedNotificationService } from "./notifcation.service";
import { TranslationService } from "./translation.service";

document.getElementById("lang")?.addEventListener("click", () => {
  TranslationService.language = TranslationService.language === "EN" ? "PL" : "EN";

  document.getElementById("lang")!.textContent = `Toast Language: ${TranslationService.language}`;
});

document.getElementById("simple")?.addEventListener("click", () => {
  NotificationService.show("This is text");
});

document.getElementById("translation")?.addEventListener("click", async () => {
  TranslatedNotificationService.show("NOTIFICATIONS.EXAMPLE", { background: "peru" });
});
