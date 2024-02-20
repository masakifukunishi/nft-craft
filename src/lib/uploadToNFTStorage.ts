const uploadToNFTStorage = (name: string, description: string, nftImage: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(nftImage);
    reader.onloadend = async () => {
      const base64Data = reader.result;
      const base64Content = base64Data?.toString().split(";base64,")[1];
      if (base64Content) {
        try {
          const response = await fetch("/api/upload", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              description: description,
              imageBase64: base64Content,
            }),
          });
          const data = await response.json();
          resolve(data.ipfsMetadataUrl);
        } catch (error) {
          console.error("Error uploading the image", error);
          reject(error);
        }
      } else {
        reject(new Error("Failed to read the file as base64"));
      }
    };
  });
};

export default uploadToNFTStorage;
