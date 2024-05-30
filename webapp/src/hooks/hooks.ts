import axios from "axios";
import { useQuery } from "react-query";
import { EmailMessageParams, TicketUpdateDtoParams } from "../types";

const BASE_URL = "http://localhost:3000/";
const TICKETS = "tickets/";
const EMAILS = "emails/";

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
