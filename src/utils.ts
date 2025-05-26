export function formatDate(iso: string | null) {
    if (iso == null) return 'N/A'
    return new Date(iso).toLocaleString('sr-RS', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    })
}

export function toLocalDatetimeInputString(utcISOString: string) {
    const date = new Date(utcISOString); // e.g., "2025-05-25T19:00:00.000Z"
    const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return offsetDate.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"
}