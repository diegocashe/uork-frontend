import { Card, CardContent, CardActions, Button, Typography, Box, Container, Stack, Paper, TextField, Divider, Avatar } from '@mui/material'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { StyledPaper } from '../../common/Surfaces/Papers/Paper';

const Works = [
    {
        title: 'Diseñador grafico con experiencia comprobable',
        enterprise: 'GE Brasil',
        origin: 'Linkedin'
    },
    {
        title: 'Desarrollador de WordPress',
        enterprise: 'EcoData',
        origin: 'Computrabajo'
    },
    {
        title: 'Asesor de ventas y marketing',
        enterprise: 'Magazine Luiza',
        origin: 'GetOnBoard'
    },
    {
        title: 'Se requiere Programador de Software Lenguaje C#',
        enterprise: 'Samsung Electronics Mexico',
        origin: 'Linkedln'
    },
    {
        title: 'Asistente administrativo',
        enterprise: 'PowerEnergy',
        origin: 'Computrabajo'
    },
    {
        title: 'Desarrollador de WordPress',
        enterprise: 'Quiñenco',
        origin: 'Computrabajo'
    },
    {
        title: 'En busca de Gerente de Servicios de Salud',
        enterprise: 'Amil',
        origin: 'Linkedln'
    },
    {
        title: 'Asistente administrativo remoto',
        enterprise: 'Ready Care Home Health, Inc',
        origin: 'Linkedln'
    },
    {
        title: 'Analista de compras',
        enterprise: 'Pronto Mowers',
        origin: 'Linkedln'
    },
    {
        title: 'Se busca asistente virtual',
        enterprise: 'The Org',
        origin: 'Linkedln'
    },
    {
        title: 'Diseñador grafico freelancer',
        enterprise: 'Inversiones de Toda C.A',
        origin: 'GetOnBoard'
    },
    {
        title: 'Community Manager',
        enterprise: 'Fooster Swiss',
        origin: 'Linkedln'
    },
    {
        title: 'Desarrollador Backend Experimentado',
        enterprise: 'Inversiones de Toda C.A',
        origin: 'GetOnBoard'
    },
    {
        title: 'Analista Programador Junior',
        enterprise: 'Bitcode Enterprise C.A',
        origin: 'Computrabajo'
    },
    {
        title: 'Operador Bilingue Call Center',
        enterprise: 'Apis Consultores, C.A.',
        origin: 'GetOnBoard'
    },
    {
        title: 'Contable Administrativo',
        enterprise: 'Empresas Vesta',
        origin: 'GetOnBoard'
    },
    {
        title: 'Ingeniero de Datos',
        enterprise: 'ACL',
        origin: 'Linkedln'
    },
    {
        title: 'Se solicita analista de sistemas',
        enterprise: 'MintMe',
        origin: 'Linkedln'
    },
    {
        title: 'Scrum Master con 3 años de experiencia',
        enterprise: 'ACL',
        origin: 'GetOnBoard'
    },
    {
        title: 'En busca de ejecutivo de ventas con experiencia',
        enterprise: 'EDIMAC',
        origin: 'Computrabajo'
    },
    {
        title: 'Especialista Basis',
        enterprise: 'Excelsior Gama Supermercados, C.A.',
        origin: 'Computrabajo'
    },
    {
        title: 'Especialista en servidores',
        enterprise: 'Niu 912, C.A.',
        origin: 'Linkdln'
    },
    {
        title: 'Community manager con experiencia comprobable',
        enterprise: 'Aluxium',
        origin: 'GetOnBoard'
    },
    {
        title: 'Gerente de personal',
        enterprise: 'BairesDev SA',
        origin: 'Computrabajo'
    },
    {
        title: 'Se requiere Desarrollador Full Stack Urgente',
        enterprise: 'BC Technology',
        origin: 'GetOnBoard'
    },
]

const recomendedJobs = [

    {
        title: 'Consultor de Innovación y UX',
        enterprise: 'MATCH',
        origin: 'GetOnBoard'
    },
    {
        title: 'Diseñador UX Senior',
        enterprise: '2Brains',
        origin: 'Linkdln'
    },
    {
        title: 'Personal Ejecutivo Call Center',
        enterprise: 'Jumpitt Labs',
        origin: 'Computrabajo'
    }
]

const featuredUsers = [

    {
        name: 'Mary Macgúire',
        enterprise: 'Mapple',
        position: 'UX/UI Designer'
    },
    {
        name: 'Juan Gonzales',
        enterprise: 'Tónica',
        position: 'Desarrollador de Aplicaciones'
    },
    {
        name: 'Dayana Auvert',
        enterprise: 'Epoca',
        position: 'Community Manager'
    },

]


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
}));

const Job = ({ title = 'Programador Web', image = 'https://api.lorem.space/image/furniture?w=70&h=70', enterprise = 'Nombre de empresa', origin = 'linkedin', date }) => (

    <Box sx={{ p: 1, bgcolor: 'background.paper' }}>
        <Stack sx={{ flexDirection: 'row', gap: 1, alignItems: 'center' }} >
            <Box sx={{ height: 70, width: 70, position: 'relative', overflow: 'hidden' }}>
                <img alt='enterprise' src={image} style={{ position: 'absolute' }} />
            </Box>
            <Box sx={{ width: '70%' }}>
                <Typography variant="h6" component="div">
                    {title}
                </Typography>
                <Typography color="text.secondary">
                    {enterprise}
                </Typography>
                <Typography variant="body2">
                    Origen: {origin}
                </Typography>
            </Box>

        </Stack>
    </Box>
)

const FeaturedUser = ({ name = 'Jon Doe', enterprise = 'Mapple', image = 'https://api.lorem.space/image/furniture?w=70&h=70', position = 'Desarrollador Web' }) => {
    return (
        <StyledPaper sx={{ width: '30%' }}>
            <Avatar sx={{ bgcolor: 'secondary.main', color: 'text.primary', margin: 'auto' }}>{name.split(' ').map(e => e.slice(0, 1))}</Avatar>
            <Typography variant='h6'>{name}</Typography>
            <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>{enterprise}</Typography>
            <Typography variant='body' sx={{ color: 'text.primary' }}>{position}</Typography>
        </StyledPaper>
    )
}


export const JobsView = () => {
    return (
        <Box sx={{ p: 2 }}>
            <Container>
                <Stack gap={2} direction='row'>
                    <StyledPaper sx={{ width: '50%', p: 2 }}>

                        {Works.map(e => (<> <Job {...e} /><Divider /> </>))}

                    </StyledPaper>
                    <Stack sx={{ width: '50%', gap: 2 }}>

                        <StyledPaper variant="outlined">
                            <Typography variant="h5" component="div">
                                Te recomendamos.
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Empleos
                            </Typography>
                            <Typography variant="body2">
                                {recomendedJobs.map(e => (<> <Job {...e} /><Divider /> </>))}
                            </Typography>
                        </StyledPaper>
                        <StyledPaper variant="outlined" sx={{ bgcolor: 'background.default', position: 'sticky', top: 16 }}>
                            <Typography variant="h5" component="div">
                                Usuarios.
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Detacados
                            </Typography>
                            <Stack direction='row' gap={2} justifyContent='center' sx={{width:'100%'}}>
                                {featuredUsers.map(e => <FeaturedUser{...e} />)}
                            </Stack>

                        </StyledPaper>
                    </Stack>
                </Stack>

            </Container>

        </Box>
    )
}
