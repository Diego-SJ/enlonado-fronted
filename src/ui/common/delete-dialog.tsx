import { Button, Dialog, Typography } from '@mui/material'

type Props = {
	onClose?: () => void
	onConfirm?: () => void
	loading?: boolean
	title?: string
	open?: boolean
}

const DeleteDialog = ({ onClose, open = false, title, loading, onConfirm }: Props) => {
	return (
		<Dialog onClose={onClose} open={open}>
			<div className="px-4 py-6 max-w-[300px]">
				<Typography
					variant="h6"
					mb={2}
					sx={{ textAlign: 'center', marginBottom: 4, lineHeight: 1.3 }}
				>
					{title || '¿Estás seguro de eliminar este registro?'}
				</Typography>
				<div className="flex gap-4">
					<Button
						fullWidth
						color="secondary"
						variant="contained"
						onClick={onClose}
						disabled={loading}
					>
						Cancelar
					</Button>
					<Button
						variant="contained"
						color="error"
						fullWidth
						onClick={onConfirm}
						disabled={loading}
					>
						{loading ? 'Eliminando...' : 'Eliminar'}
					</Button>
				</div>
			</div>
		</Dialog>
	)
}

export default DeleteDialog
