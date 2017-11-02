import React from 'react';

class AddFishForm extends React.Component{

    AddFish(event){
        event.preventDefault();
        console.log('add');

        const fish={
            name: this.name.value,
            price: this.price.value,
            status: this.status.value,
            desc: this.desc.value,
            image: this.image.value
        }
        this.props.AddFish(fish);
        this.form.reset();
    }

    render(){
        return(
            <form className="fish-edit" ref={(input)=>{this.form = input}} onSubmit={this.AddFish.bind(this)}>
                <input ref={(input)=> {this.name= input}} type="text" placeholder="Fish Name"/>
                <input ref={(input)=> {this.price= input}} type="text" placeholder="Fish Price"/>
                <select ref={(input)=> {this.status= input}}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea ref={(input)=> {this.desc = input}} placeholder="Fish Desc"></textarea>
                <input ref={(input)=> {this.image = input}} type="text" placeholder="Fish Image"/>
                <button type="submit">+ Add Item</button>
            </form>
        )
    }
} 

export default AddFishForm;