const BASE_URL = 'https://localhost:7192/api'; 


export const consultarSaldoApi = async (cuentaId) => {
  try {
    debugger
    const response = await fetch(`${BASE_URL}/cuenta/saldo/${cuentaId}`)
      const ress = await response.json();
      return ress;
  } catch (error) {
    console.error('Error al consultar el saldo:', error);
  }
};

// Función para obtener movimientos recientes
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

// Otras funciones para realizar consignaciones, retiros, etc.
