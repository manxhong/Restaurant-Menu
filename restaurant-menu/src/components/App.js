import React from 'react';
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'

class App extends React.Component {

    constructor(){
        super();
        this.state={
            fishes:{},
            order:{}
        }
        this.AddFish = this.AddFish.bind(this);
    }

    AddFish(fish){
        const fishes = {...this.state.fish};
        const timeStamp = Date.now();
        fishes[`fish-${timeStamp}`] = fish;
        this.setState({fishes: fishes});
    }

    render(){
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header age="5000" yes={true} tagline="Fresh Seafood Market"/>
                </div>
                <Order /> 
                <Inventory AddFish={this.AddFish} />
            </div>
        )
    }
}

export default App;