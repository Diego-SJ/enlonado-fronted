import React, { useState, forwardRef } from 'react'
import { TextField, IconButton, Box, TextFieldProps } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'

interface ClearableTextFieldProps extends Omit<TextFieldProps, 'onChange' | 'value'> {
	onChange?: (value: string) => void
	value?: string
}

const ClearableTextField = forwardRef<HTMLInputElement, ClearableTextFieldProps>(
	({ label, onChange, value: controlledValue, ...rest }, ref) => {
		const [value, setValue] = useState<string>(controlledValue || '')

		const handleClear = () => {
			setValue('')
			if (onChange) {
				onChange('')
			}
		}

		const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = event.target.value
			setValue(newValue)
			if (onChange) {
				onChange(newValue)
			}
		}

		return (
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<TextField
					label={label}
					value={controlledValue !== undefined ? controlledValue : value}
					onChange={handleChange}
					variant="outlined"
					fullWidth
					inputRef={ref}
					{...rest}
				/>
				{(controlledValue !== undefined ? controlledValue : value) && (
					<IconButton onClick={handleClear} aria-label="clear text" size="small">
						<ClearIcon />
					</IconButton>
				)}
			</Box>
		)
	}
)

ClearableTextField.displayName = 'ClearableTextField'

export default ClearableTextField
