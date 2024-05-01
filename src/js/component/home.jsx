import React, { useEffect, useState } from "react";
//inclde images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";




//create your first component
const Home = () => {
	const [ inputValue, setInputValue ] = useState('');
    const [Todos, setTodos] = useState([]);


	const UrlPost = "https://playground.4geeks.com/todo/todos/ronalse";
	
	const handleKeyPress = (e) => {
		if (e.key === 'Enter' && inputValue.length >= 3) {
			const myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");
			const raw = JSON.stringify({
				"label": inputValue,
				"is_done": false
			});
			const requestOptions = {
				method: "POST",
				headers: myHeaders,
				body: raw,
				redirect: "follow"
			};
			fetch(UrlPost, requestOptions)
				.then((response) => {
					if (!response.ok) {
						throw new Error('Network response was not ok');
					}
					return response.json(); // Leer el cuerpo de la respuesta como texto
				})
				.then((result) => {
					if (result) {
						getMisTareas(); // Llamamos a getMisTareas solo si hay una respuesta válida
						setInputValue(""); // Limpiamos el campo de entrada después de agregar una nueva tarea
					}
				})
				.catch((error) => console.error(error));
		}
	}
	const URL = "https://playground.4geeks.com/todo/users/ronalse";
		const getMisTareas =  () => {
			fetch(URL)
				.then(response => {
					if (response.status >= 200 && response.status <=299) {
						return response.json();
					}else if (response.status >=400 && response.status <=499) {
						PostFetch();
					}
					})
				.then((result) => {
					console.log(result.todos)
					setTodos(result.todos)
				})
				.catch((error) => console.error(error));
		}
	useEffect(() => {
		getMisTareas();
    }, [])

	const Change = (e) => {setInputValue(e.target.value)};

	const handleChange = (id) => {
        const updatedTodos = Todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, is_done: !todo.is_done };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

	const handleDelete = (id) =>{
		fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE"
			})
			.then(response => {
			if (!response.ok) {console.log("error")}
			return console.log(response);})
			.then((response) => {console.log(response)
				setTodos(Todos.filter(todo => todo.id !== id))
				getMisTareas();})
			.catch(error => console.error(error));
	};
	
	const PostFetch = () =>{
			const requestOptions = {
			method: "POST",
			redirect: "follow"
			};
			fetch("https://playground.4geeks.com/todo/users/ronalse", requestOptions)
			.then((response) => response.json())
			.then((result) => console.log(result))
			.catch((error) => console.error(error));
				}
	return (
<>

	<div className=" container Father " > 
		<div className="container bg-light rounded px-0 mt-4">
			<h1 className="text-center TODOS rounded-top  mb-0 ">Todos</h1>
				<ul>
					<input  className="px-2  " type="text" 
					minLength={3} 
					required={true}
					onChange={Change} 
					value={inputValue} placeholder="WHAT NEEDS TO BE DONE?"
					onKeyUp={handleKeyPress}
					/>
					{Todos.map( (todo, index) => 
						<li key={index} className="border-top border-bottom p-2 mx-2 ">
							<span style={{ textDecoration: todo.is_done ? 'line-through' : '' }}>		
                                {todo.label}
                            </span>
							<i className="fas fa-eraser Icono " 
								onClick={() =>handleDelete(todo.id)}>
							</i>
							<input className="form-check-input Icono mx-2" 
								type="checkbox" 
								checked={todo.is_done}
								onChange={() => handleChange(todo.id)}
							>
							</input>
							</li>)}
				</ul>
				<div className=" px-2"> {Todos.length} task</div>
		</div>
	</div>
				<div className="SonOne container  rounded-bottom">   </div>
				<div className="SonTwo container  rounded-bottom">   </div>
</>
	);
};

export default Home;
