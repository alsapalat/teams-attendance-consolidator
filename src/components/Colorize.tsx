import { useMemo } from "react";
import clsx from 'clsx';

type Props = {
  value: number
  total: number
  children: React.ReactNode
}

function Colorize({
  value,
  total,
  children
}: Props) {
  const percentage = value / total;
  const className = useMemo(() => {
    if (percentage >= 0.8) return 'text-green-600';
    if (percentage >= 0.5) return 'text-yellow-600';
    return 'text-red-600';
  }, [percentage]);
  return (
    <span className={clsx('font-semibold', className)}>{children}</span>
  )
}

export default Colorize