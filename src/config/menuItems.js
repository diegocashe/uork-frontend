import { ExpandMore, Share, Home, Work, More, Apple, Person, Badge } from "@mui/icons-material";

const others = () => {
    const p = new Map()
    p.set('description', { name: 'Otros', Icon: More })
    p.set('items', [
        { name: 'Perfil', route: '/profile', Icon: Person },
        { name: 'Cuenta', route: '/account', Icon: Person },
        { name: 'Preferencias', route: '/preferences', Icon: Badge },
    ])
    return p
}

export const employMenuList = [
    { name: 'Inicio', route: '/', Icon: Home },
    { name: 'Empleos', route: '/jobs', Icon: Work },
    { name: 'Publicaciones', route: '/publications', Icon: Share },
    others()
]

export const enterpriseMenuList = [
    { name: 'Inicio', route: '/', Icon: Home },
    { name: 'Personal', route: '/jobs', Icon: Work },
    { name: 'Publicaciones', route: '/publications', Icon: Share },
    others()
]
