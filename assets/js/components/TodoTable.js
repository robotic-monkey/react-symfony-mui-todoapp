import React, {useContext, useState, Fragment} from 'react'
import {TodoContext} from '../contexts/TodoContext';
import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  TextField,
  IconButton,
  Button
} from '@material-ui/core'
import {Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon, Done as DoneIcon, Close as CloseIcon} from '@material-ui/icons';
import DeleteDialog from './DeleteDialog';

export const TodoTable = () => {
  const context = useContext(TodoContext)
  const [addTodo,
    setAddTodo] = useState('');
  const [editIsShown,
    setEditIsShown] = useState(false);
  const [DeleteConfirmationIsShown,
    setDeleteConfirmationIsShown] = useState(false);
  const [editTodo,
    setEditTodo] = useState('');
  const [todoToBeDeleted,
    setTodoToBeDeleted] = useState(null);

  return (
    <Fragment>
      <form
        onSubmit={(event) => {
        context.createTodo(event, {name: addTodo})
      }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <TextField
                  value={addTodo}
                  onChange={(event) => {
                  setAddTodo(event.target.value)
                }}
                  label="New Task"
                  fullWidth={true}></TextField>
              </TableCell>
              <TableCell align="right">
                <IconButton type="submit">
                  <AddIcon/>
                </IconButton>
              </TableCell>
            </TableRow>
            {context
              .todos
              .slice()
              .reverse()
              .map((todo, index) => (
                <TableRow key={'todo' + index}>
                  <TableCell>
                    {editIsShown === todo.id
                      ? <TextField
                          fullWidth={true}
                          value={editTodo}
                          InputProps={{
                          endAdornment: <Fragment>
                              <IconButton
                                onClick={() => {
                                setEditIsShown(false)
                              }}><CloseIcon/></IconButton>
                              <IconButton
                                onClick={() => {
                                context.updateTodo({id: todo.id, name: editTodo});
                                setEditIsShown(false)
                              }}><DoneIcon/></IconButton>
                            </Fragment>
                        }}
                          onChange={(event) => {
                          setEditTodo(event.target.value)
                        }}/>
                      : todo.name}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick= {() => {setEditIsShown(todo.id); setEditTodo(todo.name)}}>
                      <EditIcon/>
                    </IconButton>
                    <IconButton
                      onClick=
                      {() => { setDeleteConfirmationIsShown(true); setTodoToBeDeleted(todo) }}>
                      <DeleteIcon/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

      </form>
      {DeleteConfirmationIsShown && (<DeleteDialog
        todo={todoToBeDeleted}
        open={DeleteConfirmationIsShown}
        setDeleteConfirmationIsShown={setDeleteConfirmationIsShown}/>)}
    </Fragment>
  )
}
