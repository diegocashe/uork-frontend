import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material'

import { Edit } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';

export const ConfirmDialog = ({
    dialogContainer = false,
    open = true,
    title = 'Título',
    content = '¿Esta seguro de continuar?',
    onAccept = async () => { },
    onCancel = async () => { },
}) => {

    const [isLoading, setIsLoading] = useState(false)

    const handlerOnAccept = async (e) => {
        setIsLoading(true)
        await onAccept(e)
        setIsLoading(false)
    }

    const Container = ({ children }) => {
        if (dialogContainer) {
            return (
                <Dialog open={open} maxWidth='lg' >
                    {children}
                </Dialog>
            )
        }
        return (
            <div>
                {children}
            </div>
        )

    }

    return (
        <Container>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {content}
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} >Cancelar</Button>
                <LoadingButton
                    onClick={handlerOnAccept}
                    loading={isLoading}
                    endIcon={<Edit />}
                    loadingPosition="end"
                    variant="contained"
                >Aceptar</LoadingButton>
            </DialogActions>
        </Container>
    )
}
