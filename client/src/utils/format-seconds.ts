export const formatSeconds = (seconds: number): string => new Date(seconds * 1000).toISOString().slice(14, 19);
