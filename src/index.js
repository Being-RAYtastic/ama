import { saveQuestion, getQuestions } from "./firebase.js";


const questionTextArea = document.getElementById("question")
const submitQuestionBtn = document.getElementById("submitQuestionBtn")
const section = document.getElementById("qaList");

submitQuestionBtn.addEventListener("click", ()=>{
    saveQuestion(questionTextArea.value)
    questionTextArea.value = ""
})

async function displayQuestions() {
    const questions = await getQuestions()
    // console.log(questions)
    
    section.innerHTML = "" // clear section

    questions.forEach((item, index) => {
        const div = document.createElement("div")
        div.classList.add("qa-item")
        div.innerHTML = `
            <div class="q">${item.question}</div>
            <div class="a">${item.reply}</div>
        `
        section.appendChild(div)

        if (index < questions.length - 1) {
            section.appendChild(document.createElement("hr"));
        }
    });
}

displayQuestions()


