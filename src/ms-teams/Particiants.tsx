import { IParticipantWithAttendance } from './types'

type Props = {
  data: Array<IParticipantWithAttendance>
}

function Particiants({
  data,
}: Props) {
  return (
    <div>
      <table className="text-left w-full table-auto text-xs">
        <thead>
          <tr className="bg-slate-100">
            <th className="border border-black">Participants</th>
            <th className="border border-black">Email</th>
            <th className="border border-black">Total Meetings Attended</th>
            <th className="border border-black">Total Meeting Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.participantId}>
              <td className="border border-black">{item.name}</td>
              <td className="border border-black">{item.email}</td>
              <td className="border border-black">{item.attendance.length}</td>
              <td className="border border-black">{item.totalMeetingTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Particiants