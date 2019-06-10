import './App.css';
import React, {Component} from 'react';
import { data } from './dataConstant';


class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        items: data,
        orderItems: [],
      } // {data: data}
    }
   remove(event, target) {
event.preventDefault();
const newItems = this.state.items.filter(item => item.id !== target.id);
this.setState({items: newItems})
  }
  add(newItem) {
    const newOrderItems = [...this.state.orderItems, newItem];
    const newItems = this.state.items.map(item => {
      if (item.id === newItem.id) {
        const newAvailability = item.availability-1;
        return {...item, availability: newAvailability};
      }
      return item;
    });
    this.setState({ orderItems: newOrderItems, items: newItems });
  }
  render() {
   const total = this.state.orderItems.reduce((total, {itemPrice}) => total += itemPrice, 0);
    return (
      <div>
        <div id='menu'>
        <img src="/logo/logo_copy.png" />
        <u><h1> Menu </h1></u>
          {this.state.items.map(item => {
      	 if (!item.availability || item.availability == 0) {
    		return (<div>
              SOLD OUT, SORRY
            </div>);
    	} else {
          return (<div>
              <p key={item.id}><img src={'imgs/'+item.imgName}/><strong>{item.itemName}</strong> ${item.itemPrice} <br/> {item.description}</p>

              <button onClick={() => this.add(item)}>
                      add
                    </button>
          </div>)}
        })}
        }

    </div>
<div id="order">
    <u><h1> Order </h1></u>
    {this.state.orderItems.map(item => (
          <p key={item.id}><strong>{item.itemName}</strong> ${item.itemPrice}</p>
          ))}
    <h2> total: {total} </h2>
</div>
<div id="inventory">
 <u><h1> Inventory </h1></u>
        {this.state.items.map(item => (
          <div>
            <p key={item.id}>{item.itemName} ${item.itemPrice} {item.availability} <br />img: {item.imgName}</p>
            <button onClick={(event) => this.remove(event,item)}>
            Remove
          </button>
            </div>
        ))}
</div>
      </div>
    );
  }
}

export default App;