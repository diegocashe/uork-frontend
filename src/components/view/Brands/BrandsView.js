import { useState } from 'react'
import { TableTemplateContainer } from '../../common/TemplateView/TableTemplate/TableTemplateContainer'
import { Form } from './Form';
import { postBrand, putBrand, getBrands, deleteBrand } from './Brands';
import dateTimeFormat from "../../../utils/dateTimeFormat";

export const BrandsView = () => {

    const [models, setModels] = useState([]);

    const onSetModels = (models = [{}]) => {
        setModels(models)
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 90, flex: 0.1 },
        { field: 'name', headerName: 'Marca', width: 150, flex: 0.5, editable: true },
        { field: 'website', headerName: 'Sitio Web', width: 150, flex: 0.5, editable: true },
        {
            field: 'created', headerName: 'Creado', width: 150, editable: false, flex: 0.8, type: 'date',
            valueGetter: (params) => new Date(params.value),
            valueFormatter: ({ value }) => dateTimeFormat(value),
            // editable:true
        },
        {
            field: 'modified', headerName: 'Modificado', width: 150, editable: false, flex: 0.8, type: 'date',
            valueGetter: (params) => (new Date(params.value)),
            valueParser: (params) => params.value.getFullYear(),
            valueFormatter: ({ value }) => dateTimeFormat(value)
        },
    ];

    const getRows = getBrands
    const postNewRow = (data) => postBrand(data)
    const putRow = (data) => putBrand(data)
    const deleteRow = (id) => deleteBrand(id)

    return (
        <TableTemplateContainer
            defaultValues={{
                name: '',
                website: ''
            }}
            modelName='Modelos'

            fetchActions={{
                get: getRows,
                post: postNewRow,
                put: putRow,
                deleteRowByid: deleteRow
            }}
            columns={columns}
            rows={models}
            setRows={onSetModels}
            Form={Form}
        >


        </TableTemplateContainer >
    )

}
