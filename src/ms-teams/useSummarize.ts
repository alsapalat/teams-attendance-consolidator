/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { pick } from 'lodash';
import { TMsTeamsAttendance, TParticipant } from "./types";
import secondsToHuman from "./secondsToHuman";

function useSummarize(list: TMsTeamsAttendance[]) {
  const { participants, totalTimeHuman } = useMemo(() => {
    const uniqueParticipants: Record<string, TParticipant> = {};
    let totalSeconds = 0;
    list.forEach((row) => {
      totalSeconds += row.summary.meetingDurationInSeconds;
      row.participants.forEach((p) => {
        uniqueParticipants[p.participantId] = pick(p, ['participantId', 'email', 'name'])
      })
    })

    return {
      totalTimeHuman: secondsToHuman(totalSeconds),
      participants: Object.values(uniqueParticipants),
    }
  }, [list]);
  return {
    noOfMeetings: String(list.length),
    totalTimeHuman,
    totalParticipants: String(participants.length),
  }
}

export default useSummarize;