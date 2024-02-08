import React, { useState } from 'react';
import { Dropdown, FormControl } from 'react-bootstrap';

const FilterDropdown = ({ options }) => {
  const [filterText, setFilterText] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleFilterChange = (e) => {
    const searchText = e.target.value;
    setFilterText(searchText);

    const filtered = options.filter((option) =>
      option.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredOptions(filtered);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setFilterText('');
  };

  // Custom style for the dropdown
  const dropdownStyle = {
    backgroundColor: 'ash', // You can replace 'ash' with your desired color
  };

  return (
    <Dropdown style={dropdownStyle}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {selectedOption ? selectedOption : 'Select an option'}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter"
          onChange={handleFilterChange}
          value={filterText}
        />
        {filteredOptions.map((option, index) => (
          <Dropdown.Item
            key={index}
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default FilterDropdown;
