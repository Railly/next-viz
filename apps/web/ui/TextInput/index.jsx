import Label from "ui/Label";

export default function TextInput({
  className = "",
  variant = "primary",
  label = "",
  type = "text",
  register,
  name,
  labelClassName = "mt-4 mb-2",
  errors = {},
  disabled = false,
  noLabel = false,
  noLabelInMobile = false,
  ...props
}) {
  return (
    <>
      {!noLabel && (
        <Label
          noLabelInMobile={noLabelInMobile}
          className={labelClassName}
          variant={variant}
          htmlFor={name}
        >
          {label}
        </Label>
      )}
      <input
        id={name}
        disabled={disabled}
        className={`w-full px-2 py-1 text-gray-700 bg-white shadow-sm border border-gray-300
          rounded focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-200 disabled:text-gray-400
            ${
              errors &&
              errors?.message &&
              "border-red-500 focus:ring-red-400 focus:border-transparent"
            } ${className}`}
        placeholder={label}
        type={type}
        {...props}
        {...register(name)}
      />
      <p className="mt-1 text-sm font-semibold text-red-500">
        {errors && errors?.message}
      </p>
    </>
  );
}
