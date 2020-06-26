import React from 'react';
import "./Main.css";
import calendarIcon from "./icons/011-planner.png";

class Main extends React.Component {// = ({ collection, activeList, onCollectionClicked }) => {
  
  render () {

    const activeListStyle = {
      "background": "#FFF"
    }
    
    const {
      activeList,
      collection,
      onCollectionClicked
    } = this.props;

    

    // console.log('activeList', activeList)

    return (

      <main className="main">

        <div className="main__heading">
          <h2 className="main__heading-title">Lists</h2>
          <div className="main__heading-add">
            <p className="main__heading-add-symbol">+</p>
            {/* <p className="main__heading-add-text">Add List</p> */}
          </div>
        </div>

        <ul className="main__collection">
          {collection === '' ?
            <></> :
          collection.map((item,i) => {
            return (
              <li key={i} className="main__collection-item" onClick={() => onCollectionClicked(item.id)}>
                <img alt="item" src={calendarIcon} width="15em" />
                {item.name}
              </li>)
          })}
        </ul>

        <ul style={activeListStyle} className="main__activelist">
          {activeList.length === 0 ?
            <></>
          :
            activeList.map((item,i) => {
              return (
                <li className="main__activelist-item" key={i}>
                  {item.name}
                </li>)
            })
          }
        </ul>

        <section className="main__completed">
          <ul className="main__completed-list"><li>Completed</li></ul>
        </section>
        
      </main>
  )
      }
}

export default Main;