export function removeAfterFirstOccurrence(
  text: string,
  keyword: string,
): string {
  const index = text.indexOf(keyword);

  if (index !== -1) {
    return text.slice(0, index);
  }

  return text;
}

export function transformApiResponse(apiResponse: any): MessageProp[] {
  console.log(apiResponse);

  return apiResponse.map((message: any) => ({
    id: message.id,
    content: removeAfterFirstOccurrence(message.snippet, '\r\n'),
    createdAt: new Date(message.createdAt * 1000).toISOString(),
    senderName: message.from[0].name,
    subject: message.subject,
  }));
}
