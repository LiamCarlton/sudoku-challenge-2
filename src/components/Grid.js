import React from 'react'

function Grid({cellStyle, initialState, currentState, inputChangeHandler}) {

  return (
    <table>
      <tbody>
        {
          [...Array(9).keys()].map((row) =>
          {
            return <tr key={row}>
              {
                [...Array(9).keys()].map((col) => 
                {
                  return <td key={row + col}>
                    <input className={cellStyle} value={
                      currentState[row][col] > 0 ? currentState[row][col]: ''}
                      onChange={(e) => inputChangeHandler(e, row, col)}
                      disabled={initialState[row][col]}>
                      
                    </input>
                  </td>
                })
              }
            </tr>
          })
        }
      </tbody>
    </table>
  )
}

export default Grid
