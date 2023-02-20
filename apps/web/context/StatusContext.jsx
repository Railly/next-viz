import { createContext, useState } from "react"

export const StatusContext = createContext()

const StatusContextProvider = (props) => {
  const [status, setStatus] = useState("idle")
  const [errorMessage, setErrorMessage] = useState(null)

  return (
    <StatusContext.Provider
      value={{ status, setStatus, errorMessage, setErrorMessage }}
    >
      {props.children}
    </StatusContext.Provider>
  )
}

export default StatusContextProvider
