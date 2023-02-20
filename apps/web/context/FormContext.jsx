import { createContext, useState } from "react"

export const FormContext = createContext()

const FormContextProvider = (props) => {
  const [form, setForm] = useState({})
  const [levels, setLevels] = useState([])
  return (
    <FormContext.Provider value={{ form, setForm, levels, setLevels }}>
      {props.children}
    </FormContext.Provider>
  )
}

export default FormContextProvider
