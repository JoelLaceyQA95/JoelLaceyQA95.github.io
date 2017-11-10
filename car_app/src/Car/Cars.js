import React from 'react';

const car = (props) => {
    return (
        <tr>
            <td> {props.make} </td>
            <td> {props.country} </td>
            <td> {props.topSpeed} </td>
            <td> <button data-id={props.id} onClick={props.deleteFunc}> Delete Car </button> </td>
            <td> <button data-id={props.id} onClick={props.updateFunc}> Update Car </button> </td>
        </tr>
    )
}

export default car;