
import { uploadImage, cloudinary } from "../services/cloudDinaryServices";
import React, { useState } from "react";

const SubirIMG = () => {
  const [selectedImage, setImagenSeleccionada] = useState(null);

  const manejarCambioImagen = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagenSeleccionada(URL.createObjectURL(file));
    }
  };

  const manejarEliminarImagen = () => {
    setImagenSeleccionada(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
      {!selectedImage ? (
        <label 
          htmlFor="imageInput"style={{width: "150px",height: "150px", border: "1px dashed #ccc",display: "flex",justifyContent: "center",alignItems: "center",cursor: "pointer",fontSize: "14px",color: "#666"}}>
            
          Seleccionar imagen
          <input id="imageInput" type="file" accept="image/*" style={{ display: "none" }} onChange={manejarCambioImagen} 
          />
        </label>
      ) : (
        <div style={{ position: "relative" }}>

          <img src={selectedImage} alt="Vista previa" style={{ width: "150px", height: "150px", border: "solid", objectFit: "cover", borderRadius: "5px" }} />

          <button onClick={manejarEliminarImagen}  style={{ position: "absolute", top: "-5px", right: "5px", background: "transparent", color: "white", border: "none", borderRadius: "50%", width: "25px", height: "25px", cursor: "pointer"}}> ✖ </button>
        </div>
      )}
      <br />
    </div>
  );
};

export default SubirIMG;
