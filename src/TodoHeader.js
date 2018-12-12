import React,{Component} from 'react';
const ENTRY_KEY = 13;
export default class TodoHeader extends Component{
    handleKeyDown = (event)=>{
        if(event.keyCode === ENTRY_KEY){
            let title = event.target.value;
            this.props.addTodo({title})
            event.target.value = '';
        }
    }
    render(){
        return (
            <div className = "form-group" >
                <input autoFocus={true} onKeyDown={this.handleKeyDown} type="text" className="form-control"/>
            </div>
        )
    }
}