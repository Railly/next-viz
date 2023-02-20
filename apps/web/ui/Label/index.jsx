const styles = {
  primary: "text-gray-700",
  secondary: "text-blue-800",
}

export default function Label({
  className,
  variant,
  noLabelInMobile,
  children,
  ...props
}) {
  return (
    <label
      className={`${noLabelInMobile ? "hidden sm:block" : "block"} font-bold ${
        styles[variant]
      } ${className}`}
      {...props}
    >
      {children}
    </label>
  )
}
