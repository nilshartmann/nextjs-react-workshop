import timeString from "@/app/shared/components/time-string.ts";

export function componentLog(name: string, ...args: any) {
  console.log(timeString(), name.padEnd(15), ...args);
}
