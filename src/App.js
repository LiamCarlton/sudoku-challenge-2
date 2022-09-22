import './App.css'
import Grid from './components/Grid'
import DialogueBox from './components/ErrorChecker'
import { useState} from 'react'

const initialBoard = 
[
  [0,0,0,2,6,0,7,0,1],
  [6,8,0,0,7,0,0,9,0],
  [1,9,0,0,0,4,5,0,0],
  [8,2,0,1,0,0,0,4,0],
  [0,0,4,6,0,2,9,0,0],
  [0,5,0,0,0,3,0,2,8],
  [0,0,9,3,0,0,0,7,4],
  [0,4,0,0,5,0,0,3,6],
  [7,0,3,0,1,8,0,0,0]
]

const solvedBoard = 
[
  [4,3,5,2,6,9,7,8,1],
  [6,8,2,5,7,1,4,9,3],
  [1,9,7,8,3,4,5,6,2],
  [8,2,6,1,9,5,3,4,7],
  [3,7,4,6,8,2,9,1,5],
  [9,5,1,7,4,3,6,2,8],
  [5,1,9,3,2,6,8,7,4],
  [2,4,8,9,5,7,1,3,6],
  [7,6,3,4,1,8,2,5,9]
]

const errorTypes =
  [
    'One or more columns contain duplicates!',
    'One or more rows contain duplicates!',
    'One or more subgrids contain duplicates!'
  ]

const App = () => {

  const getDeepCopy = (arr) =>
  {
    return JSON.parse(JSON.stringify(arr))
  }

  //Need to use getDeepCopy to prevent the initialBoard from being overwritten as players make inputs.
  const [boardState, setBoardState] = useState(getDeepCopy(initialBoard))

  const [currentErrors, setCurrentErrors] = useState([])

  const [isComplete, setIsComplete] = useState(false)

  
  // useEffect(() =>
  // {
  //   const checkStatus = () =>
  //   {
  //     setCurrentErrors(checkForErrors)
  //   }

  //   checkStatus()
  // }, [currentErrors])

  
  
  const onInputChange = (e, row, col) =>
  {
    var val = parseInt(e.target.value) || 0, grid = Array.from(boardState)
    if(val === 0 || (val >=1 && val <= 9))
    {
      grid[row][col] = val
    }
    else
    {
      console.log('Invalid Input')
    }
    setBoardState(grid)
  }

  //returns true if duplicates are found
  const checkForDuplicates = (arr) => 
  {
    const duplicates = arr.filter((item, index) => arr.indexOf(item) !== index && item !==0)

    return duplicates.length !== 0
  }

  const checkRows = () =>
  {
    const result = boardState.map((arr) => checkForDuplicates(arr)).filter(x => x === true)

    return result.length !== 0
  }

  const checkColumns = () =>
  {
    const arrayColumn = (arr, n) => arr.map((x) => x[n]);

    const columns = [...Array(9).keys()].map((col) => arrayColumn(boardState, col))

    const result = columns.map((arr) => checkForDuplicates(arr)).filter(x => x === true)

    return result.length !== 0
  }

  const checkSubgrids = () =>
  {

    const subGrids = []
    for(var i = 0; i<=6; i+=3)
    {
      for(var j = 0; j <= 6; j+=3)
      {
        var subGrid = boardState.slice(i,i+3).map(x => x.slice(j,j+3))
        subGrids.push(subGrid)
      }
    }
    //console.log(subGrids)

    const flattenedSubgrids = subGrids.map(x => [].concat(...x))

    const result = flattenedSubgrids.map((arr) => checkForDuplicates(arr)).filter(x => x === true)

    return result.length !==0
  }


  const checkForErrors = () =>
  {
    const errors = []

    switch(true)
    {
      case checkRows():
        errors.push(errorTypes[0])
      case checkColumns():
        errors.push(errorTypes[1])
      case checkSubgrids():
        errors.push(errorTypes[2])
    }

    return errors
    //setCurrentErrors(errors)
  
  }

  const checkForCompletion = () =>
  {
    setCurrentErrors(checkForErrors())

    const isBoardFilled = () =>
    {
      return boardState.map((arr) => !arr.includes(0)).filter(x => !x).length ===0
    } 

    setIsComplete(currentErrors.length === 0 && isBoardFilled())

  }

  
  return (
    <div className="App">
      <div className='App-header'>
        <h2>Sudoku Challenge</h2>
        {/* ~~This commented-out button populates the board with the correct solution when clicked~~
         <button onClick={()=>setBoardState(getDeepCopy(solvedBoard))}>Solve</button> 
         */}
        <Grid cellStyle={'inputCell'} initialState={initialBoard} currentState={boardState} inputChangeHandler={onInputChange}/>
        <DialogueBox errorMessage={currentErrors} completionStatus={isComplete} completionChecker={checkForCompletion}></DialogueBox>
      </div>
        
    </div>
  );
}

export default App;
