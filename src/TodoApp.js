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
            todos:[],
            filterType:filterTypes.ALL
        };//初始化默认状态
    }
    addTodo = (todo)=>{
        todo = Object.assign({},{id:Math.random(),completed:false},todo);//ES5
        let todos = this.state.todos;
        todos.push(todo);
        this.setState({todos});
    }
    removeTodo = (id)=>{
        let todos = this.state.todos;
        let index = todos.findIndex(todo=>todo.id===id);
        todos.splice(index,1);
        this.setState({todos});
    }
    toggle = (id)=>{
        let todos = this.state.todos;
        todos.map(todo=>{
            if (todo.id===id){
                todo.completed = !todo.completed;
            }
            return todo
        });
        this.setState({todos});
    }
    toggleAll = (event)=>{
        let checked = event.target.checked;
        let todos = this.state.todos;
        todos.map(todo=>{
            todo.completed = checked;
            return todo;
        });
        this.setState({todos});
    }
    changeFilterType = (filterType)=>{
        this.setState({filterType})
    }
    clearCompleted = ()=>{
        let todos = this.state.todos;
        todos = todos.filter(todo=>!todo.completed);
        this.setState({todos});
    }
    render(){
        let todos = this.state.todos;
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
                    todos.length>0?<li className="list-group-item"><input type="checkbox" onChange={this.toggleAll} checked={activeTodoCount===0}/>{activeTodoCount===0?'全部取消':'全部选中'}</li>:''
                }
                {
                    showTodos.map((todo,index)=><TodoItem key={index} todo={todo} toggle={this.toggle} removeTodo={this.removeTodo}/>)
                }
            </ul>
        );
        return (
            <div className="container" style={{marginTop:'20px'}}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <TodoHeader addTodo={this.addTodo}/>
                            </div>
                            <div className="card-body">
                                {main}
                            </div>
                            <div className="card-footer">
                                <TodoFooter activeTodoCount={activeTodoCount}
                                            changeFilterType={this.changeFilterType}
                                            filterType={this.state.filterType}
                                            clearCompleted={this.clearCompleted}
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