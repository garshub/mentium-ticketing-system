import axios from "axios";
import { useQuery } from "react-query";
import {
  EmailMessageParams,
  LoginParams,
  TicketUpdateDtoParams,
} from "../types";

const BASE_URL = "http://localhost:3000/";
const TICKETS = "tickets/";
const EMAILS = "emails/";
const AUTH = "auth/";

const getFullUrl = (route: string, endpoint: string = "") =>
  `${BASE_URL}${route}${endpoint}`;

const fetchAllTickets = async () => {
  const result = await axios.get(BASE_URL + TICKETS);
  return result.data;
};

const fetchTicketById = async (ticketId: string) => {
  const result = await axios.get(BASE_URL + TICKETS + ticketId);
  return result.data;
};

export const useFetchAllTickets = () => {
  return useQuery("allTickets", fetchAllTickets);
};

export const useFetchTicketById = (ticketId: string) => {
  return useQuery(["ticketById", ticketId, () => fetchTicketById(ticketId)]);
};

export const updateTicket = async (
  ticketId: string,
  ticketUpdateDto: TicketUpdateDtoParams
) => {
  const result = await axios.patch(
    BASE_URL + TICKETS + ticketId,
    ticketUpdateDto
  );
  return result.data;
};

export const createMessageAndSendEmail = async (
  emailMessageParams: EmailMessageParams
) => {
  const result = await axios.post(
    BASE_URL + EMAILS + "replyTo",
    emailMessageParams
  );
  return result.data;
};

export const fetchMessagesFromThread = async (threadId: string) => {
  const result = await axios.post(
    BASE_URL + EMAILS + "get-messages-from-thread/" + threadId,
    threadId
  );
  return result.data;
};

export const useFetchMessagesFromThread = (threadId: string) => {
  return useQuery([
    "messagesByThreadId",
    fetchMessagesFromThread,
    () => fetchMessagesFromThread(threadId),
  ]);
};

export const fetchUserData = async (token: string) => {
  try {
    const response = await axios.get(BASE_URL + AUTH + "user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const loginUser = async (loginParams: LoginParams) => {
  try {
    const response = await axios.post(BASE_URL + AUTH + "login", loginParams);

    if (!response.data || !response.data.access_token) {
      throw new Error("Access token not found in the response");
    }

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const linkUserWithTicket = async (uid: string, tid: string) => {
  try {
    const response = axios.patch(
      getFullUrl(TICKETS, `link-ticket-user/${uid}/${tid}`)
    );

    return response;
  } catch (error) {
    console.error("Error during linking user with ticket:", error);
    throw error;
  }
};
