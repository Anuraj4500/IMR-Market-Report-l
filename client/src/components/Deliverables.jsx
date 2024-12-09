import React from 'react';

function Deliverables() {
    return (
        <div className="container">
            <div className="card license mt-3">
                <div className="card-header style-card-header">
                    Deliverables
                </div>
                <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
                    <li className="list-group-item" style={{ padding:'5px 10px', paddingLeft: '1rem' }}>
                    <i class="fas fa-file-pdf"></i>
                        <strong> PDF</strong>
                    </li>
                   
                    <li className="list-group-item" style={{ padding:'5px 10px', paddingLeft: '1rem' }}>
                    <i class="fas fa-file-excel"></i>
                        <strong> ME (Excel Spreadsheet)</strong>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Deliverables;
