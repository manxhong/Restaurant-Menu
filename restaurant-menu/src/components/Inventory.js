import React from 'react';
import AddFishForm from './AddFishForm'; 
import base from '../base';

class Inventory extends React.Component{
    constructor(){
        super();
        this.renderInventory = this.renderInventory.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.logout = this.logout.bind(this);

        this.state = {
            uid: null,
            owner: null
        }
    }

    componentDidMount(){
        base.onAuth((user)=>{
            if(user){
                this.authHandler(null, {user});
            }
        })
    }

    handleChange(e, key){
        const fish = this.props.fishes[key];
        const updateFish = {...fish, 
         [e.target.className] : e.target.value   
        }
        this.props.UpdateFish(key, updateFish);
    }

    authenticate(provider){
        console.log(`Trying to login with ${provider}`);
        base.authWithOAuthPopup(provider, this.authHandler);
    }

    authHandler(err, authData){
        // console.log(authData);
        if(err){
            console.error(err);
            return;
        }
        //grab the store info
        const storeRef = base.database().ref(this.props.storeId);

        //query the firebase once for the store data
        storeRef.once('value', (snapshot)=>{
           const data = snapshot.val() || {};
           
           //claim it as own if there is no owner
           if(!data.owner){
               storeRef.set({
                 owner: authData.user.uid
               });
           }

           this.setState({
               uid: authData.user.uid,
               owner: data.owner || authData.user.id
           });
        });
    }

    logout(){
        base.unauth();
        this.setState({
            uid: null
        })
    }

    renderLogin(){
        return (
            <nav className="login">
                <h2>Inventory</h2>
                <p>Sign in to manage your store's inventory</p>
                <button className="github" onClick={() => this.authenticate('github')}>Log In with Github </button>
                <button className="facebook" onClick={() => this.authenticate('facebook')}>Log In with Facebook</button>
                <button className="twitter" onClick={() => this.authenticate('twitter')}>Log In with Twitter</button>
            </nav>            
        )
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
        const logout = <button onClick={this.logout}>Log Out!</button>
        const fishes = Object.keys(this.props.fishes);
        //check if they are no logged in at all
        if(!this.state.uid){
            return(
                <div>{this.renderLogin()}</div>
            )
        }

        //ch'eck if they are the owner of the store
        if(this.state.uid!==this.state.owner){
            return(
                <div>
                    <p>Sorry! You aren't the owner of this store</p>
                    {logout}
                </div>
            )
        }

        return(
            <div>
                <h2>Inventory</h2>
                {logout}
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
    fishes: React.PropTypes.object.isRequired,
    storeId: React.PropTypes.string.isRequired
}

export default Inventory;