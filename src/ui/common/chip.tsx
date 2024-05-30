let COLORS = {
	lime: 'bg-lime-50 text-lime-700 border-lime-300',
	sky: 'bg-sky-50 text-sky-700 border-sky-300',
	yellow: 'bg-yellow-50 text-yellow-700 border-yellow-300',
	violet: 'bg-violet-50 text-violet-700 border-violet-300',
	default: 'bg-slate-50 text-slate-700 border-slate-300',
	amber: 'bg-amber-50 text-amber-700 border-amber-300'
}

type Props = {
	className?: string
	label?: string
	color?: 'lime' | 'sky' | 'yellow' | 'violet' | 'default' | 'amber'
}

const Chip = ({ className = '', label = '', color = 'default' }: Props) => {
	return (
		<span className={`${className} px-3 py-[2px] rounded-full border ${COLORS[color]} text-sm`}>
			{label}
		</span>
	)
}

export default Chip
