import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends  Component{
    constructor(props){
        super(props);
        //节约性能
        this.handleClick= this.handleClick.bind(this);
    }
    shouldComponentUpdate(nextProps,nextState) {
        //优化性能
        if(nextProps.content !== this.props.content){
            return  true;
        }else{
            return true;
        }
    }

    render() {
        console.log('change');
        const { content , test} = this.props;
         //子组件通过this.props.属性名 ==接收值
         //this.props.content为接收的父组件的传的值
         return (
             <div   onClick={this.handleClick}>
                 {test}-{content}
             </div>)
    }
     handleClick() {
         //子组件调用父组件的方法并修改，不可直接调用
         // alert(this.props.index);
         //调用父组件的方法，记得改该方法的this指向为父组件
         // this.props.deleteItem(this.props.index);
         const { deleteItem, index} = this.props;
         deleteItem(index);
     }
}
TodoItem.propTypes = {
    test : PropTypes.string.isRequired,
    //arrayOf后可表示或者，即content的内容既可是number，也可是string
    content : PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
    deleteItem : PropTypes.func,
    index : PropTypes.number
}
TodoItem.defaultProps = {
    test : 'hello world'
}
export  default TodoItem;