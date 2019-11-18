import React, { Component, Fragment } from 'react';
import axios from 'axios';
import TodoItem from "./TodoItem";

class TodoList extends Component{
		//constructor构造函数最优先执行
    constructor(props){
				//super指父类--Component，调用父类的构造函数
				super(props);
				//react中定义数据要定义在状态中
		//当组件的state或者props发生改变的时候，render函数就会重新执行
        this.state = {
            inputValue : '',
			//页面通过list这个数组渲染的
            list : []
        }
    }

    //当父组件的render函数被运行时，他的子组件的render函数全都将被执行一次
    render(){
        return(
            <Fragment> {/*外部大的包裹，不影响页面，占位符*/}
                <div>
                    {/* 调用原生js方法要在外面加上花括号 */}
									<input 
									//input框中的值
                    value = {this.state.inputValue}
                    onChange = {this.handleInputChange.bind(this)}
                  />
                  <button onClick={this.handleBtnClick.bind(this)}>提交</button>
								</div>
								<ul>
									{
										//item 为要展示的数据项
										this.state.list.map((item, index) => {
											return (
											<div key = {index}>{/*父组件向子组件传值通过属性的方式完成*/}
											<TodoItem
												content = {item}
												index = {index}
												deleteItem = {this.handleItemDelete.bind(this)}
											/>
											{/*<li key={index} */}
											{/*	onClick={this.handleItemDelete.bind(this,index)}*/}
											{/*	//存在被xss攻击的可能*/}
											{/*	dangerouslySetInnerHTML = {{__html: item}}*/}
											{/*>*/}
											{/*</li>*/}
											</div>
										)}
										)
									}
								</ul>
            </Fragment>
        )
    }

    componentDidMount() {
    	axios.get('http://localhost:3000/api/todolist')
			.then(() => {alert('succ')})
			.catch(() => {alert('error')})
	}

	handleInputChange(e){
        this.setState({
            inputValue : e.target.value
				})
				//e.target对应input框的DOM节点
        // console.log(e.target.value);
		}
		
		handleBtnClick(){
			this.setState({
				list : [...this.state.list, this.state.inputValue],
				inputValue : ''
			})
		}

		handleItemDelete(index){
			//immutable  
			//state 不允许我们做任何改变，会影响性能优化
			//list为list.state.list的一个拷贝
			const list = [...this.state.list];
			list.splice(index,1);
			this.setState({
				list: list
			});
			// console.log(index);
		}
}

export default TodoList;