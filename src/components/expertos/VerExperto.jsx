import axios from "axios";
import { useState, useEffect } from "react";
import { message } from "antd";
import '../../styles/Expertos/StyleVerExperto.css';
import { GoChevronLeft } from "react-icons/go";


const TIPOS_DOCUMENTO = [
  { value: "Cédula de ciudadanía", label: "Cédula de ciudadanía" },
  { value: "Tarjeta de identidad", label: "Tarjeta de identidad" },
  { value: "Cédula de extranjería", label: "Cédula de extranjería" }
];

const TIPOS_SANGRE = [
  { value: "O-", label: "O-" },
  { value: "O+", label: "O+" },
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B-", label: "B-" },
  { value: "B+", label: "B+" },
  { value: "AB-", label: "AB-" },
  { value: "AB+", label: "AB+" }
];

const PREFERENCIAS_ALIMENTARIAS = [
  { value: "Vegetariano", label: "Vegetariano" },
  { value: "Vegano", label: "Vegano" },
  { value: "Ninguna", label: "Ninguna" }
];

const CENTROS_FORMACION = [
  { value: "Centro Atención Sector Agropecuario", label: "Centro Atención Sector Agropecuario" },
  { value: "Centro de Diseño e Innovación Tecnológica Industrial", label: "Centro de Diseño e Innovación Tecnológica Industrial" },
  { value: "Centro de comercio y servicios", label: "Centro de comercio y servicios" }
];

  // Función auxiliar para formatear la fecha
  const formatearFechaParaInput = (fechaString) => {
    if (!fechaString) return '';
    
    // Maneja cadenas de fecha ISO
    if (fechaString.includes('T')) {
        const fecha = new Date(fechaString);
        return fecha.toISOString().split('T')[0];
    }
    
    // Si ya está en formato YYYY-MM-DD, devuélvela tal cual
    if (fechaString.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return fechaString;
    }
    
    // Para cualquier otro formato, intenta convertir a YYYY-MM-DD
    const fecha = new Date(fechaString);
    if (isNaN(fecha.getTime())) return ''; // Devuelve cadena vacía si la fecha es inválida
    
    return fecha.toISOString().split('T')[0];
  };

export const VerExperto = ({ onClose, expertData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Asegurarse de que el ID se capture correctamente
  const [formData, setFormData] = useState({
    id: expertData?.id || '', 
    name: expertData?.name || "",
    lastName: expertData?.lastName || "",
    rol: expertData?.rol || "",
    documentType: expertData?.documentType || "",
    documentNumber: expertData?.documentNumber || "",
    documentDateOfissue: expertData?.documentDateOfissue || "",
    email: expertData?.email || "",
    birthdate: formatearFechaParaInput(expertData?.birthdate) || "",
    phone: expertData?.phone || "",
    area: expertData?.area || "",
    senaVinculation: expertData?.senaVinculation || "",
    formationCenter: expertData?.formationCenter || "",
    bloodType: expertData?.bloodType || "",
    dietPreferences: expertData?.dietPreferences || "",
    competitionName: expertData?.competitionName || "",

  });

  // Actualizar useEffect para manejar mejor el ID
  useEffect(() => {
    if (expertData) {
      console.log("ID recibido:", expertData.id); // Para debugging
      setFormData(prev => ({
        ...prev,
        id: expertData.id,
        name: expertData?.name || "",
        lastName: expertData?.lastName || "",
        rol: expertData?.rol || "",
        documentType: expertData?.documentType || "",
        documentNumber: expertData?.documentNumber || "",
        documentDateOfissue: expertData?.documentDateOfissue || "",
        email: expertData?.email || "",
        birthdate: formatearFechaParaInput(expertData?.birthdate) || "",
        phone: expertData?.phone || "",
        area: expertData?.area || "",
        senaVinculation: expertData?.senaVinculation || "",
        formationCenter: expertData?.formationCenter || "",
        bloodType: expertData?.bloodType || "",
        dietPreferences: expertData?.dietPreferences || "",
        competitionName: expertData?.competitionName || "",
      }));
    }
  }, [expertData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderSelect = ({ label, name, options }) => (
    <div className="input-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="form-select"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  const renderInput = ({ type = "text", name, placeholder }) => (
    <div className="input-container" style={{ position: 'relative' }}>
      <input
        type={type}
        name={name}
        placeholder=" "  // Placeholder vacío pero con un espacio
        value={formData[name]}
        onChange={handleChange}
        className="form-input"
        readOnly={true}
      />
      <span>{placeholder}</span>
    </div>
  );

  return (
    <div className="crear-experto">
        <button type="button" onClick={onClose} className="submit-button-aprendiz"><GoChevronLeft />Volver atrás</button>
      <h1 className="titulo_crear"><b>Experto: </b> {formData.name} {formData.lastName}</h1>
      
      <form  className="formulario_experto">

      <input 
          type="hidden" 
          name="id" 
          value={formData.id} 
        />

        {renderInput({ name: "name", placeholder: "Nombre" })}
        {renderInput({ name: "lastName", placeholder: "Apellido" })}
        {renderInput({ name: "rol", placeholder: "Rol" })}
        {renderInput({ 
          type: "date",
          name: "birthdate", 
          placeholder: "Fecha de nacimiento" 
        })}
        
        {renderSelect({
          label: "Tipo de documento",
          name: "documentType",
          options: TIPOS_DOCUMENTO
        })}
        
        {renderInput({ 
          name: "documentNumber", 
          placeholder: "Número de documento" 
        })}
        {renderInput({ 
          name: "email", 
          placeholder: "Correo electrónico",
          type: "email"
        })}
        {renderInput({ 
          name: "phone", 
          placeholder: "Número de teléfono" 
        })}
        
        {renderSelect({
          label: "Tipo de Sangre",
          name: "bloodType",
          options: TIPOS_SANGRE
        })}
        
        {renderSelect({
          label: "Preferencias alimentarias",
          name: "dietPreferences",
          options: PREFERENCIAS_ALIMENTARIAS
        })}
        
        {renderInput({ name: "area", placeholder: "Área" })}
        
        {renderSelect({
          label: "Centro de formación",
          name: "formationCenter",
          options: CENTROS_FORMACION
        })}
        
        {renderInput({ 
          name: "senaVinculation", 
          placeholder: "Vinculación SENA" 
        })}
        {renderInput({ name: "competitionName", placeholder: "Habilidad" })}

        <br/>

        <button type="button" onClick={onClose} className="select-button-aprendiz">Seleccionar experto</button>
        
      </form>
    </div>
  );
};