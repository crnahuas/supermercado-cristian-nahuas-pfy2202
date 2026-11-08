import { productTypes } from "./productTypes.js";

// Letras Unicode para admitir tildes y marcas extranjeras; la puntuación
// corresponde a nombres comerciales y presentaciones de supermercado.
export const articleSchema = {
  name: {
    label: "Nombre del artículo",
    placeholder: "Ej.: Arroz grano largo",
    maxLength: 100,
    pattern: /^[\p{L}\p{N}][\p{L}\p{M}\p{N} .,'’()/%+&-]*$/u,
    requiredMessage: "Ingresa el nombre del artículo.",
    lengthMessage: "El campo nombre admite hasta 100 caracteres.",
    invalidMessage:
      "El nombre debe comenzar con una letra o número y solo admite letras, números, espacios y . , ' ’ ( ) / % + & -.",
  },
  brand: {
    label: "Marca",
    placeholder: "Ej.: Tucapel",
    maxLength: 100,
    pattern: /^[\p{L}\p{N}][\p{L}\p{M}\p{N} .,'’&()+-]*$/u,
    requiredMessage: "Ingresa la marca del artículo.",
    lengthMessage: "El campo marca admite hasta 100 caracteres.",
    invalidMessage:
      "La marca debe comenzar con una letra o número y solo admite letras, números, espacios y . , ' ’ & ( ) + -.",
  },
  type: {
    label: "Tipo de producto",
    pattern: /^[\p{L}][\p{L}\p{M}]*(?: [\p{L}][\p{L}\p{M}]*)*$/u,
    options: productTypes,
    requiredMessage: "Selecciona un tipo de producto.",
    invalidMessage: "Selecciona un tipo de producto válido de la lista.",
  },
  stock: {
    label: "Cantidad inicial",
    placeholder: "Ej.: 12",
    inputType: "number",
    min: 0,
    max: 999999,
    pattern: /^\d+$/,
    requiredMessage: "Ingresa la cantidad inicial.",
    invalidMessage: "Ingresa una cantidad entera entre 0 y 999999.",
  },
};

export function normalizeArticle(values) {
  return Object.fromEntries(
    Object.keys(articleSchema).map((key) => [
      key,
      typeof values?.[key] === "string"
        ? values[key].trim().normalize("NFC")
        : key === "stock" && typeof values?.[key] === "number"
          ? String(values[key])
          : "",
    ]),
  );
}

export function parseArticle(values) {
  const article = normalizeArticle(values);
  const errors = {};
  for (const [key, rule] of Object.entries(articleSchema)) {
    const value = article[key];
    if (!value) errors[key] = rule.requiredMessage;
    else if (rule.maxLength && value.length > rule.maxLength)
      errors[key] = rule.lengthMessage;
    else if (
      !rule.pattern.test(value) ||
      (key === "stock" &&
        (!Number.isSafeInteger(Number(value)) ||
          Number(value) < rule.min ||
          Number(value) > rule.max)) ||
      (rule.options && !rule.options.includes(value))
    )
      errors[key] = rule.invalidMessage;
  }
  if (!errors.stock) article.stock = Number(article.stock);
  return Object.keys(errors).length
    ? { ok: false, errors }
    : { ok: true, article };
}

export function validateArticle(values) {
  const result = parseArticle(values);
  return result.ok ? {} : result.errors;
}
