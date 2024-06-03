// schedule-workflow.ts
import { Client, Connection, ScheduleOverlapPolicy } from "@temporalio/client";
import { processEmails } from "./workflows";

const SERVER_URL = process.env.SERVER_URL || "http://localhost:3000";
const ENDPOINT = process.env.PROCESS_EMAILS_ENDPOINT || "emails/processEmails";

async function run() {
  const client = new Client({
    connection: await Connection.connect(),
  });

  // const scheduleId = `email-schedule-${Date.now()}`;

  const schedule = await client.schedule.create({
    action: {
      type: "startWorkflow",
      workflowType: processEmails,
      args: [SERVER_URL, ENDPOINT],
      taskQueue: "schedules",
    },
    scheduleId: "email-schedule",
    policies: {
      catchupWindow: "1 day",
      overlap: ScheduleOverlapPolicy.ALLOW_ALL,
    },
    spec: {
      intervals: [{ every: "300s" }],
    },
  });

  console.log(`Started schedule '${schedule.scheduleId}'`);

  await client.connection.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
