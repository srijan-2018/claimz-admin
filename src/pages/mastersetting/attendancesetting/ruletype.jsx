import React, { useState } from 'react';

const Ruletype = (leaveList) => {
    const [formRows, setFormRows] = useState([]);

    const handleRowChange = (e, index) => {
        const { name, value } = e.target;
        const updatedRows = [...formRows];
        updatedRows[index] = { ...updatedRows[index], [name]: value };
        setFormRows(updatedRows);
    };

    const handleAddRow = () => {
        setFormRows([...formRows, {}]);
    };

    const handleRemoveRow = (index) => {
        const updatedRows = [...formRows];
        updatedRows.splice(index, 1);
        setFormRows(updatedRows);
    };

    return (
        <div>
            {formRows.map((row, index) => (
                <div key={index}>
                    <input
                        type="text"
                        name="name"
                        value={row.name || ''}
                        onChange={(e) => handleRowChange(e, index)}
                        placeholder="Name"
                    />
                    <input
                        type="text"
                        name="value"
                        value={row.value || ''}
                        onChange={(e) => handleRowChange(e, index)}
                        placeholder="Value"
                    />
                    <button onClick={() => handleRemoveRow(index)}>Remove</button>
                </div>
            ))}
            <button onClick={handleAddRow}>Add Row</button>
            <pre>{JSON.stringify(formRows, null, 2)}</pre>
        </div>
    );
};


export default Ruletype