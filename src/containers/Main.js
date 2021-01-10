import React from 'react';
import "./Main.css";
import Header from "../components/Header";
import Lists from "./Lists";
import Notes from "./Notes";
import Footer from "../components/Footer";
import { setView } from "../actions"
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    view: state.view,
    user: state.user,
    window: state.window
  };
}

class ConnectedMain extends React.Component {
  render () {
    const window = this.props.window;
    const view = this.props.view;

    return (
      <main className="main">
        {
          window.width > 480 ?
          <>
            <Header onClickAddList={this.onClickAddList} />
            <Lists />
            <Notes />
            <Footer />
          </>
          : view === 'lists' ?
            <>
              <Header onClickAddList={this.onClickAddList} />
              <Lists />
              <Footer />
            </>
          :
            <Notes />
        }
      </main>
    )
  }
}

const Main = connect(mapStateToProps, {setView})(ConnectedMain);

export default Main;