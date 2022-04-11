import { useState, useEffect, useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form';
import { TableTemplate } from './TableTemplate'
import dataGridRowFormater from '../../../../utils/dataGridRowFomater';
import { ConfirmDialog } from '../../Dialogs/ConfirmDialog';

// import { getBrands, postBrand as post, putBrand as put, deleteBrand as delete } from './Brands';

export const TableTemplateContainer = ({
    defaultValues = {},
    modelName = '',
    fetchActions = {
        get: async () => { },
        post: async () => { },
        put: async () => { },
        deleteRowByid: async () => { }
    },
    columns = [{}],
    rows = [],
    setRows = () => { },
    Form = <></>,
    settings = {},
    children
}) => {

    const { get, post, put, deleteRowByid } = fetchActions

    const editables = columns.map(column => ((column.editable === true) && column.field)).filter(e => e)

    // const [rows, setRows] = useState([]);

    const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm({ defaultValues: defaultValues })

    //custom hook
    const [row, setRow] = useState({})
    const [inEdit, setInEdit] = useState(false)
    const [loadingFetch, setLoadingFetch] = useState(true)
    const [snackbar, setSnackbar] = useState(null)
    const [dialog, setDialog] = useState(null)

    const rowValuePersistance = useRef({})
    const oldRowsValue = useRef([])

    // PARA LIMITAR LOS RENDER HAY QUE HACER UN SOLO ESTADO O DISMINUIR LA CANTIDAD DE ESTOS
    // POR AHORA NO LO HARE POR FLOJERA

    // START-END LOADER

    const startFetchingLoader = useCallback(() => {
        if (loadingFetch !== true) {
            setLoadingFetch(true)
        }
    }, [])

    const endUpFetchingLoader =useCallback(() => {
        if (loadingFetch !== false) {
            setLoadingFetch(false)
        }
    }, []) 

    /** fetching */

    const getRows = useCallback(
        async () => {
            startFetchingLoader()
            try {
                const rows = await get()
                if (Array.isArray(rows)) {
                    setRows(rows)
                    oldRowsValue.current = rows
                }
            } catch (error) {
                try {
                    setRows(oldRowsValue.current)
                } catch (error) {
                    setRows([])
                }
                console.error(error)
                setSnackbar({ children: error.message, severity: 'error' });
            }
            endUpFetchingLoader()
        },
        [endUpFetchingLoader, get, setRows, startFetchingLoader],
    )

    const postNewRow = useCallback(
        async (data) => {
            startFetchingLoader()
            try {
                await post(data)
                setSnackbar({ children: `${modelName} agregada`, severity: 'success' });
                await getRows()
            } catch (error) {
                console.error(error)
                setSnackbar({ children: `Error agregando ${modelName}`, severity: 'error' });
            }
            reset()
            setDialog(null)
            endUpFetchingLoader()
        },
        [reset, endUpFetchingLoader, getRows, modelName, post, startFetchingLoader],
    )

    const putRow = useCallback(
        async (data) => {
            startFetchingLoader()
            try {
                await put(data)
                setSnackbar({ children: `${modelName} actualizada`, severity: 'success' });
                await getRows()
            } catch (error) {
                console.error(error)
                setSnackbar({ children: `Error actualizando ${modelName}`, severity: 'error' });
            } finally {
                reset()
                setDialog(null)
                endUpFetchingLoader()
            }
        },
        [reset, endUpFetchingLoader, getRows, modelName, put, startFetchingLoader],
    )

    const deleteRow = useCallback(
        async (id) => {
            startFetchingLoader()
            try {
                await deleteRowByid(id)
                setSnackbar({ children: `${modelName} eliminada`, severity: 'error' });
                await getRows()
            } catch (error) {
                console.error(error)
                setSnackbar({ children: `Error eliminando ${modelName}`, severity: 'error' });
            } finally {
                reset()
                setDialog(null)
                endUpFetchingLoader()
            }
        },
        [reset, deleteRowByid, endUpFetchingLoader, getRows, modelName, startFetchingLoader],
    )



    const DeleteDialog = ({ id }) => (
        <ConfirmDialog
            title='Eliminar'
            content='¿Esta seguro de continuar?'
            onAccept={async (e) => {
                deleteRow(id)
            }}
            onCancel={async (e) => {
                setDialog(null)
            }}
            open={!!dialog}
            loading={loadingFetch}
        />
    )

    // handlers

    const handleOnStartEditRow = (model) => {
        rowValuePersistance.current = model.row
    }

    const handleOnEditRowsModelChange = (model) => {
        const formatedModel = dataGridRowFormater(model)
        if (formatedModel) {
            setRow(formatedModel);
            return
        }
        return
    }

    const handleOnCommit = async (id) => {
        let f = true;
        for (const k in row) {
            if (row[k].toString() !== rowValuePersistance.current[k].toString()) {
                f = false
            }
        }
        if (f) {
            setRow({})
            return
        }
        setInEdit(true)
    }

    const handlerOnSubmitEditRow = async () => {
        await putRow(row)
        setInEdit(false)
    }

    const handlerOnSubmitEdit = (data) => {
        putRow(data)
    }

    const handleOnDeclineChanges = (e) => {
        setInEdit(false)
        getRows()
        setRow({})
    }

    const handleCloseSnackbar = () => setSnackbar(null);

    const handleOnOpenAddDialog = () => {
        reset()
        setDialog({
            title: 'Agregar',
            form: <Form
                onSubmit={handleSubmit(postNewRow)}
                settings={settings}
                control={control}
                errors={errors}
                onCloseDialog={handleOnCloseDialog}
                isLoading={false}
            />
        })
    }

    const handleOnOpenEditDialog = () => {
        const editRow = rowValuePersistance.current;
        if (editRow.id === undefined) {
            setSnackbar({ children: 'Por favor seleccione solo una fila', severity: 'info' });
            return
        }
        for (const key in editRow) {
            setValue(key, editRow[key])
        }

        setDialog({
            title: 'Agregar',
            form: <Form
                onSubmit={handleSubmit(handlerOnSubmitEdit)}
                settings={settings}
                control={control}
                errors={errors}
                reset={reset}
                onCloseDialog={handleOnCloseDialog}
            />
        })
    }

    const handlerOnDeleteRow = () => {
        const editRow = rowValuePersistance.current;
        if (!editRow?.id) {
            setSnackbar({ children: 'Por favor seleccione solo una fila', severity: 'info' });
            return
        }
        setDialog({
            form: <DeleteDialog id={editRow.id} />
        })
    }

    const handleOnCloseDialog = () => {
        reset()
        setDialog(null)
    }

    const handlerSelectionModelChange = (arrayOfSelect = [0]) => {
        if (arrayOfSelect.length === 1) {
            const obj = oldRowsValue.current.find(row => row.id === arrayOfSelect[0])
            const obj2 = {}
            for (const key in obj) {
                if (editables.includes(key) || key === 'id') {
                    obj2[key] = obj[key]
                }
            }
            rowValuePersistance.current = obj2
            return
        }
        rowValuePersistance.current = null
    }

    useEffect(() => { getRows() }, [])

    return (
        <TableTemplate

            Title={modelName}
            columns={columns}
            rows={rows}

            onEdit={inEdit}
            loadingFetch={loadingFetch}

            onRowEditStart={handleOnStartEditRow}
            onEditRowsModelChange={handleOnEditRowsModelChange}
            onRowEditCommit={handleOnCommit}
            onCloseSnackBar={handleCloseSnackbar}
            onDeclineChanges={handleOnDeclineChanges}
            onAcceptChanges={handlerOnSubmitEditRow}
            onOpenEditDialog={handleOnOpenEditDialog}
            onDeleteRow={handlerOnDeleteRow}

            snackbar={snackbar}

            dialog={dialog}
            onOpenAddRowDialog={handleOnOpenAddDialog}
            onCloseDialog={handleOnCloseDialog}

            onSelectionModelChange={handlerSelectionModelChange}
            selectionModel={row}
        >
            {children}
        </TableTemplate>

    )
}
