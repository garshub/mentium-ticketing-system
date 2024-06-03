import { proxyActivities } from "@temporalio/workflow";
import type * as activities from "./activities";

const { callServer } = proxyActivities<typeof activities>({
  startToCloseTimeout: "1 minute",
});

export async function processEmails(
  serverUrl: string,
  endpoint: string
): Promise<void> {
  await callServer(serverUrl, endpoint);
}
