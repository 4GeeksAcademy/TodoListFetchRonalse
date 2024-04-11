const URL = "https://playground.4geeks.com/todo/users/ronalse";

export const saveStatus = async () => {
    try {
        const response = await fetch(URL);
        const result = await response.json();
        
        if (result.hasOwnProperty("todos")) {
            const labels = result.todos.map((todo) => todo.label);
            return labels;
        } else {
            console.log("El objeto result no contiene la propiedad 'todos'");
            return [];
        }
    } catch (error) {
        console.error(error);
        return [];
    }
}
