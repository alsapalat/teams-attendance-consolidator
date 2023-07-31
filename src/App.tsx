import { useState } from "react";
import CsvImportButton from "./components/CsvImportButton"
import { validateFiles } from "./ms-teams/validation";
import { TMsTeamsAttendance } from "./ms-teams/types";
import Meeting from "./ms-teams/Meeting";
import useSummarize from "./ms-teams/useSummarize";
import CountCard from "./components/CountCard";
import useByParticipants from "./ms-teams/useByParticipants";
import Particiants from "./ms-teams/Particiants";

function App() {
  const [data, setData] = useState<TMsTeamsAttendance[]>([]);
  const summarized = useSummarize(data);
  const participants = useByParticipants(data);
  return (
    <div className="container mx-auto">
      <div className="flex justify-center mt-4 mb-4">
        <CsvImportButton onSuccess={async (items) => {
          const validated = await validateFiles(items);
          const filtered: TMsTeamsAttendance[] = [];
          validated.forEach((row) => {
            if (row.isValid) filtered.push(row.data);
          })
          setData(filtered);
        }} />
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        <CountCard label="Number of Meetings" value={summarized.noOfMeetings} />
        <CountCard label="Total Time" value={summarized.totalTimeHuman} />
        <CountCard label="Total Participants" value={summarized.totalParticipants} />
      </div>
      <div className="mb-4">
        <Particiants data={participants} />
      </div>
      <div className="space-y-2">
        {data.map((row, i) => (
          <Meeting key={`${row.summary.meetingTitle}-${i}`} data={row} />
        ))}
      </div>
    </div>
  )
}

export default App