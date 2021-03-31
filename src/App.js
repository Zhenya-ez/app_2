import React, { useState } from 'react'
import './App.css';

// 1 відмалювати список карточок базуючись на якомусь створеному вами масиві створити окрему кнопку, яка буде видаляти поточний перший елемент (або останній)  якщо у нас масив з 3 елементів і ми клікнули на кнопку 3 рази, то на екрані жодна карточка не має відмалюватись  (кнопки повернення до початкового стану не треба)

// function App() {
//   const [arr, changeArr] = useState ([
// 		{
// 			id: 1,
// 			title: 'title1',
// 		},
// 		{
// 			id: 2,
// 			title: 'title2',
// 		},
// 		{
// 			id: 3,
// 			title: 'title3',
// 		},
// 	]);

// 	const removeFirst = () => {
// 		const newArr = [...arr]
// 		newArr.shift()

// 		changeArr(newArr)
// 	}
	
// 	const removeLast = () => {
// 		const newArr = [...arr]
// 		newArr.pop()

// 		changeArr(newArr)
// 	}
	
// 	return (
//     <div className="App">
// 			<h2>test</h2>
// 			<button onClick={removeFirst}> remove first</button>
// 			<button onClick={removeLast}> remove last</button>
// 			<ul>
// 				{arr.map(el => <li key={el.id}> {el.title}</li>)}
// 			</ul>
//     </div>
//   );
// }

// 2 те саме, тільки з кнопкою реверт (повернутись до стану, де у нас видно 3 елемнети, як на початку)

// function App() {
//   const [arr, changeArr] = useState ([
// 		{
// 			id: 1,
// 			title: 'title1',
// 		},
// 		{
// 			id: 2,
// 			title: 'title2',
// 		},
// 		{
// 			id: 3,
// 			title: 'title3',
// 		},
// 	]);

// 	const [itemsToHide, setItemsToHide] = useState([]);

// 	const filteredArr = arr.filter(el => !itemsToHide.includes(el.id));

// 	const handleArrChange = () => {
// 		const itemToRemove = filteredArr[0];

// 		if (!itemToRemove) return;

// 		const clone = [...itemsToHide];
// 		clone.push(itemToRemove.id);
// 		setItemsToHide(clone);
// 	}

// 	const onRevert = () => {
// 		setItemsToHide([])
// 	}

// 	return (
// 		<div className="App">
// 			<h2>test</h2>
// 			<button onClick={handleArrChange}> remove</button> 
// 			<button onClick={onRevert}> revert</button> 
// 			<ul>
// 				{filteredArr.map(el => <li key={el.id}>{el.title}</li>)}
// 			</ul>
// 		</div>
// 	);
// 	}

	// 3   задача з зірочкою) кожна карточка з завдання вище має мати кнопку, по кліку на яку, ми видаляємо зі списку саме її + реверт кнопка, щоб вернути все назад (ця кнопка одна дня всіх карточок, клікнули по ній і всі каркти вернулись назазд) (згадування функції фільтр в лекції було не просто так)

	function App() {
			const [arr, changeArr] = useState ([
				{
					id: 1,
					title: 'title1',
				},
				{
					id: 2,
					title: 'title2',
				},
				{
					id: 3,
					title: 'title3',
				},
			]);
		
			const [itemsToHide, setItemsToHide] = useState([]);
		
			const filteredArr = arr.filter(el => !itemsToHide.includes(el.id));
		
			const handleArrChange = (itemToRemove) => {
				
				if (!itemToRemove) return;
		
				const clone = [...itemsToHide];
				clone.push(itemToRemove.id);
				setItemsToHide(clone);
			}
		
			const onRevert = () => {
				setItemsToHide([])
			}

			return (
				<div className="App">
					<h2>test</h2>
					<button onClick={onRevert}> revert </button> 
					<ul>
						{filteredArr.map((el) => (
							<li 
							key={el.id}
							>
								{el.title} - <button onClick={() => handleArrChange(el)}> remove </button>
								</li>
								))}
					</ul>
				</div>
			);
			}
			yo man muthefucker

export default App;
