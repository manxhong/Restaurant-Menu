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
        this.UpdateFish = this.UpdateFish.bind(this);
        this.RemoveFish = this.RemoveFish.bind(this);
        this.RemoveOrder = this.RemoveOrder.bind(this);
    }

    componentWillMount(){
        //check before the <App> is render and run the firebase
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`,
        {
            context: this,
            state: 'fishes'
        });

        //check if there is any order in localstorage
        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
        console.log(localStorageRef)
        if (localStorageRef){
            this.setState({
                order:JSON.parse(localStorageRef)
            });
        }
    }

    componentWillUnmount(){
        base.removeBinding(this.ref); 
    }

    componentWillUpdate(nextProps, nextState){
        localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
    }

    AddFish(fish){
        const fishes = {...this.state.fish};
        const timeStamp = Date.now();
        fishes[`fish-${timeStamp}`] = fish;
        this.setState({fishes: fishes});
    }

    UpdateFish(key, updatedFish){
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({
            fishes
        });
    }

    RemoveFish(key){
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.setState({
            fishes
        });
    }

    RemoveOrder(key){
        const order = {...this.state.order};
        delete order[key];
        this.setState({
            order
        });
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
                <Order 
                    order={this.state.order} 
                    fishes={this.state.fishes}
                    RemoveOrder={this.RemoveOrder}
                /> 
                <Inventory 
                    RemoveFish={this.RemoveFish} 
                    UpdateFish={this.UpdateFish} 
                    fishes={this.state.fishes} 
                    AddFish={this.AddFish} 
                    loadSamples={this.loadSamples}
                    storeId={this.props.params.storeId}
                />
            </div>
        )
    }
}

App.propTypes = {
    params: React.PropTypes.object.isRequired
}

export default App;