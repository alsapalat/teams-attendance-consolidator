/* eslint-disable @typescript-eslint/no-explicit-any */
import { IParticipantAttendance, TValidatedFile } from "./types";

function toObjectArray(raw: Array<any>) {
  const [headers, ...rest] = raw;
  return rest.map((row: any) => {
    const temp: any = {};
    (headers as Array<any>).forEach((h, i) => {
      temp[h] = row[i];
    })
    return temp;
  })
}

function timeToSeconds(str: string) {
  try {
    const parts = (str || '').split(" "); // Split the time string by space
    let seconds = 0;
    parts.forEach(part => {
      if (part.includes("h")) {
        seconds += parseInt(part.replace("h", "")) * 3600; // Convert hours to seconds
      } else if (part.includes("m")) {
        seconds += parseInt(part.replace("m", "")) * 60; // Convert minutes to seconds
      } else if (part.includes("s")) {
        seconds += parseInt(part.replace("s", "")); // Add seconds
      }
    });
    return seconds;
  } catch {
    return -1;
  }
}

function transformParticipants(raw: any): IParticipantAttendance {
  return {
    participantId: raw?.['Participant ID (UPN)'],
    name: raw?.['Name'],
    email: raw?.['Email'],
    firstJoin: new Date(raw?.['First Join']),
    firstJoinHuman: raw?.['First Join'],
    lastLeave: new Date(raw?.['Last Leave']),
    lastLeaveHuman: raw?.['Last Leave'],
    role: raw?.['Role'],
    inMeetingDuration: raw?.['In-Meeting Duration'],
    inMeetingDurationInSeconds: timeToSeconds(raw?.['In-Meeting Duration']),
  }
}

export function validateFiles(data: Array<unknown>): Array<TValidatedFile> {
  if (!Array.isArray(data)) return [{ isValid: false }]
  return data.map((row: any): TValidatedFile => {
    const data: Array<unknown> = row?.data;
    if (!Array.isArray(data)) return { isValid: false };
    const summaryStartIndex = data.findIndex((x: any) => x?.[0] === '1. Summary');
    const participantsStartIndex = data.findIndex((x: any) => x?.[0] === '2. Participants');
    const activitiesStartIndex = data.findIndex((x: any) => x?.[0] === '3. In-Meeting Activities');
    if (summaryStartIndex < 0 || participantsStartIndex < 0) return { isValid: false };
    const summaryRaw = data.slice(summaryStartIndex + 1, participantsStartIndex - 1) as Array<any>;
    const participantsRaw = toObjectArray(data.slice(participantsStartIndex + 1, activitiesStartIndex - 1) as Array<any>);
    const meetingTitle = String(summaryRaw?.[0]?.[1]);
    const attendedParticipants = Number(+summaryRaw?.[1]?.[1]);
    const startTimeHuman = String(summaryRaw?.[2]?.[1]);
    const startTime = new Date(summaryRaw?.[2]?.[1]);
    const endTimeHuman = String(summaryRaw?.[3]?.[1]);
    const endTime = new Date(summaryRaw?.[3]?.[1]);
    const meetingDuration = String(summaryRaw?.[4]?.[1]);
    const meetingDurationInSeconds = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
    const averageAttendanceTime = String(summaryRaw?.[5]?.[1]);
    const participants = participantsRaw.map(transformParticipants)
    participants.sort((a, b) => b.inMeetingDurationInSeconds > a.inMeetingDurationInSeconds ? 1 : -1);
    return {
      isValid: true,
      data: {
        summary: {
          meetingTitle,
          attendedParticipants,
          startTimeHuman,
          startTime,
          endTimeHuman,
          endTime,
          meetingDuration,
          meetingDurationInSeconds,
          averageAttendanceTime,
        },
        participants,
      }
    }
  })

}