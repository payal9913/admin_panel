// UserRow.js
import React from 'react';

const UserRow = ({ item, isCheckboxChecked, toggleCheckbox, editMode, editedUser, updatehandler, saveHandler, cancelHandler, deletehandler,setEditedUser }) => {
  return (
    <>
    <tr key={item.id} style={{ background: isCheckboxChecked(item.id) ? '#ccc' : 'none' }}>
    <td><input type="checkbox" checked={isCheckboxChecked(item.id)} onChange={() => toggleCheckbox(item.id)} /></td>
    <td>
      {editMode && editedUser.id === item.id ? (
        <input
          type="text"
          className="input-name"
          value={editedUser.name}
          onChange={(e) =>
            setEditedUser({ ...editedUser, name: e.target.value })
          }
        />
      ) : (
        <span>{item.name}</span>
      )}
    </td>
    <td>
      {editMode && editedUser.id === item.id ? (
        <input
          type="text"
          className="input-name"
          value={editedUser.email}
          onChange={(e) =>
            setEditedUser({ ...editedUser, email: e.target.value })
          }
        />
      ) : (
        <span>{item.email}</span>
      )}
    </td>
    <td>
      {editMode && editedUser.id === item.id ? (
        <input
          type="text"
          className="input-name"
          value={editedUser.role}
          onChange={(e) =>
            setEditedUser({ ...editedUser, role: e.target.value })
          }
        />
      ) : (
        <span>{item.role}</span>
      )}
    </td>

    <td>
      <button className="btn btn-primary" onClick={() => updatehandler(item.id)} disabled={!isCheckboxChecked(item.id) || editMode}> <i className="fa fa-edit"></i></button>
      {editMode && editedUser.id === item.id && (
        <>
          <button className="btn btn-success" onClick={saveHandler}>
            Save
          </button>
          <button className="btn btn-warning" onClick={cancelHandler}>
            Cancel
          </button>
        </>
      )}
      <button className="btn btn-danger" onClick={() => deletehandler(item.id)} disabled={!isCheckboxChecked(item.id)}> <i className="fa fa-trash"></i></button>
    </td>
  </tr>
    </>
  );
};

export default UserRow;
