import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import TodoHeader from './TodoHeader'
import TodoItem from './TodoItem'

export default class TodoApp extends Component{
    constructor(props){
        super(props);//父类的钩子函数
        this.state = {
            todos:[
                {id:Date.now(),title:'今天学写React实例',completed:false}
            ]
        };//初始化默认状态
    }
    addTodo = (todo)=>{
        todo = Object.assign({},{id:Date.now(),completed:false},todo);//ES5
        let todos = this.state.todos;
        todos.push(todo);
        this.setState({todos});
    }
    render(){
        let main = (
            <ul className="list-group">
                {
                    this.state.todos.map((todo,index)=><TodoItem key={index} todo={todo}/>)
                }
            </ul>
        );
        return (
            <div className="container" style={{marginTop:'20px'}}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="pannel pannel-default">
                            <div className="pannel-heading">
                                <TodoHeader addTodo={this.addTodo}/>
                            </div>
                            <div className="pannel-body">
                                {main}
                            </div>
                            <div className="pannel-footer"></div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}