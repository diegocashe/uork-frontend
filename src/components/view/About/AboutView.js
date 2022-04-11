import { Container, Divider, Stack, Typography, Box, Button } from '@mui/material'
import img2 from '../../../static/about2.svg'
import img3 from '../../../static/about3.svg'
import img4 from '../../../static/about4.svg'
import { about, Objetivo, Propuesta } from './About'

export const AboutView = () => {
  return (
    <>
      <Box mb={4} pb={4}>
        <Stack alignItems='center' justifyContent={'center'} sx={{ width: '100%' }} >
          <Container>
            <Typography variant='h2' textAlign={'center'}> Uork </Typography>
            <Divider variant='middle' sx={{ py: 2, fontWeight: 200 }}>¿Que es y que puede hacer por ti?</Divider>
            <Box>
              <Box>
                <Typography variant='h6'>{about}</Typography>

              </Box>
              <Stack alignItems='center' justifyContent={'center'}>
                <img alt='Work' src={img2} width={'70%'} />
              </Stack>


            </Box>
          </Container>
        </Stack>
      </Box>

      <Box sx={{ width: '100%', bgcolor: 'secondary.light' }}>
        <Stack alignItems='center' justifyContent={'center'} py={4}>
          <Container>
            <Typography variant='h3' textAlign={'left'}> Objetivo </Typography>
            <Divider textAlign='left' sx={{ py: 2, fontWeight: 200 }}>Te deseamos lo mejor, porque mereces lo mejor</Divider>
            <Stack direction={'row'} gap={2} alignItems='center' >
              <Box>
                <Typography variant='h4'>{Objetivo}</Typography>

              </Box>
              <Stack alignItems='center' justifyContent={'center'}>
                <img alt='Work' src={img3} width={'70%'} />
              </Stack>


            </Stack>
          </Container>
        </Stack>

      </Box>
      <Box sx={{ width: '100%', bgcolor: 'primary.dark' }}>
        <Stack alignItems='center' justifyContent={'center'} py={4}>
          <Container>
            <Typography variant='h3' textAlign={'right'}> Propuesta de valor </Typography>
            <Divider textAlign='right' sx={{ py: 2, fontWeight: 200 }}>¿Por qué elegirnos a nosotros?</Divider>
            <Stack direction={'row'} gap={2} alignItems='center' >
              <Stack alignItems='center' justifyContent={'center'}>
                <img alt='Work' src={img4} width={'70%'} />
              </Stack>
              <Box>
                <Typography variant='h5'>{Propuesta}</Typography>

              </Box>


            </Stack>
          </Container>
        </Stack>

      </Box>


    </>
  )
}
