const totalElement = document.getElementById("total");
const interviewElement = document.getElementById("interview-count");
const rejectElement = document.getElementById("reject-count");
const tabCount = document.getElementById("tabCount");

const allCardsSection = document.getElementById("allcards");
const filteredSection = document.getElementById("filtered-section");

const filterButtons = {
    allBtn: document.getElementById("all-filter-btn"),
    interviewBtn: document.getElementById("interview-filter-btn"),
    rejectBtn: document.getElementById("reject-filter-btn")
};


function updateDashboard() {

    const cards = document.querySelectorAll(".card");

    let interview = 0;
    let rejected = 0;

    cards.forEach(card => {
        const status = card.querySelector(".status").innerText;
        if (status === "INTERVIEW") interview++;
        if (status === "REJECTED") rejected++;
    });

    totalElement.innerText = cards.length;
    interviewElement.innerText = interview;
    rejectElement.innerText = rejected;

   
    updateTabCount();
}

function updateTabCount() {

    const activeBtn = document.querySelector(".bg-blue-600");
    const cards = document.querySelectorAll(".card");

    if (activeBtn.id === "all-filter-btn") {
        tabCount.innerText = cards.length + " Jobs";
    }

    if (activeBtn.id === "interview-filter-btn") {
        const interviewCards = [...cards].filter(card =>
            card.querySelector(".status").innerText === "INTERVIEW"
        );
        tabCount.innerText = interviewCards.length + " Jobs";
    }

    if (activeBtn.id === "reject-filter-btn") {
        const rejectedCards = [...cards].filter(card =>
            card.querySelector(".status").innerText === "REJECTED"
        );
        tabCount.innerText = rejectedCards.length + " Jobs";
    }
}


function toggleStyle(activeId) {

    Object.values(filterButtons).forEach(btn => {
        btn.classList.remove("bg-blue-600", "text-white");
        btn.classList.add("bg-gray-100", "text-slate-500");
    });

    const activeBtn = document.getElementById(activeId);
    activeBtn.classList.remove("bg-gray-100", "text-slate-500");
    activeBtn.classList.add("bg-blue-600", "text-white");

    filterCards(activeId);
}


function filterCards(type) {

    const cards = document.querySelectorAll(".card");

    filteredSection.innerHTML = "";
    filteredSection.classList.remove("hidden");
    allCardsSection.classList.add("hidden");

    let statusType = "";

    if (type === "interview-filter-btn") statusType = "INTERVIEW";
    if (type === "reject-filter-btn") statusType = "REJECTED";

    if (type === "all-filter-btn") {
        allCardsSection.classList.remove("hidden");
        filteredSection.classList.add("hidden");
        updateTabCount();
        return;
    }

    let found = false;

    cards.forEach(card => {
        const status = card.querySelector(".status").innerText;

        if (status === statusType) {
            filteredSection.appendChild(card.cloneNode(true));
            found = true;
        }
    });

    if (!found) {
        filteredSection.innerHTML = `
            <div class="text-center py-20">
                <img src="./image/jobs.png" class="mx-auto mb-4 w-20"/>
                <h2 class="text-2xl font-bold text-blue-950">No Jobs Available</h2>
                <p class="text-gray-500 mt-2">Move jobs from All tab</p>
            </div>
        `;
    }

    updateTabCount();
}


function attachCardEvents() {

    document.querySelectorAll(".card").forEach(card => {

        const interviewBtn = card.querySelector(".interview-btn");
        const rejectBtn = card.querySelector(".reject-btn");
        const deleteBtn = card.querySelector(".btn-delet");
        const status = card.querySelector(".status");

        interviewBtn.addEventListener("click", () => {

            if (status.innerText === "INTERVIEW") return;

            status.innerText = "INTERVIEW";
            status.classList.remove("bg-blue-50", "text-blue-950", "bg-red-100", "text-red-600");
            status.classList.add("bg-green-100", "text-green-600");

            updateDashboard();
        });

        rejectBtn.addEventListener("click", () => {

            if (status.innerText === "REJECTED") return;

            status.innerText = "REJECTED";
            status.classList.remove("bg-blue-50", "text-blue-950", "bg-green-100", "text-green-600");
            status.classList.add("bg-red-100", "text-red-600");

            updateDashboard();
        });

        deleteBtn.addEventListener("click", () => {
            card.remove();
            updateDashboard();
        });

    });
}


attachCardEvents();
updateDashboard();
