import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-7767d-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListInDb = ref(database, "Endorsements")

const inputFieldEl = document.getElementById("input-field")
const publishBtn = document.getElementById("publish-btn")
const endorsementListEl = document.getElementById("endorsement-list")

onValue(endorsementListInDb, function(snapshot) {
    let endorsementArray = Object.entries(snapshot.val())

    endorsementListEl.innerHTML = ""

    for (let i = 0; i < endorsementArray.length; i++) {
        let currentEndorsement = endorsementArray[i]

        appendEndorsementToListEl(currentEndorsement)
    }
})

publishBtn.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(endorsementListInDb, inputValue)

    clearInputFieldEl()
})


function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendEndorsementToListEl(item) { 

    let itemValue = item[1]    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    endorsementListEl.append(newEl)

}

