import React,{Component} from 'react';
import * as filterTypes from './filter-types'
export default class TodoFooter extends Component{
    render(){
        let {activeTodoCount,filterType,completedTodoCount} = this.props;
        return (
            <div className="row">
                <div className="col-sm-4 text-center">
                    {
                        activeTodoCount > 0 ? <div>还有<span className="badge badge-pill badge-primary">{activeTodoCount}</span>件待办事项</div>:null
                    }

                </div>
                <div className="col-sm-5 text-center">
                    <button style={{marginRight:'4px'}}
                            type="button"
                            className={`btn ${filterType === filterTypes.ALL ? 'btn-success' : 'btn-default'} btn-sm`}
                            onClick={()=>this.props.changeFilterType(filterTypes.ALL)}
                    >全部</button>
                    <button style={{marginRight:'4px'}}
                            type="button"
                            className={`btn ${filterType === filterTypes.ACTIVE ? 'btn-success' : 'btn-default'} btn-sm`}
                            onClick={()=>this.props.changeFilterType(filterTypes.ACTIVE)}
                    >未完成</button>
                    <button type="button"
                            className={`btn ${filterType === filterTypes.COMPLETED ? 'btn-success' : 'btn-default'} btn-sm`}
                            onClick={()=>this.props.changeFilterType(filterTypes.COMPLETED)}
                    >已完成</button>
                </div>
                <div className="col-sm-3 text-center">
                    {
                        completedTodoCount > 0 ? <button type="button"
                            className="btn btn-danger btn-sm"
                            onClick={this.props.clearCompleted}
                            >删除已完成</button>:null

                    }

                </div>
            </div>
        )
    }
}