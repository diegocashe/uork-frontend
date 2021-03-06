import { Add, Close, Delete, Edit } from '@mui/icons-material'
import { Typography, Box, IconButton, Stack, ButtonGroup, Button, Card, Container, Alert, Collapse, ListItem, ListItemText, List, ListSubheader, Tooltip, CardContent, CardActions, AlertTitle, Snackbar } from '@mui/material'
import { DataGrid, GridToolbar, esES, useGridApiRef } from '@mui/x-data-grid'
import { useState, useEffect, useCallback, useRef } from 'react'


const columnsExample = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

const rowsExample = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export const TableTemplate = ({
    children,
    Title = 'General Items',
    columns = columnsExample,
    rows = rowsExample,
    isLoading = false,
    editedValues = '',
    onEdit = false,
    snackbar = null || { children: 'User successfully saved', severity: 'success' },
    onRowEditStart = () => { },
    onEditRowsModelChange = () => { },
    onRowEditCommit = () => { },
    onCancelEdit = () => { },
    onCloseSnackBar = () => { },
}) => {

    const apiRef = useGridApiRef()


    const formatEditValues = (param) => {
        // console.log(param)
        if (typeof param === 'string' && param) {
            param = JSON.parse(param)
        }
        const rNodesArray = []
        for (const key in param) {
            if (key === 'id') { continue }
            rNodesArray.push(
                <ListItem key={key}>
                    <ListItemText primary={key} secondary={param[key]} />
                </ListItem>
            )
        }
        return rNodesArray;
    }


    return (
        <Box sx={{ padding: '2rem' }}>
            <Stack direction='row'>
                <Stack flexGrow={1}>
                    <Stack direction={'row'} justifyContent='space-between' mb={2}>
                        <Typography variant='h5'>{Title}</Typography>
                        <ButtonGroup>
                            <Tooltip title='Agregar'>
                                <Button color='secondary' variant='contained'><Add /></Button>
                            </Tooltip>
                            <Button color='info' variant='contained'><Edit /> </Button>
                            <Button color='error' variant='contained' disabled><Delete /> </Button>
                        </ButtonGroup>
                    </Stack>

                    <Collapse in={onEdit} >
                        <Container>
                            <Alert severity="info" sx={{ marginBottom: 1 }}
                                action={
                                    <>
                                    <Button>No, Cancelar</Button>
                                    <Button>Si, Aceptar</Button>
                                    {/* <IconButton onClick={onCancelEdit}><Close /></IconButton> */}
                                    </>}
                                    
                                >
                                ??Esta seguro de editar los valores?
                            </Alert>
                        </Container>
                    </Collapse>

                    <Stack justifyContent='center' alignItems='center' p='8px'>
                        <Card sx={{
                            display: 'flex',
                            height: ['calc(100vh - 220px)'],
                            width: '100%',
                            '& .MuiDataGrid-cell--editable': {
                                bgcolor: (theme) =>
                                    theme.palette.mode === 'dark' ? '#376331' : '#E2EEFD',
                            },
                        }}>
                            <DataGrid

                                rows={rows}
                                columns={columns}
                                pageSize={7}
                                rowsPerPageOptions={[5]}
                                checkboxSelection
                                disableSelectionOnClick
                                pagination
                                components={{
                                    Toolbar: GridToolbar
                                }}
                                loading={isLoading}
                                editMode='row'
                                // onEditRowsModelChange={(m) => { console.log( 'onchange ', m) }} recivo el objeto cambiado
                                onEditRowsModelChange={onEditRowsModelChange}
                                // onRowEditCommit={(m) => { console.log('oncommit ', typeof m ) }}
                                onRowEditCommit={onRowEditCommit}
                                // onRowEditStart={(m) => { console.log('start ', m.row) }} get the object without changes
                                onRowEditStart={onRowEditStart}
                                localeText={{
                                    ...esES.components.MuiDataGrid.defaultProps.localeText,
                                    noRowsLabel: 'Sin Contenido ????',
                                    toolbarExportPrint: 'Imprimir'
                                }}
                                rowsPerPageOptions={[5, 10, 20]}
                            />
                        </Card>
                    </Stack>

                    <Snackbar open={!!snackbar} autoHideDuration={6000} onClose={onCloseSnackBar}>
                        <Alert {...snackbar} onClose={onCloseSnackBar} />
                    </Snackbar>


                </Stack>
            </Stack>
            <Container>
                {children}
            </Container>
        </Box>
    )
}
