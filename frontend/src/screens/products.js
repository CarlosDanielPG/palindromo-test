/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import DataTable from "react-data-table-component"
import Select from "react-select"
import api from "../api/api"
import SVG from "../components/SVG"
import { currency_format } from "../utils/formatters"

const Products = () => {
    const [search, setSearch] = useState('')
    const [lastSearch, setLastSearch] = useState('')
    const [type, setType] = useState({ value: 'brand', label: 'By Brand' })
    const [perPage, setPerPage] = useState(10)
    const [page, setPage] = useState(1)
    const [totalRows, setTotalRows] = useState(0)
    const [rows, setRows] = useState([])
    const options = [
        { value: 'brand', label: 'By Brand' },
        { value: 'description', label: 'By Description' },
        { value: 'id', label: 'By ID' }
      ]
    const columns = [
        {
            name: 'id',
            cell: (row) => row.id,
            omit: true
        },
        {
            sortField: 'image',
            name: '',
            selector: (row) => {
                return <SVG url={`https://${row.image}`}/>
            }
        },
        {
            sortField: 'brand',
            name: 'Brand',
            cell: (row) => row.brand
        },
        {
            sortField: 'description',
            name: 'Description',
            cell: (row) => row.description
        },
        {
            sortField: 'discount',
            name: 'Discount',
            cell: (row) => currency_format(row.discount ?? 0)
        },
        {
            sortField: 'price',
            name: 'Price',
            cell: (row) => currency_format(row.price)
        }
    ]

    const getProducts = async () => {
        let query = `page=${page}&per_page=${perPage}`

        if(search !== '' && type !== null) {
            query += `&type=${type.value}&search=${search}`
        }

        const response = await api.get(`/products?${query}`)
        if (response.status === 200) {
            setRows(response.data.data)
            setTotalRows(response.data.total)
        }
    }

    const onChangePage = (page) => {
        setPage(page)
    }

    const onChangeRowsPerPage = (p) => {
        setPerPage(p)
    }

    const handlerSearch = (searchValue) => {
        setSearch(searchValue)
        if (searchValue === '') {
            getProducts()
        }
    }
    const handleKeyDown = event => {
        if (event.key === 'Enter') {
          if (search !== '') {
            setLastSearch(search)
            getProducts()
          }
        }
    }
    const handleOnBlur = () => {
        if (lastSearch !== search) {
            getProducts()
            setLastSearch(search)
        }
    }

    useEffect(() => {
        getProducts()
    }, [page, perPage])

    return (
        <div className="flex flex-col items-center my-10 gap-2">
            <div className="bg-white shadow rounded min-w-md max-w-screen-md px-3 py-2 flex gap-2">
                <div className="flex flex-col items-start gap-1 w-full">
                    <label>Search</label>
                    <input 
                        className="w-full px-2 py-1 border-b border-emerald-300" 
                        type="text" 
                        onChange={(e) => handlerSearch(e.target.value)} 
                        onKeyDown={handleKeyDown} 
                        onBlur={handleOnBlur} 
                    />
                </div>
                <div className="flex flex-col items-end gap-1 w-48">
                    <label>Type of Search</label>
                    <Select 
                        options={options} 
                        defaultValue={type}
                        onChange={(e) => setType(e)}
                        styles={{
                            container: (baseStyle) => ({
                                ...baseStyle,
                                width: '100%'
                            })
                        }}
                    />
                </div>
            </div>
            <div className="bg-white shadow rounded min-w-md max-w-screen-md p-5">
            <DataTable 
                noDataComponent={<div className="flex justify-center mt-1" ><p>No results found</p></div>}
                keyField={'id'}
                sortServer
                pagination
                responsive
                dense
                paginationServer
                columns={columns}
                className="react-dataTable"
                paginationPerPage={perPage}
                paginationTotalRows={totalRows}
                data={rows}
                selectableRowsNoSelectAll
                onChangePage={onChangePage}
                onChangeRowsPerPage={onChangeRowsPerPage}
            />
            </div>
        </div>
    )
}

export default Products