import { useRef, useState } from "react";
import { Link } from "react-router";
import { pages } from "../config/navigation.js";
import { articleSchema, validateArticle } from "../data/articleValidation.js";
import { useInventory } from "../context/InventoryContext.jsx";
import Icon from "./Icon.jsx";

const createEmptyValues = () => ({ name: "", brand: "", type: "", stock: "" });

export default function ArticleForm() {
  const { addArticle } = useInventory();
  const [values, setValues] = useState(createEmptyValues);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [savedName, setSavedName] = useState("");
  const formRef = useRef(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setSavedName("");
    setSubmitError("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSavedName("");
    setSubmitError("");
    const result = addArticle(values);
    setErrors(result.ok ? {} : result.errors);
    if (!result.ok) {
      setSubmitError(result.message ?? "");
      const firstError = Object.keys(result.errors)[0];
      if (firstError) formRef.current.elements.namedItem(firstError)?.focus();
      return;
    }
    setSavedName(result.article.name);
    setValues(createEmptyValues());
    formRef.current.elements.namedItem("name")?.focus();
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="surface-card px-5 py-6 sm:p-8"
    >
      <h2 className="text-xl tracking-[-0.6px] sm:text-[22px]">
        Datos del artículo
      </h2>
      <p
        id="article-help"
        className="mt-3 text-[15px] leading-[1.9] text-muted"
      >
        * Campo obligatorio. Nombre y marca admiten hasta{" "}
        {articleSchema.name.maxLength} caracteres, comienzan con letra o número
        y permiten signos de uso comercial. La cantidad inicial admite unidades
        enteras desde cero.
      </p>
      <div className="mt-7 grid gap-6 sm:grid-cols-2">
        {Object.entries(articleSchema).map(([key, rule]) => {
          const {
            label,
            placeholder,
            maxLength,
            options,
            inputType,
            min,
            max,
          } = rule;
          const props = {
            id: `article-${key}`,
            name: key,
            value: values[key],
            onChange: handleChange,
            onBlur: () =>
              setErrors((current) => ({
                ...current,
                [key]: validateArticle(values)[key],
              })),
            required: true,
            "aria-invalid": Boolean(errors[key]),
            "aria-describedby": errors[key]
              ? `article-help ${key}-error`
              : "article-help",
            className: "form-field",
          };
          return (
            <div
              key={key}
              className={key === "type" ? "sm:col-span-2" : undefined}
            >
              <label
                htmlFor={props.id}
                className="text-sm font-semibold text-ink"
              >
                {label}
              </label>
              <span aria-hidden="true" className="text-danger">
                {" "}
                *
              </span>
              {options ? (
                <select {...props}>
                  <option value="" disabled>
                    Selecciona una categoría
                  </option>
                  {options.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  {...props}
                  type={inputType ?? "text"}
                  min={min}
                  max={max}
                  step={inputType === "number" ? 1 : undefined}
                  maxLength={maxLength}
                  placeholder={placeholder}
                />
              )}
              {errors[key] && (
                <p
                  id={`${key}-error`}
                  role="alert"
                  className="mt-2 text-xs leading-5 text-danger"
                >
                  {errors[key]}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-7.5 flex flex-wrap items-center gap-[22px] border-0 border-t border-solid border-line pt-6 max-[400px]:gap-2.5">
        <button type="submit" className="button-primary max-[400px]:w-full">
          <Icon name="plus" size={18} />
          Guardar artículo
        </button>
        <Link
          to={pages.inventory.path}
          className="inline-flex min-h-11 items-center text-[15px] font-[650] text-abasto hover:underline hover:underline-offset-4"
        >
          Ver inventario →
        </Link>
      </div>
      {submitError && (
        <p role="alert" className="mt-5 text-sm text-danger">
          {submitError}
        </p>
      )}
      {savedName && (
        <p
          role="status"
          className="mt-[22px] flex items-start gap-2.5 text-[15px] leading-[1.9] wrap-anywhere text-abasto"
        >
          <span className="mt-[3px]">
            <Icon name="check" size={18} />
          </span>
          <span>
            Se agregó «{savedName}» al inventario. Puedes ingresar otro artículo
            o consultar la tabla.
          </span>
        </p>
      )}
    </form>
  );
}
