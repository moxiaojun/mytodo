export default class TodoModel {
    constructor(){
        //向localsStorage里面写入的时候需要这个key
        this.STORE_KEY = 'todos';
        this.todos = localStorage.getItem(this.STORE_KEY)?JSON.parse(localStorage.getItem(this.STORE_KEY)):[];//存放所有的todos
        //这里可以注册监听器，当模型数据发生改变之后会调用这些监听
        this.listeners=[];
    }
    //订阅
    subscribe(listener){
        this.listeners.push(listener);
    }
    //执行监听函数
    emit(){
        this.listeners.forEach(listener=>listener());
    }
    addTodo = (todo)=>{
        todo = Object.assign({},{id:Math.random(),completed:false},todo);//ES5
        let todos = this.todos;
        todos.push(todo);
        localStorage.setItem(this.STORE_KEY,JSON.stringify(todos));
        this.emit();
    }
}