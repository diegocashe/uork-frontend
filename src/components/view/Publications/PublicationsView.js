import { Box, Stack, Container, Card,CardContent, Typography, TextField, CardActions, Button } from '@mui/material'
import React from 'react'

const Publication = () => {
    return (
<></>
    )
}

export const PublicationsView = () => {
    return (
        <Container sx={{p:2}}>
            <Stack direction={'row'}>
                <Box sx={{ width: '60%' }}>

                </Box>
                <Box sx={{ width: '40%' }}>
                    <Card sx={{borderRadius:'1.5em'}}>
                        <CardContent>
                           <Typography variant='h5'>Crear Publicación</Typography>
                           <TextField />
                        </CardContent>
                        <CardActions>
                            <Button>Agregar</Button>
                        </CardActions>
                    </Card>

                </Box>

            </Stack>
        </Container>
    )
}
