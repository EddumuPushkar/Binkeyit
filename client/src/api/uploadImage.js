const uploadImage = async (image) => {
    try {
        // console.log("pushkar1 => uploadImage", image);
        
      const formdata = new FormData();
      formdata.append("image", image);

      const response = await api.post("/upload-image", 
        formdata,
      );
      return response;
    } catch (error) {
      return error;
    }
  };
export default uploadImage;