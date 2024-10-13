import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { TranslationService } from "./translation.service";

export class TranslatedNotificationService {
  static async show(
    key: `${string}.${string}`,
    settings?: Partial<{
      background: string;
      verticalPosition: "top" | "bottom";
    }>
  ) {
    const { translation } = await TranslationService.translate(key);

    NotificationService.show(translation || "", settings);
  }
}

export class NotificationService {
  static success(
    text: string,
    settings?: Partial<{
      background: string;
      verticalPosition: "top" | "bottom";
    }>
  ) {
    NotificationService.show(text, { ...settings, background: "green" });
  }
  static show(
    text: string,
    settings?: Partial<{
      background: string;
      verticalPosition: "top" | "bottom";
    }>
  ) {
    const toast = Toastify({
      duration: 1500,
      gravity: settings?.verticalPosition || "top",
      position: "right",
      text: text,
      style: {
        background: settings?.background || "green",
      },
    });

    toast.options.onClick = () => {
      toast.hideToast();
    };

    toast.showToast();
  }
}
