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
    //保存并且通知更新
    notify = (todos)=>{
        localStorage.setItem(this.STORE_KEY,JSON.stringify(todos));
        this.todos = todos;
        this.emit();
    }
    addTodo = (todo)=>{
        todo = Object.assign({},{id:Math.random(),completed:false},todo);//ES5
        let todos = this.todos;
        todos.push(todo);
        this.notify(todos);
    }
    toggle = (id)=>{
        let todos = this.todos;
        todos.map(todo=>{
            if (todo.id===id){
                todo.completed = !todo.completed;
            }
            return todo
        });
        this.notify(todos);
    }
    removeTodo = (id)=>{
        let todos = this.todos;
        let index = todos.findIndex(todo=>todo.id===id);
        todos.splice(index,1);
        this.notify(todos);
    }

    toggleAll = (event)=>{
        let checked = event.target.checked;
        let todos = this.todos;
        todos.map(todo=>{
            todo.completed = checked;
            return todo;
        });
        this.notify(todos);
    }
    clearCompleted = ()=>{
        let todos = this.todos;
        todos = todos.filter(todo=>!todo.completed);
        this.notify(todos);
    }
}