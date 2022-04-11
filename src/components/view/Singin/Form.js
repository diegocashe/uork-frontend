import { useState, useEffect, useCallback } from 'react'
import {
    Button,
    Card,
    CardActions,
    CardContent,
    FormControlLabel,
    FormGroup,
    Stack,
    TextField,
    Typography,
    Checkbox,
    Link,
    Box,
    Container,
    ToggleButtonGroup,
    ToggleButton
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { StyledPaper } from '../../common/Surfaces/Papers/Paper'
import { Login } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'

export const Fields = ({
    control,
    errors,
    seePassword = false,
    getValues = () => { },
    isEnterprise = false,
}) => (
    <Stack direction={'column'} gap={2}>
        {
            (isEnterprise)
                ? <Controller
                    name='enterpriseName'
                    control={control}
                    rules={{ required: true, }}
                    render={({ field }) =>
                        <TextField
                            fullWidth
                            label='Nombre de Empresa' id='EnterpriseName' {...field}
                            error={!!errors.code?.type}
                            helperText={errors.code?.type === 'required' && "Por favor, ingresa el nombre de la empresa"} />
                    }
                />
                : <Stack direction={'row'} gap={2}>
                    <Controller
                        name='firstName'
                        control={control}
                        rules={{ required: true, }}
                        render={({ field }) =>
                            <TextField
                                fullWidth
                                label='Primer Nombre' id='firstName' {...field}
                                error={!!errors.firstName?.type}
                                helperText={errors.firstName?.type === 'required' && "Por favor, ingresa tus nombres"}
                            />
                        }
                    />
                    <Controller
                        name='lastName'
                        control={control}
                        rules={{ required: true, }}
                        render={({ field }) =>
                            <TextField
                                fullWidth
                                label='Segundo Nombre' id='lastName' {...field}
                                error={!!errors.lastName?.type}
                                helperText={errors.lastName?.type === 'required' && "Por favor, ingresa tus apellidos"} />
                        }
                    />
                </Stack>
        }


        <Controller
            name='username'
            control={control}
            rules={{ required: true, }}
            render={({ field }) =>
                <TextField
                    fullWidth
                    label='Nombre de Usuario' id='username' {...field}
                    error={!!errors.username?.type}
                    helperText={errors.username?.type === 'required' && "El nombre de usuario es requerido"}
                />
            }
        />

        <Stack direction={'row'} gap={2}>
            <Controller
                name='password'
                control={control}
                rules={{ required: true, }}
                render={({ field }) =>
                    <TextField
                        fullWidth
                        type={(!seePassword) ? 'password' : 'text'}
                        label='Contraseña' id='password' {...field}
                        error={!!errors.password?.type}
                        helperText={errors.password?.type === 'required' && "Por favor, ingresa tus nombres"}
                    />
                }
            />
            <Controller
                name='confirmPassword'
                control={control}
                rules={{
                    required: true,
                    validate: {
                        matchesPreviousPassword: (value) => {
                            const { password } = getValues();
                            return password === value || "Passwords should match!";
                        }
                    }
                }}
                render={({ field }) =>
                    <TextField
                        fullWidth
                        type={(!seePassword) ? 'password' : 'text'}
                        label='Confirmar Contraseña' id='confirmPassword' {...field}
                        error={!!errors.confirmPassword?.type}
                        helperText={(() => {
                            if (errors.confirmPassword?.type === 'required') return "Es necesario confirmar tu contraseña"
                            if (errors.confirmPassword?.type === 'matchesPreviousPassword') return "Las contraseñas no son iguales"
                        })()}
                    />
                }
            />
        </Stack>
    </Stack >
)

export const Form = ({ onSubmit, loading }) => {
    const { control, handleSubmit, formState: { errors }, reset, getValues } = useForm({
        defaultValues: {
            enterpriseName: '',
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            confirmPassword: ''
        },
        mode: "onBlur"
    })

    const [isEnterprise, setIsEnterprise] = useState(false)
    const [visiblePassword, setVisiblePassword] = useState(false)

    const handleSelectUsertype = (event, value) => {
        reset()
        setIsEnterprise((value === 'true'));
    };

    const handlerOnChangePasswordVisibility = (event) => {
        setVisiblePassword(event.target.checked)
    }

    const validateUsername = (username = '') => {

    }

    const handlerOnSubmit = (data = {}) => {
        if (isEnterprise) {
            const { firstName, lastName, confirmPassword, ...dataBody } = data
            dataBody.userType = 'enterprise'
            onSubmit(dataBody)
            return
        }
        const { enterpriseName, confirmPassword, ...dataBody } = data
        dataBody.userType = 'employ'
        onSubmit(dataBody)
        return
    }

    return (
        <form onSubmit={handleSubmit(handlerOnSubmit)}>
            <StyledPaper sx={{ width: 'fit-content' }}>
                <Stack gap={2}>
                    <Typography variant='caption' color={'GrayText'} >Bienvenido</Typography>
                    <Typography align='center' variant='h6' >Crea una cuenta de Uork</Typography>

                    <Fields
                        control={control}
                        errors={errors}
                        seePassword={visiblePassword}
                        getValues={getValues}
                        isEnterprise={isEnterprise}
                    />


                    <Container>
                        <Typography variant='caption' color={'GrayText'} >Utiliza ocho caracteres como mínimo con una combinación de letras, números y símbolos</Typography>
                    </Container>
                    <Stack direction={'row'} alignItems={'center'} justifyContent='space-between'>
                        <FormGroup >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value={visiblePassword}
                                        size='small'
                                        onChange={handlerOnChangePasswordVisibility}
                                    />}
                                label='Mostrar Contraseña'
                            />
                        </FormGroup>
                        <Link sx={{ cursor: 'pointer', fontSize: '0.7rem' }}>Información</Link>
                    </Stack>
                    <Stack justifyContent={'center'} alignItems={'center'}>
                        <ToggleButtonGroup
                            color="primary"
                            value={(isEnterprise === true) ? 'true' : 'false'}
                            exclusive
                            onChange={handleSelectUsertype}
                        >
                            <ToggleButton value='true' defaultChecked>Empresa</ToggleButton>
                            <ToggleButton value='false'>Empleado</ToggleButton>
                        </ToggleButtonGroup>
                    </Stack>
                    <Stack justifyContent={'flex-end'} alignItems={'flex-end'}>
                        <LoadingButton
                            size="small"
                            type='submit'
                            endIcon={<Login />}
                            loading={loading}
                            loadingPosition="end"
                            variant="contained"
                        >
                            Registrarme
                        </LoadingButton>
                        {/* <LoadingButton size='small' variant='contained' type='submit' >Registro</LoadingButton> */}
                    </Stack>
                </Stack>
            </StyledPaper>
        </form>
    )

}
