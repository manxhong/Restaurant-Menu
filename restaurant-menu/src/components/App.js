import React from 'react';
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'
import base from '../base'

class App extends React.Component {

    constructor(){
        super();
        this.state={
            fishes:{},
            order:{}
        }
        this.AddFish = this.AddFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.AddOrder = this.AddOrder.bind(this);
    }

    componentWillMount(){
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`,
        {
            context: this,
            state: 'fishes'
    })
    }

    componentWillUnmount(){
        base.removeBinding(this.ref); 
    }

    AddFish(fish){
        const fishes = {...this.state.fish};
        const timeStamp = Date.now();
        fishes[`fish-${timeStamp}`] = fish;
        this.setState({fishes: fishes});
    }

    loadSamples(){
        this.setState({
            fishes: sampleFishes
        })
    }

    AddOrder(key){
        const order = {...this.state.order};
        order[key] = order[key] + 1 || 1;
        this.setState(
            {order}
        );
    }

    render(){
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header age="5000" yes={true} tagline="Fresh Seafood Market"/>
                    <ul className="list">
                        {Object
                            .keys(this.state.fishes)
                            .map(key => <Fish 
                            key={key}
                            index={key}
                            details={this.state.fishes[key]}
                            AddOrder={this.AddOrder}/>)}
                    </ul>
                </div>
                <Order order={this.state.order} fishes={this.state.fishes}/> 
                <Inventory AddFish={this.AddFish} loadSamples={this.loadSamples}/>
            </div>
        )
    }
}

export default App;