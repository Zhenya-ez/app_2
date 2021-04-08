import React, { createContext, useContext, useState } from "react";
import { Switch, BrowserRouter as Router, Route, Link } from "react-router-dom";

const TodoContext = createContext();

const TodoContextProvider = ({children}) => {
	const [todos, setTodos] = useState([]);
	const [doneTodos, setDoneTodos] = useState([]);

	const onTodoCreate = (newTodo) => {
		if(!newTodo || !newTodo.title || !newTodo.description) {
			console.error('wrong arg for new todo, should be smth like {title "...", description: "..."}')
			return
		}

		setTodos([newTodo, ...todos])
	}

		const onTodoRemove = (todoId) => {
			if (!todoId) {
				console.error('todo id looks wrong', todoId)
				return
			}

			setTodos(todos.filter(el => el.id !== todoId))
			setDoneTodos(doneTodos.filter(id => id !== todoId))
		}

			const isDoneToggle = (todoId) => {
				const isTodoMarkedAsDone = doneTodos.includes(todoId);

				if(isTodoMarkedAsDone) {
					return setDoneTodos(doneTodos.filter(id => id !== todoId))
				}

				setDoneTodos([...doneTodos, todoId])
			}

	return (
		<TodoContext.Provider 
		value={{
			todos,
			onTodoCreate,
			onTodoRemove,
			isDoneToggle,
			doneTodos
			}}>
		{children}
		</TodoContext.Provider>
	)
}

const TodoItem = ({ todo, onTodoRemove, isDoneToggle, isDone }) => {
	const onTodoDelete = () => {
		const answer = window.confirm('are you sure want to delete this todo');

		if(answer) {
			onTodoRemove(todo.id)
		}
	}

	const onMarkIsDoneToggle = () => isDoneToggle(todo.id)

	return (
		<div>
			<div style={{
				textDecoration: isDone ? 'line-through' : ''
			}}>
			<h4>{todo.title}</h4> 
			<p>{todo.description}</p> 
			</div>

			<button onClick={onTodoDelete}>delete todo</button>
			<button onClick={onMarkIsDoneToggle}>mark as {isDone ? 'active' : 'done'}</button>
		</div>
	)
}

const TodosList = () => {
	const {
		todos,
		onTodoRemove,
		isDoneToggle,
		doneTodos
	} = useContext(TodoContext)

	return (
		<div>
			{todos.map(el => (
			<TodoItem 
			isDone={doneTodos.includes(el.id)}
			isDoneToggle={isDoneToggle}
			onTodoRemove={onTodoRemove}
			key={el.title + el.description} 
			todo={el} 
			/>
			))}
		</div>
	)
}

const AddTodo = () => {
	const [todoValues, setTodoValues] = useState({
		title: '',
		description: '',
		id: null,
	})

	const {
		onTodoCreate
	} = useContext(TodoContext)

	const onTodoChange = ({target: {name, value}}) => setTodoValues({...todoValues, [name]: value})
	
	const onCreate = () => {
	onTodoCreate({ ...todoValues, id: Math.random() })
	
	setTodoValues({
		title: '',
		description: '',
		id: null
})
}

	return (
		<div>
			<input value={todoValues.title} onChange={onTodoChange} type="text" name="title" placeholder="todo title"/>
			<br />
			<br />
			<input value={todoValues.description} onChange={onTodoChange} type="text" name="description" placeholder="todo description"/>
			<br />
			<br />
			<button onClick={onCreate}>add todo</button>
		</div>
	)
}

const Header = () => {
	const {
		todos,
		doneTodos
	} = useContext(TodoContext);

	return (
		<header>
			<Link to="/">List </Link>
			<Link to="/create-todo">add new todo </Link>
			{/* цей дів це заглушка яка розсуне 2 блоки щоб кожний не огортати */}
			<div style={{flex: 1}} />

			<h3 style={{ marginRight: 12}}>total todos: {todos.length}</h3>
			<h3 style={{ marginRight: 12}}>active todos: {todos.length - doneTodos.length}</h3>
			<h3 style={{ marginRight: 12}}>done todos: {doneTodos.length}</h3>
		</header>
	)
}

export default function App() {
	
	return (
		// 1 список тудушок, де ми можемо маркувати їх як виконані або видаляти
		// 2 формочка для створення нової тудушки
		<TodoContextProvider>
		<main>
		<Router>
			<Header /> 

			<div style={{padding: 20}}>
			<Switch>
				<Route path="/" exact>
				<TodosList />
				</Route>

				<Route path="/create-todo">
					<AddTodo />
				</Route>
			</Switch>
			</div>

		</Router>
		</main>
		</TodoContextProvider>
	);
}
