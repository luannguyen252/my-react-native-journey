import i18n from "i18n-js";

export function translate(key, options) {
  return key ? i18n.t(key, options) : null;
}
