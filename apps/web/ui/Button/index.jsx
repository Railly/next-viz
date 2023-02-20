import { useState } from "react"
import ClipboardButton from "react-clipboard.js"
import Copy from "ui/_icons/Copy"
import Success from "ui/_icons/Success"

const theme = {
  primary: "text-white bg-blue-500 hover:bg-blue-700",
  cancel: "text-white bg-red-500 hover:bg-red-700",
  copy: "text-white bg-purple-500 hover:bg-purple-700",
  terciary: "text-white bg-green-500 hover:bg-green-700",
  white: "text-gray-700 bg-white hover:bg-gray-200 border-2 border-gray-200",
  light: "text-gray-700 bg-blue-100 hover:bg-blue-200 border-2 border-blue-200",
  outline:
    "text-blue-500 bg-transparent hover:bg-blue-100 border border-blue-500 hover:bg-blue-100",
}

const disabledStyle = {
  primary: "disabled:bg-blue-200 pointer-events-none",
  cancel: "disabled:bg-red-200 pointer-events-none",
  copy: "disabled:bg-green-500 pointer-events-none",
  terciary: "disabled:bg-green-200 pointer-events-none",
}

const sizes = {
  small: "px-2 py-2",
  medium: "px-4 py-2",
  large: "px-6 py-2",
}

export default function Button({
  className = "",
  variant = "primary",
  size = "medium",
  children,
  disabled = false,
  ...props
}) {
  return (
    <button
      disabled={disabled}
      className={`w-full font-bold transition-colors flex justify-center items-center rounded shadow-md
       ${className} ${sizes[size]}
       ${theme[variant]}
      ${disabled && disabledStyle[variant]}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function Clipboard({ className = "", size = "medium", textToCopy }) {
  const [copySuccess, setCopySuccess] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const handleClick = () => {
    setDisabled(true)
    setCopySuccess(true)
    setTimeout(() => {
      setDisabled(false)
      setCopySuccess(false)
    }, 2000)
  }

  return (
    <>
      {!copySuccess ? (
        <ClipboardButton
          onClick={handleClick}
          className={`w-full font-bold transition-colors flex justify-center items-center rounded shadow-md
       ${className} ${sizes[size]}
       ${theme.copy}
      ${disabled && disabledStyle.copy}`}
          data-clipboard-text={textToCopy}
        >
          <span className="ml-2">Copiar</span>
          <Copy className="ml-2" />
        </ClipboardButton>
      ) : (
        <ClipboardButton
          onClick={handleClick}
          className={`w-full font-bold transition-colors flex justify-center items-center rounded shadow-md
       ${className} ${sizes[size]}
       ${theme.terciary}
      ${disabled && disabledStyle.terciary}`}
          data-clipboard-text={textToCopy}
        >
          <span className="ml-2">Copiado</span>
          <Success className="ml-2" />
        </ClipboardButton>
      )}
    </>
  )
}
