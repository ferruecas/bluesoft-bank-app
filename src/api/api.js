const BASE_URL = 'https://localhost:7192/api'; 


export const consultarSaldoApi = async (cuentaId) => {
  try {
    
    const response = await fetch(`${BASE_URL}/cuenta/saldo/${cuentaId}`)
      const ress = await response.json();
      return ress;
  } catch (error) {
    console.error('Error al consultar el saldo:', error);
  }
};

export const obtenerMovimientosApi = async (cuentaId,cantidad) => {
  try {
  debugger
    const response = await fetch(`${BASE_URL}/Transaccion/${cuentaId}/${cantidad}`);
    const data = await response.json();
    return data; // Ajusta según la estructura de tu respuesta
  } catch (error) {
    console.error('Error al obtener movimientos:', error);
    throw error;
  }
};

export const ConsignacionApi = async (cuenta,monto,ciudadId) => {
  try {

    // const response = await fetch(`${BASE_URL}/transaccion/consignacion`)
    const response = await fetch(`${BASE_URL}/transaccion/consignacion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cuentaId: parseInt(cuenta),
          monto: parseFloat(monto),
          ciudadId: parseInt(ciudadId),
        }),
      });
      debugger
      return response;
  } catch (error) {
    console.error('Error al consultar el saldo:', error);
  }
};
