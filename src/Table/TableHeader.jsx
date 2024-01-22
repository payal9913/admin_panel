// TableHeader.js
import React from 'react';

const TableHeader = ({ isAllChecked, toggleAllCheckboxes, columnTitles }) => {
  return (
    <thead>
      <tr>
        <th>
          <input type="checkbox" checked={isAllChecked} onChange={toggleAllCheckboxes} />
        </th>
        {columnTitles.map((title) => (
          <th key={title}>{title}</th>
        ))}
        <th>Action</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
