import 'dotenv/config';
import Nylas from 'nylas';

// Define configuration object
const NylasConfig = {
  apiKey:
    process.env.NYLAS_API_KEY ||
    'nyk_v0_BUmqOUZVax4sT7Gant9OSVXdoeros8g8JpaxOClg5Gty4M46aRu1ixeuuLL9Hgaw',
  apiUri: process.env.NYLAS_API_URI || 'https://api.eu.nylas.com',
};
const identifier =
  process.env.NYLAS_GRANT_ID || 'af350b13-f4b1-4d2d-907c-3f3de8134424';

// Initialize Nylas with the configuration
export const nylas = new Nylas(NylasConfig);

export async function fetchMessageList(pageToken: string): Promise<any> {
  try {
    const result = await nylas.messages.list({
      identifier,
      queryParams: { limit: 200, ...(pageToken && { pageToken }) },
    });
    console.log('NYLAS LOG: Emails fetched');
    return result;
  } catch (error) {
    console.log('NYLAS ERROR: Error while fetching emails');
    console.error(error);
  }
}

export async function searchInbox(): Promise<any> {
  try {
    const result = await nylas.messages.list({
      identifier,
      queryParams: {
        limit: 5,
      },
    });

    return result;
  } catch (error) {
    console.log('NYLAS ERROR: Error to complete search:');
    console.error(error);
  }
}

export async function fetchRecentThreads(): Promise<any> {
  try {
    const threads = await nylas.threads.list({
      identifier,
      queryParams: {
        limit: 50,
      },
    });

    // console.log('Recent Threads Count:', threads);
    return threads;
  } catch (error) {
    console.log('NYLAS ERROR: Error fetching threads:');
    console.error(error);
  }
}

export async function sendEmail(
  sendEmailParams: SendEmailParams,
): Promise<any> {
  try {
    const result = await nylas.messages.send({
      identifier,
      requestBody: sendEmailParams,
    });
    console.log(
      `NYLAS LOG: Email Sucessfully sent to ${sendEmailParams.to[0].email}`,
    );

    return result;
  } catch (error) {
    console.log('NYLAS ERROR: Error while sending email');
    console.log(error);
  }
}

export async function fetchSingleMessage(messageId: string): Promise<any> {
  try {
    const result = await nylas.messages.find({
      identifier,
      messageId,
    });
    console.log(result);
    console.log('NYLAS LOG: Email fetched');
    return result;
  } catch (error) {
    console.log('NYLAS ERROR: Error while fetching emails');
    console.error(error);
  }
}

export async function fetchAllMessagesFromThread(
  threadId: string,
): Promise<any> {
  try {
    const result = await nylas.messages.list({
      identifier,
      queryParams: { threadId: threadId },
    });
    console.log('NYLAS LOG: Emails fetched for ThreadID: ' + threadId);
    return result;
  } catch (error) {
    console.log('NYLAS ERROR: Error while fetching emails');
    console.error(error);
  }
}
