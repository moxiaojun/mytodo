import React,{Component} from 'react';
export default class TodoItem extends Component{
    render(){
        let todo=this.props.todo;
        return (
            <li className="list-group-item">
                <div className="row">
                    <div className="col-md-1">
                        <input onChange={()=>this.props.toggle(todo.id)} type="checkbox" checked={todo.completed}/>
                    </div>
                    <div className="col-md-10" style={{textDecoration:todo.completed?'line-through':''}}>
                        {todo.title}
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-danger btn-xs" onClick={()=>this.props.removeTodo(todo.id)}>X</button>
                    </div>
                </div>
            </li>
        )
    }
}