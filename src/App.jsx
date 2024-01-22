import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserError, fetchUserSuccess, deleteuser, updateuser } from './userslice';
import SearchBar from './SearchBar';
import TableHeader from './TableHeader';
import TableBody from './Table';
import Pagination from './Pagination';
import Table from './Table';
import './app.css'

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const error = useSelector((state) => state.user.error);

  const [selectedIds, setSelectedIds] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [columnTitles, setColumnTitles] = useState([]);

  useEffect(() => {
    axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then((result) => {
        const users = result.data;
        const firstUser = users[0] || {};
        const titles = Object.keys(firstUser).slice(1);
        setColumnTitles(titles);
        dispatch(fetchUserSuccess(users));
      })
      .catch((err) => dispatch(fetchUserError(err.message)));
  }, [dispatch]);

  useEffect(() => {
    if (isAllChecked) {
      setSelectedIds(user.map((item) => item.id));
    } else {
      setSelectedIds([]);
    }
  }, [isAllChecked, user]);

  const toggleCheckbox = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds((prevIds) => prevIds.filter((prevId) => prevId !== id));
    } else {
      setSelectedIds((prevIds) => [...prevIds, id]);
    }
  };

  const toggleAllCheckboxes = () => {
    setSelectedIds((prevIds) => {
      const allOnCurrentPageChecked = currentItems.every((item) => prevIds.includes(item.id));

      if (!allOnCurrentPageChecked) {
        // If not all checkboxes on the current page are selected, select them
        return [...new Set([...prevIds, ...currentItems.map((item) => item.id)])];
      } else {
        // If all checkboxes on the current page are selected, deselect them
        return prevIds.filter((id) => !currentItems.some((item) => item.id === id));
      }
    });
  };

  const updatehandler = (id) => {
    setEditMode(true);
    const userToUpdate = user.find((item) => item.id === id);
    setEditedUser(userToUpdate);
  };

  const saveHandler = () => {
    // Dispatch an action to update the user in the Redux store
    dispatch(updateuser({ id: editedUser.id, ...editedUser }));

    setEditMode(false);
    setEditedUser({});
  };

  const cancelHandler = () => {
    setEditMode(false);
    setEditedUser({});
  };

  const deletehandler = (id) => {
    dispatch(deleteuser(id));
    setSelectedIds((prevIds) => prevIds.filter((prevId) => prevId !== id));
  }

  const isCheckboxChecked = (id) => selectedIds.includes(id) && currentItems.some(item => item.id === id);

  const deleteSelectedHandler = () => {
    // Dispatch an action to delete selected users
    selectedIds.forEach((id) => dispatch(deleteuser(id)));
    setSelectedIds([]);
    setIsAllChecked(false);
  };

  const filteredUsers = user.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="main">
        <div className="conatiner">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery} />
          <Table
            isAllChecked={isAllChecked}
            toggleAllCheckboxes={toggleAllCheckboxes}
            columnTitles={columnTitles}
            currentItems={currentItems}
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
          <div className="pagination">
            <button className='btn-del' onClick={() => deleteSelectedHandler()}>Delete selected</button>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
              deleteSelectedHandler={deleteSelectedHandler} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
