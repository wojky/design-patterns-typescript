const paramInterpolationRegex = /\$\{(.*?)\}/g;

export class TranslationService {
  static language: "EN" | "PL" = "EN";

  static async translate(sectionKey: string, params?: Record<string, string | number>) {
    return (await fetch(`translations/${TranslationService.language}.json`))
      .json()
      .then((records: Record<string, Record<string, string>>) => {
        const [section, key] = sectionKey.split(".");
        const record = records[section][key];

        if (!record) {
          return { ok: false };
        }

        const matches: string[] = [];

        let match: RegExpExecArray | null;

        while ((match = paramInterpolationRegex.exec(record)) !== null) {
          matches.push(match[1]);
        }

        if (matches.length && params) {
          return {
            ok: true,
            translation: matches.reduce((translation, param) => {
              return translation.replace("${" + param + "}", params[param]?.toString() || "${" + param + "}");
            }, record),
          };
        }

        return { ok: true, translation: record };
      });
  }
}
