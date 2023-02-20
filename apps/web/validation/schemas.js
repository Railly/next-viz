import * as yup from "yup"

yup.addMethod(yup.string, "passportCode", function (message) {
  return this.test("passportCode", message, function (value) {
    return /^[A-Z]{2}\d{6}$/.test(value)
  })
})

function checkIfFilesAreCorrectType(file) {
  if (!file.length) return false
  return ["image/jpeg", "image/png", "image/bmp"].includes(file[0].type)
}

function isDecimal(value) {
  if (!value) return true
  return /^\d+(\.\d{1,2})?$/.test(value)
}

function checkIfFileIsSheet(file) {
  if (!file.length) return false
  return [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
  ].includes(file[0].type)
}

function checkIfFileIsPdf(file) {
  if (!file.length) return true
  if (!file.length) return false
  return file[0].type === "application/pdf"
}

export const credentialsSchema = yup.object().shape({
  nombres: yup
    .string()
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚÑñÜü\s]+$/, "Solo se permiten letras")
    .required("El nombre es requerido"),
  apellidos: yup
    .string()
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚÑñÜü\s]+$/, "Solo se permiten letras")
    .required("El apellido es requerido"),
  banco: yup
    .string()
    .notOneOf([""], "El banco es requerido")
    .required("El banco es requerido"),
  condicion: yup.string(),
  sexo: yup.string(),
  monto: yup.string(),
  tipo_documento: yup
    .string()
    .required("El tipo de documento es requerido")
    .notOneOf([""], "El tipo de documento es requerido"),
  nro_documento: yup
    .string()
    .matches(/^[0-9]+$/, "El número no es válido")
    .min(8, "El número de documento debe ser mayor o igual a 8")
    .max(20, "El número no puede tener más de 20 dígitos")
    .required("El número de documento es requerido"),
  // nro_documento: yup.string().when("tipo_documento", {
  //   is: "1",
  //   then: yup
  //     .string()
  //     .matches(/^\d{8}$/, "El número de DNI no es válido")
  //     .required("El número de DNI es requerido"),
  //   otherwise: yup.string().when("tipo_documento", {
  //     is: "2",
  //     then: yup
  //       .string()
  //       .passportCode("El código de pasaporte no es válido")
  //       .required("El código de pasaporte es requerido"),
  //     otherwise: yup.string().required("El número de documento es requerido"),
  //   }),
  // }),
  curso: yup
    .string()
    .notOneOf([""], "El curso es requerido")
    .required("El curso es requerido"),
  modulo: yup
    .string()
    .notOneOf([""], "El módulo es requerido")
    .required("El módulo es requerido"),
  horario: yup
    .string()
    .notOneOf([""], "El horario es requerido")
    .required("El horario es requerido"),
  grupo: yup
    .string()
    .notOneOf([""], "El grupo es requerido")
    .required("El grupo es requerido"),
})

export const loginSchema = yup.object().shape({
  username: yup.string().required("El email es requerido"),
  password: yup.string().required("La contraseña es requerida"),
})

export const coursesSchema = yup.object().shape({
  cod: yup.string(),
  nombre: yup.string().required("El nombre es requerido"),
  abreviatura: yup.string().required("La abreviatura es requerida"),
  nro_doc_legal: yup.string().required("El número del documento es requerido"),
  tipo_curso: yup
    .string()
    .notOneOf([""], "El tipo de curso es requerido")
    .required("El tipo de curso es requerido"),
  doc_legal: yup
    .mixed()
    .test("type", "Solo se permiten archivos de tipo pdf", checkIfFileIsPdf),
  nro_modulos: yup
    .number()
    .typeError("El número de módulos no es válido")
    .min(0, "El número de créditos debe ser mayor o igual a 0")
    .max(8, "El número de créditos debe ser menor o igual a 8")
    .required("El número de módulos es requerido"),
  horas_cert: yup
    .string()
    .matches(/^[0-9]+$/, "El número no es válido")
    .required("Las horas certificadas son requeridas"),
  horas_dict: yup
    .string()
    .matches(/^[0-9]+$/, "El número no es válido")
    .required("Las horas dictadas son requeridas"),
  modalidad: yup.string().required("La modalidad es requerida"),
  pago_por_hora: yup
    .string()
    .test(
      "is-decimal-btw-0-8",
      "El número de créditos debe ser entero o decimal",
      isDecimal
    ),
  costo_mat: yup
    .string()
    .matches(/^\d+(\.\d{1,2})?$/, "El número no es válido")
    .required("El costo matrícula es requerido"),
  costo_mat_sm: yup
    .string()
    .matches(/^\d+(\.\d{1,2})?$/, "El número no es válido")
    .required("El costo matrícula para sanmarquinos es requerido"),
  costo_certificado: yup
    .string()
    .test(
      "is-decimal-btw-0-8",
      "El número de créditos debe ser entero o decimal",
      isDecimal
    ),
  pago_certificado: yup.string(),
})

export const enrollSchema = yup.object().shape({
  grupo_cod: yup.string(),
  apellidos: yup.string(),
  nombres: yup.string(),
  tipo_documento: yup.string(),
  num_documento: yup.string(),
  banco_receptor: yup.string(),
  monto: yup.string(),
  telefono: yup
    .string()
    .trim()
    .matches(/^9[0-9\s]+$/, "El número no es válido")
    .required("El número de celular es requerido"),
  correo: yup
    .string()
    .trim()
    .email("El email no es válido")
    .required("El email es requerido"),
  banco_alumno: yup
    .string()
    .notOneOf([""], "El banco es requerido")
    .required("El banco es requerido"),
  desc_pago: yup.string(),
  nro_operacion: yup
    .string()
    .matches(/^[0-9- ]+$/, "El número de operación no es válido")
    .required("El número de operación es requerido"),
  fch_pago: yup
    .string()
    .notOneOf([""], "La fecha de pago es requerida")
    .required("La fecha de pago es requerida"),
  voucher: yup
    .mixed()
    .test(
      "type",
      "Solo se permiten archivos de tipo .jpg, .jpeg, .png o .bmp",
      checkIfFilesAreCorrectType
    ),
})

export const teacherSchema = yup.object().shape({
  nombres: yup
    .string()
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚÑñÜü\s]+$/, "Solo se permiten letras")
    .required("El nombre es requerido"),
  apellidos: yup
    .string()
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚÑñÜü\s]+$/, "Solo se permiten letras")
    .required("El apellido es requerido"),
  tipo_documento: yup
    .string()
    .required("El tipo de documento es requerido")
    .notOneOf([""], "El tipo de documento es requerido"),
  nro_documento: yup
    .string()
    .matches(/^[0-9]+$/, "El número no es válido")
    .min(8, "El número de documento debe ser mayor o igual a 8")
    .max(20, "El número no puede tener más de 20 dígitos")
    .required("El número de documento es requerido"),
  // nro_documento: yup.string().when("tipo_documento", {
  //   is: "1",
  //   then: yup
  //     .string()
  //     .matches(/^\d{8}$/, "El número de DNI no es válido")
  //     .required("El número de DNI es requerido"),
  //   otherwise: yup.string().when("tipo_documento", {
  //     is: "2",
  //     then: yup
  //       .string()
  //       .passportCode("El código de pasaporte no es válido")
  //       .required("El código de pasaporte es requerido"),
  //     otherwise: yup.string().required("El número de documento es requerido"),
  //   }),
  // }),
  telefono: yup
    .string()
    .matches(/^\d{9}$/, "El número de teléfono no es válido")
    .required("El número de celular es requerido"),
  correo: yup
    .string()
    .email("El email no es válido")
    .required("El email es requerido"),
  direccion: yup.string().required("La dirección es requerida"),
  sexo: yup.string(),
})

export const studentReportsSchema = yup.object().shape({
  nombres: yup
    .string()
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚÑñÜü\s]+$/, "Solo se permiten letras")
    .required("El nombre es requerido"),
  apellidos: yup
    .string()
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚÑñÜü\s]+$/, "Solo se permiten letras")
    .required("El apellido es requerido"),
  telefono: yup
    .string()
    .matches(/^\d{9}$/, "El número de teléfono no es válido")
    .required("El número de celular es requerido"),
  correo: yup
    .string()
    .email("El email no es válido")
    .required("El email es requerido"),
  sexo: yup.string(),
})

export const moduleSchema = yup.object().shape({
  nombre: yup.string().required("El nombre del módulo es requerido"),
  temas: yup.array().of(
    yup.object().shape({
      nombre: yup.string().required("El nombre de tema es requerido"),
      cant_horas: yup
        .string()
        .matches(/^\d+(\.\d{1,2})?$/, "El número no es válido")
        .required("Las horas son requeridas"),
    })
  ),
})

export const gradesSchema = yup.object().shape({
  alumnos: yup.array().of(
    yup.object().shape({
      num_doc: yup
        .string()
        .matches(/^[0-9]+$/, "El número no es válido")
        .required("El número de documento es requerido"),
      promedio: yup
        .string()
        .matches(/^[0-9]+$/, "El número no es válido")
        .required("El promedio es requerido"),
      nota1: yup
        .string()
        .matches(/^\d+(\.\d{1,2})?$/, "El número no es válido")
        .required("La nota 1 es requerida"),
      nota2: yup
        .string()
        .matches(/^\d+(\.\d{1,2})?$/, "El número no es válido")
        .required("La nota 2 es requerida"),
      nota3: yup
        .string()
        .matches(/^\d+(\.\d{1,2})?$/, "El número no es válido")
        .required("La nota 3 es requerida"),
    })
  ),
})

export const groupSchema = yup.object().shape({
  curso_cod: yup
    .string()
    .required("El curso es requerido")
    .notOneOf([""], "El número de turnos es requerido"),
  nivel: yup
    .string()
    .required("El módulo del grupo es requerido")
    .notOneOf([""], "El módulo requerido"),
  profesor: yup.string().notOneOf([""], "El profesor es requerido"),
  link_meet: yup.string(),
  cod: yup.string(),
  fch_inicio: yup.string().required("La fecha de inicio es requerida"),
  fch_fin: yup.string().required("La fecha de fin es requerida"),
  vacantes: yup.string().matches(/^[0-9]+$/, "El número no es válido"),
  tipo_grupo: yup.string(),
  descripcion: yup.string(),
  nro_turnos: yup
    .string()
    .required("El número de turnos es requerido")
    .notOneOf([""], "El número de turnos es requerido"),
  horario: yup.array().of(
    yup.object().shape({
      dia: yup
        .string()
        .required("El día es requerido")
        .notOneOf([""], "El mes es requerido"),
      hora_inicio: yup.string().required("La hora de inicio es requerida"),
      hora_fin: yup.string().required("La hora de fin es requerida"),
    })
  ),
})

export const excelSchema = yup.object().shape({
  file: yup
    .mixed()
    .test(
      "type",
      "Solo se permiten archivos de tipo .xlsx y .csv",
      checkIfFileIsSheet
    ),
})

export const excelEnrrollSchema = yup.object().shape({
  banco_receptor: yup
    .string()
    .notOneOf([""], "El banco receptor es requerido")
    .required("El banco receptor es requerido"),
  banco_alumno: yup
    .string()
    .notOneOf([""], "El banco es requerido")
    .required("El banco es requerido"),
  monto: yup
    .string()
    .matches(/^\d+(\.\d{1,2})?$/, "El monto no es válido")
    .required(),
  desc_pago: yup.string(),
  nro_operacion: yup
    .string()
    .matches(/^[0-9-]+$/, "El número de operación no es válido")
    .required("El número de operación es requerido"),
  fch_pago: yup
    .string()
    .notOneOf([""], "La fecha de pago es requerida")
    .required("La fecha de pago es requerida"),
  voucher: yup
    .mixed()
    .test(
      "type",
      "Solo se permiten archivos de tipo .jpg, .jpeg, .png o .bmp",
      checkIfFilesAreCorrectType
    ),
  excel: yup
    .mixed()
    .test(
      "type",
      "Solo se permiten archivos de tipo .xlsx y .csv",
      checkIfFileIsSheet
    ),
})

export const certificateSchema = yup.object().shape({
  nombres: yup
    .string()
    // validate letters, spaces, 'ñ', 'á', 'é', 'í', 'ó', 'ú'
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚÑñÜü\s]+$/, "Solo se permiten letras")
    .required("El nombre es requerido"),
  apellidos: yup
    .string()
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚÑñÜü\s]+$/, "Solo se permiten letras")
    .required("El apellido es requerido"),
  banco: yup
    .string()
    .notOneOf([""], "El banco es requerido")
    .required("El banco es requerido"),
  condicion: yup.string(),
  monto: yup.string(),
  tipo_documento: yup
    .string()
    .required("El tipo de documento es requerido")
    .notOneOf([""], "El tipo de documento es requerido"),
  nro_documento: yup
    .string()
    .matches(/^[0-9]+$/, "El número no es válido")
    .min(8, "El número de documento debe ser mayor o igual a 8")
    .max(20, "El número no puede tener más de 20 dígitos")
    .required("El número de documento es requerido"),
  // nro_documento: yup.string().when("tipo_documento", {
  //   is: "1",
  //   then: yup
  //     .string()
  //     .matches(/^\d{8}$/, "El número de DNI no es válido")
  //     .required("El número de DNI es requerido"),
  //   otherwise: yup.string().when("tipo_documento", {
  //     is: "2",
  //     then: yup
  //       .string()
  //       .passportCode("El código de pasaporte no es válido")
  //       .required("El código de pasaporte es requerido"),
  //     otherwise: yup.string().required("El número de documento es requerido"),
  //   }),
  // }),
  grupo: yup
    .string()
    .notOneOf([""], "El grupo es requerido")
    .required("El grupo es requerido"),
})

export const payCertificateSchema = yup.object().shape({
  banco_receptor: yup
    .string()
    .notOneOf([""], "El banco receptor es requerido")
    .required("El banco receptor es requerido"),
  banco_alumno: yup
    .string()
    .notOneOf([""], "El banco es requerido")
    .required("El banco es requerido"),
  desc_pago: yup.string(),
  nro_operacion: yup
    .string()
    .matches(/^[0-9-]+$/, "El número de operación no es válido")
    .required("El número de operación es requerido"),
  fch_pago: yup
    .string()
    .notOneOf([""], "La fecha de pago es requerida")
    .required("La fecha de pago es requerida"),
  voucher: yup
    .mixed()
    .test(
      "type",
      "Solo se permiten archivos de tipo .jpg, .jpeg, .png o .bmp",
      checkIfFilesAreCorrectType
    ),
})

export const dateSchema = yup.object().shape({
  startDate: yup
    .string()
    .notOneOf([""], "La fecha de inicio es requerida")
    .required("La fecha de inicio es requerida"),
  endDate: yup
    .string()
    .notOneOf([""], "La fecha de fin es requerida")
    .required("La fecha de fin es requerida"),
})
