import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import { Breadcrumbs, Button, Card, Grid, Link, Typography } from '@mui/material'
import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
	title?: string
	current?: string
	links?: { name: string; path: string }[]
	onAdd?: () => void
	topActions?: ReactNode
	children?: ReactNode
}

const Breadcrumb = ({ title, current, links = [], onAdd, children, topActions }: Props) => {
	const navigate = useNavigate()

	const handleClick = (path: string) => {
		navigate(path)
	}

	return (
		<Grid item xs={12}>
			<Card elevation={0}>
				<div className="flex justify-between pr-6 flex-col items-start md:items-center md:flex-row">
					<div className="py-4 px-6">
						<Typography variant="h6" sx={{ marginTop: 0 }}>
							{title || ''}
						</Typography>

						<Breadcrumbs separator="›" aria-label="breadcrumb">
							{links.map((link, index) => (
								<Link
									underline="hover"
									key={index}
									sx={{ cursor: 'pointer' }}
									color="text.primary"
									onClick={() => handleClick(link.path)}
								>
									{link.name}
								</Link>
							))}
							<Typography key="3" color="text.primary">
								{current}
							</Typography>
						</Breadcrumbs>
					</div>

					{onAdd && (
						<div className="pl-6 mb-4 md:px-0 md:mb-0 w-full md:w-auto">
							<Button
								variant="contained"
								color="primary"
								size="large"
								fullWidth
								sx={{ maxHeight: 40 }}
								onClick={onAdd}
								startIcon={<AddOutlinedIcon />}
							>
								Agregar nuevo
							</Button>
						</div>
					)}
					{topActions && <div className="px-6 mb-4 md:px-0 md:mb-0">{topActions}</div>}
				</div>
				{children && (
					<div className="px-6 pb-6">
						<Grid container spacing={2}>
							{children}
						</Grid>
					</div>
				)}
			</Card>
		</Grid>
	)
}

export default Breadcrumb
