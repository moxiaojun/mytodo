import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import TodoHeader from './TodoHeader'
import TodoItem from './TodoItem'
import TodoFooter from './TodoFooter'
import * as filterTypes from './filter-types'

export default class TodoApp extends Component{
    constructor(props){
        super(props);//父类的钩子函数
        this.state = {
            filterType:filterTypes.ALL
        };//初始化默认状态
    }
    changeFilterType = (filterType)=>{
        this.setState({filterType})
    }
    render(){
        let todos = this.props.model.todos;
        let activeTodoCount = todos.reduce((count,todo)=>count+(todo.completed?0:1),0);//count 计算结束后的返回值。
        let completedTodoCount = todos.reduce((count,todo)=>count+(!todo.completed?0:1),0);//count 计算结束后的返回值。
        let showTodos = todos.filter((todo)=>{
            switch (this.state.filterType){
                case filterTypes.ACTIVE://要显示未完成的
                    return !todo.completed;
                case filterTypes.COMPLETED://要显示完成的
                    return todo.completed;
                default:
                    return true;
            }
        })
        let main = (
            <ul className="list-group">
                {
                    todos.length>0?<li className="list-group-item"><input type="checkbox" onChange={this.props.model.toggleAll} checked={activeTodoCount===0}/>{activeTodoCount===0?'全部取消':'全部选中'}</li>:''
                }
                {
                    showTodos.map((todo,index)=><TodoItem key={index} todo={todo} toggle={this.props.model.toggle} removeTodo={this.props.model.removeTodo}/>)
                }
            </ul>
        );
        return (
            <div className="container" style={{marginTop:'20px'}}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <TodoHeader addTodo={this.props.model.addTodo}/>
                            </div>
                            <div className="card-body">
                                {main}
                            </div>
                            <div className="card-footer">
                                <TodoFooter activeTodoCount={activeTodoCount}
                                            changeFilterType={this.props.model.changeFilterType}
                                            filterType={this.state.filterType}
                                            clearCompleted={this.props.model.clearCompleted}
                                            completedTodoCount={completedTodoCount}
                                ></TodoFooter>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}