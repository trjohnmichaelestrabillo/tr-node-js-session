import './table.css'
const Table = ({ headers, rows, keys , onView, onEdit, onDelete}) => {
    return (
        <table>
            <thead>
                <tr>
                    {
                        headers.map(header => (
                            <th key={header}>{header}</th>
                        ))
                    }
                    
                </tr>
            </thead>
            <tbody>
                {
                    rows.map((row, index) => (
                        <tr key={index}>
                            {
                                keys.map(key => (
                                    <td key={key}>{row[key]}</td>
                                ))
                            }
                            <td>
                                <button onClick={() => onView(row)} className="success">View</button>
                                {/* <button onClick={() => onEdit(row)}>Edit</button> */}
                                <button onClick={() => onDelete(row)} className="danger">Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default Table