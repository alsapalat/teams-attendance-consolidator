export type TValidatedFile = {
  isValid: true
  data: TMsTeamsAttendance
} | {
  isValid: false
}

export type TParticipant = {
  participantId: string
  name: string
  email: string
}

export interface IParticipantAttendance extends TParticipant {
  firstJoin: Date
  firstJoinHuman: string
  lastLeave: Date
  lastLeaveHuman: string
  role: string
  inMeetingDuration: string
  inMeetingDurationInSeconds: number
}

export interface IParticipantWithAttendance extends TParticipant {
  attendance: Array<IParticipantAttendance>
  totalMeetingTime: string
  totalMeetingTimeInSeconds: number
}

export type TMsTeamsAttendance = {
  summary: {
    meetingTitle: string
    attendedParticipants: number
    startTimeHuman: string
    startTime: Date
    endTimeHuman: string
    endTime: Date
    meetingDuration: string
    meetingDurationInSeconds: number
    averageAttendanceTime: string
  },
  participants: Array<IParticipantAttendance>
}

