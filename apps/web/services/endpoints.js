import crud from "services/crud"

export const getReporteGeneral = async (groupId) => {
  try {
    const { data } = await crud.getOne("reporte-general", groupId)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getReporteMatriculas = async (queryParams) => {
  const { data } = await crud.getAll("reporte/matriculas", [
    {
      key: "page",
      value: queryParams.page,
    },
    {
      key: "limit",
      value: queryParams.limit,
    },
  ])
  return data
}

export const getReporteCertificados = async (queryParams) => {
  const { data } = await crud.getAll("reporte/certificados", [
    {
      key: "page",
      value: queryParams.page,
    },
    {
      key: "limit",
      value: queryParams.limit,
    },
  ])
  return data
}

export const getDetallePagos = async (queryParams) => {
  const { data } = await crud.getAll("detalle-pago", [
    {
      key: "page",
      value: queryParams.page,
    },
  ])
  return data
}

export const getCuadroInicio = async (startDate, endDate) => {
  const { data } = await crud.getAll("cuadro-inicio", [
    {
      key: "fechaIni",
      value: startDate,
    },
    {
      key: "fechaFin",
      value: endDate,
    },
  ])
  return data
}
