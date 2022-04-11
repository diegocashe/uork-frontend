import { useState, useEffect } from 'react'
import { Stack, Box } from '@mui/material'
import { Form } from './Form'
import { useFetch } from '../../../hooks/useFetch'
import { LOGIN, PROFILE } from '../../../const/routes'
import { useAuthToken } from '../../../hooks/useAuthToken'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../../hooks/useUser'
import { useLoadApp } from '../../../hooks/useLoadApp'

export const LoginView = () => {
    const { user, setUser } = useUser()
    const { setLoadingApp } = useLoadApp()

    const { post: login } = useFetch({ route: LOGIN })
    const { get: getProfile } = useFetch({ route: PROFILE })
    const [token, setAuthToken] = useAuthToken()
    const navigate = useNavigate()
    
    const [onLoading, setOnLoading] = useState(false)

    const handlerOnSubmit = async (data) => {
        setOnLoading(true)
        const { access_token } = await login(data)
        if (access_token) {
            setAuthToken(access_token)
            setOnLoading(false)
            setLoadingApp(true)
            const profile = await getProfile(access_token);
            setUser({ ...profile })
            navigate('/')
            setLoadingApp(false)
        }
    }

    return (
        <Stack sx={{
            backgroundColor: 'secondary',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative'
        }}
        >
            <Box sx={{ position: 'absolute', zIndex: '-1', width: '100%', height: '100%', background: 'linear-gradient(to bottom,  rgba(0, 0, 0, 0), #1ea6fc)' }}>

            </Box>
            <Box sx={{ width: ['80%', '40%', '40%', '30%'] }}>
                <Form onSubmit={handlerOnSubmit} loading={onLoading} />
            </Box>
        </Stack>
    )
}
