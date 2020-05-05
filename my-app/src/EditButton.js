import React, { useRef, useEffect, useState } from 'react';

import firebase from 'firebase';

const renderEditContainer = ({type, onChange, value}) => {
    switch (type) {
        case 'text': {
            return (
                <div className={`edit-container-text`}>
                    <textarea className={`textarea-edit`} value={value} onChange={onChange}/>
                </div>
            )
        }
    }
};

const EditButton = ({type, id}) => {
  const [openState, setOpenState] = useState(false);
  const [value, setValue] = useState({ show: false, dir: 'left' });
  let mainRef = useRef();

  const startEdit = (e) => {
        console.log("se", this.mainRef.current.offset)
        this.setState({
        })
    };
    const onValueChange = (value) => {
        setValue({
            value,
        })
    };
    return (
            <div ref={mainRef} onClick={startEdit} className='edit-button'>
                EDIT
            </div>
    )
}

export default EditButton;