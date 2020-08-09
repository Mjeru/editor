(function() {
    let editButton = document.querySelector(`.button-edit`);
    let saveButton = document.querySelector(`.button-save`);
    let cancelButton = document.querySelector(`.button-cancel`);
    let workspace = document.querySelector(`.workspace`);
    let loadform = document.querySelector(`.load-form`);

    function editMode() {
        workspace.setAttribute(`contenteditable`, true);
        saveButton.removeAttribute(`disabled`);
        cancelButton.removeAttribute(`disabled`);
        editButton.setAttribute(`disabled`, true);
    }

    function defaultMode() {
        workspace.removeAttribute(`contenteditable`);
        saveButton.setAttribute(`disabled`, true);
        cancelButton.setAttribute(`disabled`, true);
        editButton.removeAttribute(`disabled`);

    }


    function firstStart() {
        if (!localStorage.getItem(`TextEditor`)) {
            let currentDate = new Date;
            workspace.innerHTML = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
            let objStore = {
                "lastDate": [currentDate.toString()],

                [currentDate]: [workspace.innerHTML]
            };
            jsonStore = JSON.stringify(objStore);
            localStorage.setItem(`TextEditor`, jsonStore);
        } else {
            let saveStore = localStorage.getItem(`TextEditor`);
            let objStore = JSON.parse(saveStore);
            let lastDate = objStore.lastDate
            workspace.innerHTML = objStore[lastDate];
        }
        refreshlist();
    }

    function refreshlist() {
        let saveStore = localStorage.getItem(`TextEditor`);
        let objStore = JSON.parse(saveStore);
        let select = document.querySelector(`.selector`);
        select.innerHTML = ``;
        let arrStore = [];
        for (key in objStore) {
            if (objStore[key] !== `lastDate`) {
                arrStore.push(key);
            }
        }
        arrStore.reverse();

        for (let i = 0; i < arrStore.length; i++) {
            if (arrStore[i] !== `lastDate`) {
                select.innerHTML = select.innerHTML + `<option value = "${arrStore[i]}">${arrStore[i]}</option>`

            }
        }
    }

    firstStart();

    editButton.addEventListener(`click`, function(event) {
        editMode();
        workspace.focus();


    })

    saveButton.addEventListener(`click`, function(event) {
        let currentDate = new Date;
        let saveStore = localStorage.getItem(`TextEditor`);
        let objStore = JSON.parse(saveStore);
        objStore[currentDate] = workspace.innerHTML;
        objStore.lastDate = currentDate.toString();
        saveStore = JSON.stringify(objStore);
        localStorage.setItem(`TextEditor`, saveStore);

        defaultMode();
        refreshlist();

    });

    cancelButton.addEventListener(`click`, function(event) {
        defaultMode();
        let lastDate = localStorage.getItem(`lastDate`);
        workspace.innerHTML = localStorage.getItem(lastDate)
    });


    loadform.addEventListener(`submit`, function(event) {
        event.preventDefault();
        let select = document.querySelector(`.selector`);
        let saveStore = localStorage.getItem(`TextEditor`);
        let objStore = JSON.parse(saveStore);
        workspace.innerHTML = `${objStore[select.value]}`
    })
})();