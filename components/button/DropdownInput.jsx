import React, { useState } from "react";
import { InputGroup, DropdownButton, Dropdown, FormControl } from "react-bootstrap";
import styles from './DropdownInput.module.css'

function DropdownWithInput({ title, action1, action2, action3, add, placeholder, onChange }) {
 const [selectedValue, setSelectedValue] = useState(title);
 const [inputValue, setInputValue] = useState("");

 const handleInputChange = (input) => {
    console.log("Input value:", input);
    setInputValue(input);
    if (onChange) {
      onChange(input);
    }
 };

 const handleDropdownItemSelect = (selectedValue) => {
    setSelectedValue(selectedValue);
    handleInputChange(selectedValue);
 };

 return (
    <InputGroup className={styles.button}>
      <DropdownButton
        title={selectedValue}
        id="input-group-dropdown-1"
        variant="secondary"
      >
        <Dropdown.Item onClick={() =>handleDropdownItemSelect(action1)}>
          {action1}
        </Dropdown.Item>
        <Dropdown.Item onClick={() =>handleDropdownItemSelect(action2)}>
          {action2}
        </Dropdown.Item>
        <Dropdown.Item onClick={() =>handleDropdownItemSelect(action3)}>
          {action3}
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() =>handleDropdownItemSelect(add)}>
          {add}
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