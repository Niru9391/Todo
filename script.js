document.addEventListener('DOMContentLoaded', () => {
    const todoinput = document.getElementById('root');
    const addtask = document.getElementById('add');
    const todolist = document.getElementById('todo-list');
    let tasks = JSON.parse(localStorage.getItem('task')) || [];
  
    tasks.forEach(task => renderTask(task));
  
    addtask.addEventListener('click', () => {
      const tasktext = todoinput.value.trim();
      if (tasktext === "") return;
  
      const newtask = {
        id: Date.now(),
        text: tasktext,
        complete: false,
      };
  
      tasks.push(newtask);
      saveTask();
      renderTask(newtask);
      todoinput.value = "";
    });
  
    function saveTask() {
      localStorage.setItem('task', JSON.stringify(tasks));
    }
  
    function renderTask(ele) {
      const li = document.createElement("li");
      if (ele.complete) li.classList.add("completed");
      li.setAttribute('data-id', ele.id);
      
      li.innerHTML = `
        <span>${ele.text}</span> 
        <button style="background-color: red; color: white; border: none; padding: 5px 10px; cursor: pointer; font-size: 14px; border-radius: 5px;">Delete</button>
      `;
  
      li.addEventListener('click', (e) => {
        if (e.target.tagName === "BUTTON") return;
        ele.complete = !ele.complete;
        li.classList.toggle("completed");
        saveTask();
      });
  
      li.querySelector('button').addEventListener('click', () => {
        tasks = tasks.filter(task => task.id !== ele.id);
        saveTask();
        li.remove();
      });
  
      todolist.appendChild(li);
    }
  });
  