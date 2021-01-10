import React from 'react';

const AddList = () => {
  return (
    <ul className="lists__add">
      <li className="lists__add-item">
        {/* <img src={plusIcon} alt="add" /> */}
        <input
          // value={this.state.itemToAdd}
          // style={inputStyle}
          // onChange={this.handleItemChange}
          placeholder="Add a List"
          type="text"
          // onKeyUp={this.onInputKeypress.bind(this)}
        />
        <button
          // onClick={() => this.onInputButton()}
        >Add</button>
      </li>
    </ul>
  )
}

export default AddList;