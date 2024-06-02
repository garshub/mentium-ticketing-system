// src/client.ts
import { Connection, WorkflowClient } from "@temporalio/client";
import { emailWorkflow } from "./workflows";

const SERVER_URL = process.env.SERVER_URL || "http://localhost:3000/";
const ENDPOINT = process.env.PROCESS_EMAILS_ENDPOINT || "emails/processEmails";

async function run() {
  // Create a connection to the Temporal server
  const connection = await Connection.connect();

  // Create a WorkflowClient to start workflows
  const client = new WorkflowClient({
    connection,
  });

  // Start a workflow execution
  const handle = await client.start(emailWorkflow, {
    args: [SERVER_URL, ENDPOINT],
    taskQueue: "email-task-queue",
    workflowId: "email-workflow",
  });

  // Log the workflow ID
  console.log(`Started workflow ${handle.workflowId}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
