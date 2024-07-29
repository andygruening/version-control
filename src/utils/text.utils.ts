export function compressText(text: string): string {
    if (text.length <= 8) {
        return text;
    }

    const firstPart = text.slice(0, 2);
    const lastPart = text.slice(-2);
    return `${firstPart}..${lastPart}`;
}