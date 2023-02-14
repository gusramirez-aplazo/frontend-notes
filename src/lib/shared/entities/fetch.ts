export type FetchType = (
	input: RequestInfo | URL,
	init?: RequestInit | undefined
) => Promise<Response>;
