import { Cloudinary } from "@cloudinary/url-gen";

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: "dw65xvmgp"
  }
});

const uploadImage = async (file) => {
  if (!file) return null;
  
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "empleaTico");

  console.log(formData);
  
  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/dw65xvmgp/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    return data.secure_url; // Retorna la URL de la imagen subida
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    return null;
  }
};

export default { cloudinary, uploadImage };
