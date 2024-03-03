import APIUtils from "@/utills/apiUtils";

export const uploadNFT = (name: string, description: string, nftImage: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(nftImage);
    reader.onloadend = async () => {
      const base64Data = reader.result;
      const base64Content = base64Data?.toString().split(";base64,")[1];
      try {
        const response = await APIUtils.post("/api/files", {
          name: name,
          description: description,
          imageBase64: base64Content,
          mimeType: nftImage.type,
        });
        if (!response.data) {
          reject(new Error("Failed to upload NFT"));
          return;
        }
        resolve(response.data);
      } catch (error) {
        reject(new Error("Failed to upload NFT"));
      }
    };
  });
};

export const normalizeImageUrl = (url: string | undefined) => {
  if (!url) return null;

  // Return the URL as-is if it's already an HTTPS URL
  if (url.startsWith("https://")) {
    return url;
  }
  // Convert IPFS URLs to a usable HTTP URL
  if (url.startsWith("ipfs://")) {
    const path = url.replace(/^ipfs:\/\/(ipfs\/)?/, "");
    return `https://nftstorage.link/ipfs/${path}`;
  }
  // Return null if the URL format is not supported
  return null;
};
