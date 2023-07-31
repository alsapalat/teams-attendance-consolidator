import React, { useRef, useState } from 'react'
import Papa from 'papaparse';

export type TParsed = Array<{
  data: Array<Array<string>>
}>

type Props<T> = {
  onSuccess: (result: T[]) => void
}

function readFile<T>(file: File): Promise<T> {
  return new Promise((resolve) => {
    Papa.parse(file, {
      complete: function(results) {
        resolve(results as T);
      }
    });
  })
}

function CsvImportButton<TResult = TParsed>({
  onSuccess
}: Props<TResult>) {
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const onSuccessRef = useRef(onSuccess);
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setIsLoading(true);
    const res = await Promise.all([...e.target.files].map(readFile<TResult>));
    setIsLoading(false);
    onSuccessRef.current(res);
  }
  return (
    <div>
      <button className="text-sm font-bold bg-slate-600 text-white px-3 rounded py-2 w-56" onClick={() => {
        inputRef.current!.click();
      }} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Upload MS Teams CSV File'}
      </button>
      <input ref={inputRef} className="sr-only" type="file" onChange={handleChange} title="File Picker" multiple accept=".csv" />
    </div>
  )
}

export default CsvImportButton