// src/workflows.ts
import {
  proxyActivities,
  defineSignal,
  setHandler,
} from "@temporalio/workflow";
import type * as activities from "./activities";

const { callServer } = proxyActivities<typeof activities>({
  startToCloseTimeout: "1 minute",
  retry: {
    initialInterval: "1 minute",
    maximumAttempts: 999999, // Practical Infinity
  },
});

export async function emailWorkflow(
  server: string,
  endpoint: string
): Promise<any> {
  // Define a signal to stop the workflow
  const stop = defineSignal("stop");
  let shouldStop = false;

  setHandler(stop, () => {
    shouldStop = true;
  });

  while (!shouldStop) {
    await callServer(server, endpoint);
    await new Promise((resolve) => setTimeout(resolve, 5 * 60 * 1000)); // Wait for 5 minutes
  }
}
