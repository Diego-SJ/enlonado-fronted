import { ReactNode, forwardRef, useState } from 'react'
import {
	Select,
	MenuItem,
	IconButton,
	InputLabel,
	FormControl,
	SelectChangeEvent,
	FormControlProps,
	SelectProps
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'

interface ClearableSelectProps extends Omit<SelectProps, 'onChange'> {
	label: string
	labelId?: string
	options: { value: string; label: string }[]
	onChange?: (value: string | undefined) => void
	formControlProps?: FormControlProps
}

const ClearableSelect = forwardRef<HTMLDivElement, ClearableSelectProps>(
	({ label, options, onChange, labelId, formControlProps, ...rest }, ref) => {
		const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined)

		const handleClear = () => {
			setSelectedValue(undefined)
			if (onChange) {
				onChange(undefined)
			}
		}

		const handleChange = (event: SelectChangeEvent<unknown>, _: ReactNode) => {
			const value = event.target.value as string
			setSelectedValue(value)
			if (onChange) {
				onChange(value)
			}
		}

		return (
			<FormControl variant="outlined" fullWidth {...formControlProps}>
				<InputLabel id={labelId} shrink={!!selectedValue} sx={{ marginTop: '-8px' }}>
					{label}
				</InputLabel>
				<Select
					ref={ref}
					labelId={labelId}
					value={selectedValue || ''}
					onChange={handleChange}
					fullWidth
					size="small"
					endAdornment={
						selectedValue ? (
							<IconButton
								onClick={handleClear}
								aria-label="clear selection"
								size="small"
								sx={{ marginRight: 1 }}
							>
								<ClearIcon />
							</IconButton>
						) : null
					}
					{...rest}
				>
					{options.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		)
	}
)

ClearableSelect.displayName = 'ClearableSelect'

export default ClearableSelect
