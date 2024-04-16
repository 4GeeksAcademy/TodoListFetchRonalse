import React, { useEffect, useState } from "react";
import { saveStatus} from "./Fetch";
//inclde images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";


//create your first component
const Home = () => {
	const [ inputValue, setInputValue ] = useState('');
    const [Todos, setTodos] = useState([]);
	const [selectedTodo, setSelectedTodo] = useState(null); // Nuevo estado para la tarea seleccionada

	const handleCheckboxChange = (index) => {
		if (selectedTodo === null) {
			setSelectedTodo(index); // Si no hay ninguna tarea seleccionada, se selecciona la actual
		} else if (selectedTodo === index) {
			setSelectedTodo(null); // Si la tarea seleccionada es la misma que se está desmarcando, se deselecciona
		} else {
			setSelectedTodo(index); // Si se marca una nueva tarea, se establece como la tarea seleccionada
		}
    }
	
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
			fetch("https://playground.4geeks.com/todo/todos/ronalse", requestOptions)
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

	useEffect(() => {
        getMisTareas();

        console.log("ejecutar")
    }, [])

    const getMisTareas = async () => {
		const URL = "https://playground.4geeks.com/todo/users/ronalse";
        fetch(URL)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.todos)
                setTodos(result.todos)
            })
            .catch((error) => console.error(error));
    }
	const Change = (e) => {setInputValue(e.target.value)}

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
							<span  style={{ textDecoration: selectedTodo === index ? 'line-through' : '' }}>
                                {todo.label}
                            </span>
							<i className="fas fa-eraser Icono " 
								onClick={ async ()=> 
								{fetch(`https://playground.4geeks.com/todo/todos/${todo.id}`, {
                                method: "DELETE"
                                })
                                .then(response => {
                                if (!response.ok) {console.log("error")}
                                return console.log(response);})
                                .then((response) => {console.log(response)
									getMisTareas();})
								.catch(error => console.error(error));
								}}>
							</i>
							<input className="form-check-input Icono mx-2" 
								type="checkbox" 
								onChange={() => handleCheckboxChange(index)}>
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
