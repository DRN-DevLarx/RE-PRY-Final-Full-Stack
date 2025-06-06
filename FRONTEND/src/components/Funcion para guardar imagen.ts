// funcion para subir Image

  const handleUpload = async () => {
    if (!selectedImage) return alert("Por favor selecciona una imagen.");
    
    const uploadedUrl = await uploadImage(selectedImage);
    if (uploadedUrl) {
      setImageUrl(uploadedUrl);
      setSelectedImage(null); // Limpia el archivo después de subirlo
    }
  };