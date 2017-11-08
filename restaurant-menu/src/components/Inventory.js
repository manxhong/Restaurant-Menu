import React from 'react';
import AddFishForm from './AddFishForm'

class Inventory extends React.Component{
    constructor(){
        super();
        this.renderInventory = this.renderInventory.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, key){
        const fish = this.props.fishes[key];
        const updateFish = {...fish, 
         [e.target.className] : e.target.value   
        }
        this.props.UpdateFish(key, updateFish);
    }

    renderInventory(key){
        const fish = this.props.fishes[key];
        return (
            <div className="fish-edit" key={key}>
                <input type="text" className="name" value={fish.name} placeholder="Fish Name" onChange={(e) =>this.handleChange(e, key)}/>
                <input type="text" className="price" value={fish.price} placeholder="Fish Price" onChange={(e) =>this.handleChange(e, key)}/>
                <select type="text" className="status" value={fish.status} placeholder="Fish Status" onChange={(e) =>this.handleChange(e, key)}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea type="text" className="desc" value={fish.desc} placeholder="Fish Desc" onChange={(e) =>this.handleChange(e, key)}/>
                <input type="text" className="image" value={fish.image} placeholder="Fish Image" onChange={(e) =>this.handleChange(e, key)}/>
                <button onClick={()=> this.props.RemoveFish(key)}>Remove Fish</button>
            </div>
        );
    }

    render(){
        const fishes = Object.keys(this.props.fishes);
        return(
            <div>
                <h2>Inventory</h2>
                {fishes.map((key)=>this.renderInventory(key))}
                <AddFishForm AddFish={this.props.AddFish}/>
                <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
            </div>
            
        )
    }
} 

Inventory.propTyepes = {
    UpdateFish: React.PropTypes.func.isRequired,
    AddFish: React.PropTypes.func.isRequired,
    loadSamples: React.PropTypes.func.isRequired,
    RemoveFish: React.PropTypes.func.isRequired,
    fishes: React.PropTypes.object.isRequired
}

export default Inventory;