// Table.js
import React from 'react';
import TableHeader from './TableHeader';
import UserRow from '../UserRow';
import Pagination from '../Pagination';

const Table = ({ isAllChecked, toggleAllCheckboxes, columnTitles, currentItems, isCheckboxChecked, toggleCheckbox, editMode, editedUser, updatehandler, saveHandler, cancelHandler, deletehandler, setEditedUser}) => {
  return (
    <table>
      <TableHeader
        isAllChecked={isAllChecked}
        toggleAllCheckboxes={toggleAllCheckboxes}
        columnTitles={columnTitles} />
      <tbody>
        {currentItems.map((item) => (
          <UserRow
            key={item.id}
            item={item}
            isCheckboxChecked={isCheckboxChecked}
            toggleCheckbox={toggleCheckbox}
            editMode={editMode}
            editedUser={editedUser}
            updatehandler={updatehandler}
            saveHandler={saveHandler}
            cancelHandler={cancelHandler}
            deletehandler={deletehandler}
            setEditedUser={setEditedUser}
          />
        ))}
        
      </tbody>
    </table>
  );
};

export default Table;
