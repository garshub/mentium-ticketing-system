import axios from "axios";
import { log } from "@temporalio/activity";

export async function callServer(
  serverUrl: string,
  endpoint: string
): Promise<any> {
  try {
    const response = await axios.get(`${serverUrl}/${endpoint}`);
    log.info("Server call successful");
    return response;
  } catch (error) {
    log.error("Error calling email process endoint:", { error });
    throw error;
  }
}
