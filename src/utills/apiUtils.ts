class APIUtils {
  static async post(url: string, body: Object): Promise<any> {
    console.log("aaaaa");

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in postRequest:", error);
      throw error;
    }
  }

  static async get(url: string): Promise<any> {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in getRequest:", error);
      throw error;
    }
  }
}

export default APIUtils;
