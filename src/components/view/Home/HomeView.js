import { Container, Divider, Stack, Typography, Box, Button } from '@mui/material'
import img1 from '../../../static/about1.svg'
import { Link } from 'react-router-dom'

export const HomeView = () => {
    return (
        <>
            <Stack direction={'row'} alignItems='center' sx={{ height: ['calc(100vh - 56px)', 'calc(100vh - 64px)'], width: '100%', overflow: 'hidden' }} >
                <Box sx={{ overflow: 'hidden', width: '40%', position: 'relative'}}>
                    <Container>
                        <Typography variant='h1' textAlign={'left'}> Uork </Typography>
                        <Typography variant='subtitle'>Evita perder tiempo, nosotros te ayudaremos a encontrar el empleo de tus sueños , proyectando tus habilidades y consiguiendo las mejores ofertas a través de Web scraping</Typography>
                        <Divider variant='middle' sx={{ py: 2 }}>Gestiona tus postulaciones de empleo </Divider>
                        <Stack justifyContent={'flex-end'} flexDirection='row'>
                            <Box flexGrow={1}></Box>
                            <Button LinkComponent={Link} to='/singin' variant='contained' color='primary' >Comienza Ya</Button>
                        </Stack>
                    </Container>
                </Box>
                <Box sx={{ overflow: 'hidden', height: '100%', width: '60%', position: 'relative', display: ['none', 'unset'] }}>
                    <img alt='Work' src={img1} width={'110%'} position='absolute' />
                </Box>
            </Stack>
        </>
    )
}
