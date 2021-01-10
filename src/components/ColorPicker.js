import React from 'react';
// import "./ColorPicker.css"
import setNoteBg from "../containers/Notes";

class ColorPicker extends React.Component {
  constructor() {
    super()
    this.state = {
      background: '#000'
    }
  }

  onBackgroundChange = (event) => {
    this.setState({ background: event.target.value })
    this.props.setNoteBg(event.target.value)
  }

  render() {
    const containerStyle = {
      background: this.state.background,
      border: "none"
    }
    const inputStyle = {
      border: "none",
      margin: 0,
      padding: 0,
      width: "20px",
      height: "20px"
    }

    return (
      <div className="colorPicker" style={containerStyle}>
        <input onChange={this.onBackgroundChange} type="color" style={inputStyle} />
      </div>
    )
  }
}

export default ColorPicker;