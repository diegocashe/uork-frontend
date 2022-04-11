import { Box } from '@mui/material'
import { Nav } from '../common/navigation/Nav'

export const PublicLayout = ({ children }) => {
  return (
    <>
      <Nav />
      <Box
        // sx={{ height: ['calc(100vh - 56px)', 'calc(100vh - 64px)'], bgcolor: 'background.default'}}
        sx={{ height: ['calc(100vh - 56px)', 'calc(100vh - 64px)']}}
      >
        {children}
      </Box>
    </>
  )
}
