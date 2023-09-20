import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';


const Filter = () => {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.filter);

    const handleChange = (e) => {
        const filterValue = e.target.value;
        dispatch(filterChange(filterValue));
    };
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} value={filter} />
        </div>
    );
};


export default Filter;