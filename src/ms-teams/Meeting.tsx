import * as inflection from 'inflection';
import clsx from 'clsx';
import { HiChevronDown } from 'react-icons/hi';
import { TMsTeamsAttendance } from './types'
import { useState } from 'react';
import Colorize from '../components/Colorize';

type Props = {
  data: TMsTeamsAttendance
}

function Meeting({
  data,
}: Props) {
  const [show, setShow] = useState(false);
  console.log(data);
  return (
    <div>
      <div className="flex items-center border py-2 border-black px-2 relative">
        <button className="absolute inset-0 h-full w-full z-10" type="button" onClick={() => setShow(!show)} title="toggle" />
        <div className="font-semibold">
          {data.summary.meetingTitle} - {data.summary.startTimeHuman}
        </div>
        <div className="ml-3 space-x-1 flex items-center">
          <div className="text-xs font-semibold bg-slate-700 text-white rounded px-2">{data.summary.attendedParticipants} {inflection.inflect('Participant', data.summary.attendedParticipants)}</div>
          <div className="text-xs font-semibold bg-slate-700 text-white rounded px-2">{data.summary.meetingDuration}</div>
        </div>
        <div className="ml-auto inline-block">
          <HiChevronDown className={clsx('h-6 w-6 transition-all', show ? 'rotate-180' : '')} />
        </div>
      </div>
      {show ? <div className="border border-black mt-[-1px]">
        <table className="text-left w-full table-auto text-xs">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th>Participants</th>
              <th>Email</th>
              <th className="text-center">In Meeting Duration</th>
              <th>Join</th>
              <th>Leave</th>
            </tr>
          </thead>
          <tbody>
            {data.participants.map((item) => (
              <tr key={item.participantId}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td className="text-center">
                  <Colorize value={item.inMeetingDurationInSeconds} total={data.summary.meetingDurationInSeconds}>
                    {item.inMeetingDuration}
                  </Colorize>
                </td>
                <td>{item.firstJoinHuman}</td>
                <td>{item.lastLeaveHuman}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> : null}
    </div>
  )
}

export default Meeting