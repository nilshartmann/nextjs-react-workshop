export default function timeString(n: number = Date.now()): string {
    const d = new Date(n);
    const s = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}.${String(d.getMilliseconds()).padStart(4, "0")}`
    return s;
}