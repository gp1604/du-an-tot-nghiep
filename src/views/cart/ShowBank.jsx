import React from 'react'

function ShowBank({ bank, listBank }) {
    return (
        <React.Fragment>
            {bank.id === bank.id && <p
                className="form-control form-control-lg"
                style={{ color: 'black', backgroundColor: 'white', fontWeight: 600 }}
            > {bank.bankName}</p >}
            {/* {bank === 'tpbank' && <p
                className="form-control form-control-lg"
                style={{ color: 'black', backgroundColor: 'white', fontWeight: 600 }}
            > {listBank.tpbank}</p >}
            {bank === 'vpbank' && <p
                className="form-control form-control-lg"
                style={{ color: 'black', backgroundColor: 'white', fontWeight: 600 }}
            > {listBank.vpbank}</p >}
            {bank === 'vib' && <p
                className="form-control form-control-lg"
                style={{ color: 'black', backgroundColor: 'white', fontWeight: 600 }}
            > {listBank.vib}</p >}
            {bank === 'bidv' && <p
                className="form-control form-control-lg"
                style={{ color: 'black', backgroundColor: 'white', fontWeight: 600 }}
            > {listBank.bidv}</p >} */}
        </React.Fragment>
    )
}

export default ShowBank