import React, { useState } from 'react';
import Swal from 'sweetalert2';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Container } from 'react-bootstrap';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Extractos = () => {
  const [cuentaId, setCuentaId] = useState('');
  const [fecha, setFecha] = useState('');

  const handleGenerarExtracto = async () => {
    debugger;
    if (!cuentaId || cuentaId.trim() === '0' || !fecha) {
      Swal.fire('Error', 'Todos los campos son obligatorios y deben ser diferentes de 0 o vacío.');
      return;
    }

    try {
      const response = await fetch(`https://localhost:7192/api/Transaccion/${cuentaId}/${fecha}`);
      if (response.ok) {
        const transacciones = await response.json();
        const documentDefinition = {
          content: [
            { text: 'Extracto Mensual', style: 'header' },
            { text: `Cuenta ID: ${cuentaId}`, style: 'subheader' },
            { text: `Fecha: ${fecha}`, style: 'subheader' },
            { text: '\n\n' },
            {
              table: {
                headerRows: 1,
                widths: ['*', '*', '*'],
                body: [
                  ['Tipo', 'Monto', 'Fecha'],
                  ...transacciones.data.map((t) => [
                    t.tipo || '',
                    t.monto || '',
                    t.fechaTransaccion || '',
                  ]),
                ],
              },
            },
          ],
          styles: {
            header: { fontSize: 18, bold: true },
            subheader: { fontSize: 14, bold: true, margin: [0, 0, 0, 10] },
          },
        };

        pdfMake.createPdf(documentDefinition).download(`Extracto_${cuentaId}_${fecha}.pdf`);
      } else {
        const errorData = await response.json();
        Swal.fire('Error', `Hubo un error al generar el extracto: ${errorData.message}`, 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Hubo un error al generar el extracto', 'error');
    }
  };

  return (
    <Container>
      <div>
        <h2>Generar Extracto</h2>
        <label>Número de Cuenta:</label>
        <input type="text" value={cuentaId} onChange={(e) => setCuentaId(e.target.value)} />

        <label>Fecha (MM/YYYY):</label>
        <input type="text" placeholder="MM/YYYY" value={fecha} onChange={(e) => setFecha(e.target.value)} />

        <button onClick={handleGenerarExtracto}>Generar Extracto</button>
      </div>
    </Container>
  );
};

export default Extractos;
