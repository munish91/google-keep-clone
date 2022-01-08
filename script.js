const addNote = document.getElementById('add-btn');

const updateLSData = ()=>{
	const textareaData = document.querySelectorAll('textarea');
	const notes = [];
	// console.log(textareaData);

	textareaData.forEach((note)=>{
		return notes.push(note.value);
	})
	localStorage.setItem('notes', JSON.stringify(notes));
}

const update = (text = '')=>{
	const mainDiv = document.createElement('div');
	    mainDiv.classList.add('main-container');
	const htmlData = `<div class="action">
						<div>
						  <button class="btn btn-success edit"><i class="fas fa-edit"></i></button>
						  <button class="btn btn-danger delete"><i class="fas fa-trash-alt"></i></button>
						</div>
					    
					    <div class="card ${text ? "" : "d-none"}"></div>
                        <textarea class="textarea ${text ? "d-none" : ""}"></textarea> 
					 </div> `;
    mainDiv.insertAdjacentHTML('afterbegin', htmlData);
    document.body.appendChild(mainDiv);

    // getting the references

    const edit = mainDiv.querySelector('.edit');
    const deleteBtn = mainDiv.querySelector('.delete');
    const card = mainDiv.querySelector('.card');
    const textarea = mainDiv.querySelector('.textarea');


    // deleting the node
       deleteBtn.addEventListener('click', ()=>{
       	  mainDiv.remove();
       	  updateLSData();
       })

    // toggle using edit button

        textarea.value = text;
        card.innerHTML = text;

    edit.addEventListener('click', ()=>{
    	card.classList.toggle('d-none');
    	textarea.classList.toggle('d-none');
    })

    textarea.addEventListener('change', (event)=>{
        const value = event.target.value;
        card.innerHTML = value;

        updateLSData();
    })


}

// getting data from loacalstorage
const notes = JSON.parse(localStorage.getItem('notes'));

if(notes) {notes.forEach((note)=> update(note) )}

addNote.addEventListener('click', ()=> update());