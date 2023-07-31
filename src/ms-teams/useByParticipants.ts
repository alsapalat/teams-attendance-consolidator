/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { pick } from 'lodash';
import { IParticipantAttendance, IParticipantWithAttendance, TMsTeamsAttendance, TParticipant } from "./types";
import secondsToHuman from "./secondsToHuman";

function useByParticipants(list: TMsTeamsAttendance[]) {
  const participants = useMemo(() => {
    const uniqueParticipants: Record<string, TParticipant> = {};
    let combinedParticipants: Array<IParticipantAttendance> = [];
    list.forEach((row) => {
      combinedParticipants = combinedParticipants.concat(row.participants);
      row.participants.forEach((p) => {
        uniqueParticipants[p.participantId] = pick(p, ['participantId', 'email', 'name'])
      })
    })
    const formatted = Object.values(uniqueParticipants).map((row): IParticipantWithAttendance => {
      const attendance = combinedParticipants.filter((x) => x.participantId === row.participantId);
      return ({
        ...row,
        attendance,
        totalMeetingTime: secondsToHuman(attendance.reduce((a, x) => a + x.inMeetingDurationInSeconds, 0)),
        totalMeetingTimeInSeconds: attendance.reduce((a, x) => a + x.inMeetingDurationInSeconds, 0),
      });
    });
    formatted.sort((a, b) => b.totalMeetingTimeInSeconds > a.totalMeetingTimeInSeconds ? 1 : -1);
    return formatted;
  }, [list]);
  return participants;
}

export default useByParticipants;