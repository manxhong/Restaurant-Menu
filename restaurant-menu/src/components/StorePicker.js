import React from 'react';
import {getFunName} from '../helpers'

class StorePicker extends React.Component {

    gotoStore (event){
        event.preventDefault();
        console.log(this.storeInput.value);
        const storeId = this.storeInput.value
        this.context.router.transitionTo(`store/${storeId}`);
    }   

    render(){
        return (
            <form className="store-selector" onSubmit={this.gotoStore.bind(this)}>
                <h2>Please Enter a Store</h2>
                <input type="text" required placeholder="Store Name" defaultValue={
                    getFunName()} ref={(input)=>{this.storeInput=input}}/>
                <button type="submit">Visit Store</button>
            </form>
        )
    }
}

StorePicker.contextTypes = {
    router: React.PropTypes.object
}

export default StorePicker;