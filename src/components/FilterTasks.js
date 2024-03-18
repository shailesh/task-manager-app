// src/components/FilterTasks.js
import React from 'react';
import { TASK_STATUSES } from '../utils/constants';

const FilterTasks = ({ handleFilter }) => {
  return (
    <div>
      <select onChange={(e) => handleFilter(e.target.value)}>
        <option value="All">All</option>
        {TASK_STATUSES.map((status) => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterTasks;
