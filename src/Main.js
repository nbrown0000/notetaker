import React from 'react';
import "./Main.css";
import ActiveList from "./ActiveList";
import Collection from "./Collection";

class Main extends React.Component {// = ({ collection, activeList, onCollectionClicked }) => {
  constructor(props) {
    super(props)
    this.state = {
      route: 'collection',
      activeTitle: ''
    }
  }

  onCollectionClicked = (item) => {
    this.props.onCollectionClicked(item.id);
    this.setState({
      route: 'activeList',
      activeTitle: item.name
    });
  }
  
  render () {
    
    const {
      activeList,
      collection,
      onClickActiveListItem
    } = this.props;

    return (

      <main className="main">

        {/* <div className="main__heading">
          <h2 className="main__heading-title">Lists</h2>
          <div className="main__heading-add">
            <p className="main__heading-add-symbol">+</p>
            <p className="main__heading-add-text">Add List</p>
          </div>
        </div> */}

        {
          this.state.route === 'collection' ?
            <Collection
              collection={collection}
              onCollectionClicked={this.onCollectionClicked}
            />
          :
            <ActiveList
              activeTitle={this.state.activeTitle}
              activeList={activeList}
              onClickActiveListItem={onClickActiveListItem}
            />
        }
        
      </main>
  )
      }
}

export default Main;