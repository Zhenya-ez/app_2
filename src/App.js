import React, { useState, useEffect } from 'react'
import './App.css';

// дз  створти 2 інтупи і кнопку
// перший відповідає за ендпоінт джсон плейсхолдера (перша частина енпоніту) другий- за айдішнік  якщо другого ендпоінту нема- тягнемо весь список  потрібно зробити валідацію на перший інпут- чи ендпоінт існуючий на другий- чи це число і чи воно в рамках 1-100  зробити версію на функціональній компоненті контрольовану і не контрольовану  якщо є час- на класовій компоненті теж таке саме написати

const BASE_URL = 'https://jsonplaceholder.typicode.com'   //забрали /

const AVALIBLE_RESOURCES = [
	'posts',
	'comments',
	'photos',
	'todos',
	'users',
]

	function App() {
		// const [endpoint, setEndpoint] = useState('');
		// const [id, setId] = useState('');

		// об'єднуємо два значення вище в одне
		const [endpointFields, setEndpointFields] = useState ({
			endpoint: '',
			id: ''
		})

		const {endpoint, id} = endpointFields;

		const [errorMessage, setErrorMessage] = useState('')
		
		const [items, setItems] = useState([]);
		const [singleItem, setSingleItem] = useState(null);

		const validateEndpoint = () => {

			// перевірка чи перший інпут є пустим
			// перевірка першого інпута чи в ньому валідне значення
			if(!endpoint) {
				setErrorMessage('first input is required!!!')
				return false

			} else if(!AVALIBLE_RESOURCES.includes(endpoint.trim().toLowerCase())) { 
				setErrorMessage('value is not valid, try to use smth from this list: posts, comments, photos, todos, users')
				return false;
			}

			return true;
		}

		const validateId = () => {
			// перевірка чи значення є числовим
			// перевірка чи значення в діапазоні 1-100
			const idToNum = Number(id);

			if(!idToNum && id !== '' && idToNum !==0) {
				setErrorMessage('value for second input is not valid, pls use numeric value')
				return false
			} else if((idToNum < 1 || idToNum > 100) && id !== '') {
				setErrorMessage('value for second input is out of range, pls use 1-100')
				return false
			}
			
			return true;
		}
		
		const resetError = () => setErrorMessage('');

		const onSubmit = () => {
			const isEndpointValid = validateEndpoint();
			const isIdOk = validateId();

			if(isIdOk && isEndpointValid) {
				fetchData()
				resetError()
			}
		}

		const fetchData = async() => {
			//trim() щоб забрати пробіли і нормально виконувалась валідація коли пишуть в інпутах з пробілами
			//toLowerCase() щоб при вводі з капсом не ламалась валідація і все конвертувалось в ловер кейс
			const response = await fetch(`${BASE_URL}/${endpoint.trim().toLowerCase()}/${id.trim()}`);   
			const json = await response.json();

			//Перевірка якщо ведеений постс, але не введений його айді - відображаються всі пости, коли введений його айді - відображається тільки 1 пост
			if(id) {
				setSingleItem(json)
				setItems([])

				return
			}
			setSingleItem(null)
			setItems(json)
		}

		const onFieldUpdate = ({target: {name, value}}) => setEndpointFields({...endpointFields, [name]: value})

			return (
				<div className="App">
					<br/>
					<br/>
					<input value={endpoint} onChange={onFieldUpdate} name="endpoint" type="text" placeholder="E.g. posts, comments, todos etc" />
					<br/>
					<br/>
					<input value={id} onChange={onFieldUpdate} name="id" type="text"  placeholder="resourse id, e.g. 1, 2, 3" />
					<br/>
					<br/>
					<button onClick={onSubmit}>fetch data</button>
				
					<hr/>

					<h1 style={{ color: 'red'}}>{errorMessage}</h1>

					<div style={{ width: '400px', textAlign: 'left', padding: '20px'}}>
						<pre style={{ whiteSpace: 'pre-wrap' }}>
						{singleItem && JSON.stringify(singleItem, null, 2)}
						</pre>
					</div>
				
				<hr/>
				<div>
					{items.map(el => (<div>{el.id} - {el.title ?? 'N/A'}</div>))}
				</div>
				
				
				
				</div>
			);
			}

export default App;
