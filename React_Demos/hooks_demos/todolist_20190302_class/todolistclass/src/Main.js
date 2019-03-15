/**
 * 主页组件
 * 2019-03-10
 */

import React, { Component } from 'react';
//  import * as styles from './Main.css';
import './Main.css';
import InputComponent from './components/InputComponent';
import ItemContainer from './components/ItemContainer';
import ToDoItem from './components/ToDoItem';
import DoneItem from './components/DoneItem';

class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: '',
            todoItemList: [{ title: '1', date: '03/12', do: false }, { title: '2', date: '03/05', do: false }, { title: '3', date: '03/15', do: false }],
            doneItemList: [{ title: '4', date: '03/11', do: true},{ title: '5', date: '03/12', do: true},{ title: '6', date: '03/09', do: true},{ title: '7', date: '03/12', do: true},{ title: '8', date: '03/12', do: true}]
        }

        this.onTxtChange = this.onTxtChange.bind(this);
        this.onTxtKeyDown = this.onTxtKeyDown.bind(this);
    }

    onTxtChange(value) {
        this.setState({ value });
    }

    onTxtKeyDown(e) {
        if (e.keyCode === 13) {//enter
            alert(e.target.value);
        }
    }

    render() {
        let { style, className, ...others } = this.props;
        return <div className={'main' + ' ' + className} style={style} {...others}>
            <span className='title'>todolist class 版本实现</span>
            <InputComponent
                style={{ 'margin': '10px 0px 10px 0px' }}
                value={this.state.value}
                onChange={this.onTxtChange}
                onKeyDown={this.onTxtKeyDown}
                placeholder={'请输入待办事项  [回车快速添加]'}
            />
            <ItemContainer title={'待处理: '} titleStyle={{ 'color': 'green', 'fontSize': '16px' }}
                style={{ 'margin': '10px 0px 10px 0px', 'border': '1px solid green' }}>
                {
                    this.state.todoItemList && this.state.todoItemList.map((item, index) => {
                        return <ToDoItem key={index} style={{ 'magin': '10px' }} item={item}/>
                    })
                }
            </ItemContainer>
            <ItemContainer title={'已完成: '} titleStyle={{ 'color': 'gray', 'fontSize': '16px' }}
                style={{ 'border': '1px solid gray' }}>
                {
                    this.state.doneItemList && this.state.doneItemList.map((item, index) => {
                        return <DoneItem key={index} style={{ 'magin': '10px' }} item={item}/>
                    })
                }
            </ItemContainer>
        </div>
    }
}

export default Main;