import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Checkbox,
	FormControlLabel,
	Typography
} from '@mui/material'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import { useState } from 'react'
import { PERMISSIONS, PERMISSIONS_NAMES, UserPermissions } from '@/constants/permissions'

type Props = {
	currentPermissions: UserPermissions
	setCurrentPermissions: React.Dispatch<React.SetStateAction<UserPermissions>>
}

const UsersPermissions = ({ currentPermissions, setCurrentPermissions }: Props) => {
	const [expanded, setExpanded] = useState<string | false>(false)

	const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
		setExpanded(isExpanded ? panel : false)
	}

	return (
		<div className="bg-red w-full">
			<div className="flex items-center space-x-1 mb-3">
				<LockOpenOutlinedIcon />
				<Typography variant="subtitle1" sx={{ margin: 0 }}>
					Permisos
				</Typography>
			</div>

			{Object.entries(PERMISSIONS).map(([key, value]) => {
				return (
					<Accordion key={key} expanded={expanded === key} onChange={handleChange(key)}>
						<AccordionSummary aria-controls={`${key}-content`} id={`${key}-header`}>
							<Typography variant="subtitle2">{PERMISSIONS_NAMES[key]}</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<div className="grid grid-cols-1 gap-2">
								{Object.keys(value).map((subPermissionKey) => {
									const currentPermission = currentPermissions[key as keyof UserPermissions]
									return (
										<div className="flex items-center" key={subPermissionKey}>
											<FormControlLabel
												label={PERMISSIONS_NAMES[subPermissionKey]}
												control={
													<Checkbox
														checked={
															!!currentPermission[
																subPermissionKey as keyof typeof currentPermission
															]
														}
														onChange={() => {
															setCurrentPermissions((prev) => {
																let subPermissions = prev[key as keyof UserPermissions]

																return {
																	...prev,
																	[key]: {
																		...subPermissions,
																		[subPermissionKey]:
																			!subPermissions[
																				subPermissionKey as keyof typeof subPermissions
																			]
																	}
																} as UserPermissions
															})
														}}
														inputProps={{ 'aria-label': 'controlled' }}
													/>
												}
											/>
										</div>
									)
								})}
							</div>
						</AccordionDetails>
					</Accordion>
				)
			})}
		</div>
	)
}

export default UsersPermissions
