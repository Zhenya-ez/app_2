import React, { useState, useEffect } from 'react'
import './App.css';

// потрібно створити логіку, яка задовільнить наступні вимоги
// в нас має бути 6 кнопок, які дозволяють нам переключатись між 'табами' (posts, comments, albums, photos, todos, users)
// дефолтно обрана таба- пости
// по кліку на кнопку ми повинні підтягнути відповідний список і зрендерити його через .map
// лише 1 список видимий одночасно
// потрібно створити 6 компонент, які займатимуться рендерінгом списків (отримуватимуть пропсами список)- PostList, CommentsList...

// ендпоінти
// /posts 
// /comments 
// /albums 
// /photos 
// /todos 
// /users 
// урл https://jsonplaceholder.typicode.com/

const Tabs = ({ tabs, selectedTab }) => {
	return (
		<div style={{
			display: 'flex',
		}}>
		{tabs.map(tab => ( 
		<button 
		key={tab.title}
		style={{ 
			flex: 1,
			height: '50px',
			background: selectedTab === tab.title ? 'green' : 'white'
		}} 
		onClick={tab.clickHandler}
		>
		{tab.title}
		</button>
		))}
		</div>
		)
	}

	const PostList = ({ posts }) => {
		return (
		<>
		{posts.map(post => (
			<div key={post.id}>
			<h3>{post.title}</h3>
			<p>{post.body}</p>
			</div>
		))}
		</>
		)
	}

	const CommentList = ({ comments }) => {
		return (
		<>
		{comments.map(comment => (
			<div key={comment.id}>
			<h3>{comment.name}</h3>
			<p>{comment.body}</p>
			</div>
		))}
		</>
		)
	}

	const AlbumList = ({ albums }) => {
		return (
		<>
		{albums.map(album => (
			<div key={album.id}>
			<h3>{album.title}</h3>
			</div>
		))}
		</>
		)
	}

	const PhotoList = ({ photos }) => {
		return (
		<>
		{photos.map(photo => (
			<div key={photo.id}>
			<h3>{photo.title}</h3>
			<p>{photo.thumbnailUrl}</p>
			</div>
		))}
		</>
		)
	}

	const TodoList = ({ todos }) => {
		return (
		<>
		{todos.map(todo => (
			<div key={todo.id}>
			<h3>{todo.title}</h3>
			<p>{todo.completed.toString()}</p>
			</div>
		))}
		</>
		)
	}

	const UserList = ({ users }) => {
		return (
		<>
		{users.map(user => (
			<div key={user.id}>
			<h3>{user.name} -- {user.username} -- {user.email}</h3>
			</div>
		))}
		</>
		)
	}
	
	const urlBuilder = (resource) => `https://jsonplaceholder.typicode.com/${resource}`
	
	function App() {
		const onTabChangeHandler = (tab) => {
			if (tab !== selectedTab) {
				setSelectedTab(tab);
				setList([])
			}
		}

		const tabs = [
			{ title: 'posts', clickHandler: () => onTabChangeHandler ('posts')},
			{ title: 'comments', clickHandler: () => onTabChangeHandler ('comments')},
			{ title: 'albums', clickHandler: () => onTabChangeHandler ('albums')},
			{ title: 'photos', clickHandler: () => onTabChangeHandler ('photos')},
			{ title: 'todos', clickHandler: () => onTabChangeHandler ('todos')},
			{ title: 'users', clickHandler: () => onTabChangeHandler ('users')},
		]

		const [selectedTab, setSelectedTab] = useState(tabs[0].title)
		const [list, setList] = useState([]);

		const fetchData = async () => {
			const response = await fetch(urlBuilder(selectedTab));
			const data = await response.json();
			console.log(selectedTab, data);
			setList(data)
		}
		
		useEffect(() => {
			fetchData();
		}, [selectedTab])

			return (
				<div className="App">
					<Tabs tabs={tabs} selectedTab={selectedTab} />

					{selectedTab === 'posts' && <PostList posts={list} />}
					{selectedTab === 'comments' && <CommentList comments={list} />}
					{selectedTab === 'albums' && <AlbumList albums={list} />}
					{selectedTab === 'photos' && <PhotoList photos={list} />}
					{selectedTab === 'todos' && <TodoList todos={list} />}
					{selectedTab === 'users' && <UserList users={list} />}
				</div>
			);
			}

export default App;
