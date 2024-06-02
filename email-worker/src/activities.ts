import axios from "axios";

export async function callServer(
  serverUrl: string,
  endpoint: string
): Promise<any> {
  try {
    const response = await axios.get(serverUrl + endpoint);
    return response.data;
  } catch (error) {
    console.error("Error calling server:", error);
    throw error;
  }
}
