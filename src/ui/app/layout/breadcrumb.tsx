import { Breadcrumbs, Card, Grid, Link, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

type Props = {
	title?: string
	current?: string
	links?: { name: string; path: string }[]
}

const Breadcrumb = ({ title, current, links = [] }: Props) => {
	const navigate = useNavigate()

	const handleClick = (path: string) => {
		navigate(path)
	}

	return (
		<Grid item xs={12}>
			<Card elevation={0}>
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
			</Card>
		</Grid>
	)
}

export default Breadcrumb
