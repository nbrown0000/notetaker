import React from 'react'

const ActiveList = ({ activeTitle, activeList, onClickActiveListItem }) => {
  const activeListStyle = {
    "background": "#FFF"
  }

  return (
    <section className="main__activelist">
      <h2>{activeTitle}</h2>
      <ul style={activeListStyle}>
        {activeList.length === 0 ?
          <></>
        :
          activeList.map((item,i) => {
            return (
              <li
                key={i}
                className="main__activelist-item"
                onClick={() => onClickActiveListItem(item.id)}
              >
                {item.name}
              </li>)
          })
        }
      </ul>
    </section>
  )
}

export default ActiveList