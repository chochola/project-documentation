// export kanbanApp to index 
// export async function kanbanApp () {
export const kanbanApp = async () => {
	// load JSON from server
	const loadJson = async () => {
		try {
			const url = "/loadJson";
			const promise = await fetch (url, {
					method: "get", 
					headers: { "Content-Type": "application/json"} 
			});
			const response = await promise.json();
			return response;      
	}
	catch ( error ) {
	console.log ( error + "loadJson" )
	}
}

	// delete client task
	const resetTasks = () => {
		const tasks = document.querySelector( "#task" );
		if ( tasks != null ) {
			tasks.remove();
			resetTasks();
		}              
	}



	// create task to specific row    *if a task should show more, add more parameters       
	const createTask = (kanbanRow, header, content, tag, id) => {
		const subCreateTask = (div, createTask) => {
			// set attributes to createTask (id, classname, innerHTML) 
			createTask.id = "task";
			createTask.className = "taskContainer";   
			createTask.innerHTML = header;           
			div.append(createTask);
			// in task div create text div and tag div
			const textDiv = document.createElement( "div" ); 
			const tagDiv = document.createElement( "div" );
			// input content and tag
			textDiv.innerHTML = content; 
			tagDiv.innerHTML = tag; 
			// tagDiv gets class name tag
			tagDiv.className = "tag";
			// put into taskdiv
			createTask.append(textDiv);
			createTask.append(tagDiv);
			//id hinzufügen
			const idDiv = document.createElement("div");
			idDiv.innerHTML = id;
			idDiv.id = "idDiv";
			createTask.append(idDiv);
			// form for button
			const form = document.createElement("form");
			form.formAction = "http://localhost:2000/idChangeRow";
			form.formMethod = "POST";
			// button next into form
			const button = document.createElement("button"); 
			button.innerHTML = "next"; 
			button.id = "next";
			button.name = "next";
			form.append(button);
			createTask.append(form);
			};
			if (kanbanRow == "kanbanToDo") { 
				const div = document.querySelector("#task");
				const createTask = document.createElement( "div" );
				subCreateTask(div, createTask);
			}
			if (kanbanRow == "kanbanDoing") { 
				const div = document.querySelector("#kanbanDoing");
				const createTask = document.createElement( "div" );    
				subCreateTask(div, createTask);
			}
			if (kanbanRow == "kanbanDone") { 
				const div = document.querySelector("#kanbanDone");
				const createTask = document.createElement( "div" );
				subCreateTask(div, createTask);
			}

	}
	// create client tasks from json
	const loadTasksFromJason = async () => {
		const data = await loadJson();
		const promise = await data.map ( array => {
			const kanbanRow = array.kanbanRow;
			const header = array.header;
			const content = array.content;
			const tag = array.tag;
			const id = array.id;
			createTask(kanbanRow, header, content, tag, id);
		})
	}

// end
}