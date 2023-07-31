type Props = {
  label: string
  value: string
}

function CountCard({
  label,
  value,
}: Props) {
  return (
    <div className="border border-black px-4 py-2">
      <div className="text-sm font-semibold">{label}</div>
      <div className="font-black font-mono text-xl">{value || '-'}</div>
    </div>
  )
}

export default CountCard