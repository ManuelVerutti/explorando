import React, { useState, useEffect } from 'react';
import Back from '../Componentes/Back';
import './TablaPuntuacion.css';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { ToastContainer, toast } from "react-toastify";



const TablaPuntuacion = () => {
  const navigate = useNavigate();

  const [puntuaciones, setPuntuaciones] = useState({nombre:"", datos:[]});

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let tempPuntuaciones = JSON.parse(localStorage.getItem("scores"));
    let puntosUsuario;
    for (let i = 0; i < tempPuntuaciones.length; i++) {
      
      if (tempPuntuaciones[i].nombre === currentUser.nombre) {
        puntosUsuario = tempPuntuaciones[i];
        break;
      }
    }
    setPuntuaciones(puntosUsuario);
  }, []);


  const handleDownload = async () => {
    //playSound();
    // Buscar los datos del usuario seleccionado
    let storedProgreso = JSON.parse(localStorage.getItem("scores"));
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!storedProgreso) {

        alert('No existen datos de partidas');
    } else {
        let datosUsuario;
        for (let i = 0; i < storedProgreso.length; i++) {
            if (storedProgreso[i].nombre === currentUser.nombre) {
                datosUsuario = storedProgreso[i].datos;
                break;
            }
        }
        if (!datosUsuario) {
            alert('No existen datos de partidas con este usuario');

        } else {
            // Crear un arreglo con los encabezados de la tabla
            let anteEncabezados = ["Nombre", "Apellidos", "Curso", "Organización", "Residencia" , "Teléfono" ];
            let datosAnteEncabezados = [currentUser.nombre,currentUser.apellidos,currentUser.curso, currentUser.organizacion, currentUser.municipio + ", " + currentUser.departamento, currentUser.telefono];
            let encabezados = ["Tema", "Puntuación", "fecha"];
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

            // Crear un arreglo con los datos de la tabla
            let datosTabla = [];
            datosTabla.push(anteEncabezados);
            datosTabla.push(datosAnteEncabezados);
            datosTabla.push(encabezados);
            for (let i = 0; i < datosUsuario.length; i++) {
                let fila = [];
                fila.push(datosUsuario[i].tema);
                fila.push(datosUsuario[i].puntuacion);
                fila.push(datosUsuario[i].fecha);
                datosTabla.push(fila);
            }

            // Crear una hoja de cálculo utilizando la biblioteca SheetJS
            let ws = XLSX.utils.aoa_to_sheet(datosTabla);
            let wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Datos de progreso");

            const dataToWrite = new Uint8Array(XLSX.write(wb, { bookType: 'xlsx', type: 'array' }));
            const dataToWriteBase64 = btoa(String.fromCharCode.apply(null, dataToWrite));

            const fileName = "Progreso_Explorando_" + currentUser.nombre + ".xlsx";
            await Filesystem.writeFile({
                path: fileName,
                data: dataToWriteBase64,
                directory: Directory.Documents,
                encoding: Filesystem.Encoding.UTF8
            });

            XLSX.writeFile(wb, "Progreso_Explorando_" + currentUser.nombre + ".xlsx");

            //PDF

            const doc = new jsPDF({
                format: 'a3' // especifica el tamaño de página en A3
            });
            doc.setFontSize(8);

            let y = 20;

            for (let i = 0; i < datosTabla.length; i++) {
                for (let j = 0; j < datosTabla[i].length; j++) {
                    const cell = datosTabla[i][j].toString();
                    if (cell.length > 35) {
                        doc.text(cell.substring(0, 30), j * 50, y + i * 10);
                        doc.text(cell.substring(30), j * 50, y + 5 + i * 10);
                    } else {
                        doc.text(cell, j * 50, y + i * 10);
                    }
                }
            }

            const pdfData = doc.output('datauristring');

            await Filesystem.writeFile({
                path: "Progreso_Explorando_" + currentUser.nombre + ".pdf",
                data: pdfData,
                directory: Directory.Documents
            });


            // Guardar el archivo PDF
            doc.save('Progreso_Explorando_' + currentUser.nombre + '.pdf');

            toast("Archivo guardado en Documentos", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    }

};


  return (
    <div className="tabla-puntuacion">
                  <ToastContainer />

      <Back destino="/temas" />
      <img className="backgroundImage" src="/Medios/Victoria/fondo.PNG" />
      <h2>Tabla de puntuaciones</h2>
      <table>
        <thead>
          <tr>
            <th>Jugador</th>
            <th>Tema</th>
            <th>Puntuación</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {puntuaciones.datos.map((puntuacion, index) => (
            <tr key={index}>
              <td>{puntuaciones.nombre}</td>
              <td>{puntuacion.tema}</td>
              <td>{puntuacion.puntuacion}</td>
              <td>{puntuacion.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button className="buttons" onClick={() => {
          if (window.confirm('Se eliminará todo el progreso de los jugadores ¿Desea Continuar?')) {
            localStorage.removeItem('scores');
            navigate("/temas")
          }
        }}>Borrar Tabla</button>

        <button className="buttons" onClick={()=>{handleDownload()}}>Descargar</button>
      </div>
    </div>
  );
};

export default TablaPuntuacion;