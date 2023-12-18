import React, { useState, useEffect } from "react";
import { InputGroup, DropdownButton, Dropdown, FormControl } from "react-bootstrap";
import styles from './DropdownInput.module.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function DropdownWithInput({ title, action1, action2, action3, action4, add, placeholder, onChange, selectedValue }) {
 const [inputValue, setInputValue] = useState("");
 const [selectedCategory, setSelectedCategory] = useState("");

 // Update input value when the selectedValue prop changes
 useEffect(() => {
    setInputValue(selectedValue || "");
 }, [selectedValue]);

 const handleInputChange = (input) => {
    setInputValue(input);
    if (onChange) {
      onChange(input);
    }
 };

 const handleDropdownItemSelect = (selectedValue) => {
    handleInputChange(selectedValue);
 };

 const handleAddCategory = () => {
  MySwal.fire({
    title: 'Adicionar algo novo',
    input: 'text',
    inputPlaceholder: 'Digite um campo novo',
    showCancelButton: true,
    confirmButtonText: 'Adicionar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#009C86',
    preConfirm: (newCategory) => {
      // Handle the new category
      console.log('Nova categoria:', newCategory);
      // You can add additional logic here, e.g., send the new category to the server
      setSelectedCategory(newCategory);
      handleInputChange(newCategory); // Update the input field with the new category
    },
  });
};


 return (
    <InputGroup className={styles.button}>
      <DropdownButton
        title={selectedValue || title}
        id="input-group-dropdown-1"
        variant="secondary"
      >
        <Dropdown.Item onClick={() => handleDropdownItemSelect(action1)}>
          {action1}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleDropdownItemSelect(action2)}>
          {action2}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleDropdownItemSelect(action3)}>
          {action3}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleDropdownItemSelect(action4)}>
          {action4}
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleAddCategory}>
          Adicionar
        </Dropdown.Item>
      </DropdownButton>
      <FormControl
        aria-label="Text input with dropdown button"
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder={placeholder}
      />
    </InputGroup>
 );
}

export default DropdownWithInput;
