const totalCountEl = document.getElementById('total');
const interviewCountEl = document.getElementById('interview-count');
const rejectCountEl = document.getElementById('reject-count');
const tabCountEl = document.getElementById('tabCount');
const allCardsSection = document.getElementById('allcards');
const filteredSection = document.getElementById('filtered-section');


let currentTab = 'all'; 


function updateDashboard() {
    const allCards = allCardsSection.querySelectorAll('.card');
    const interviewCards = Array.from(allCards).filter(card => card.dataset.status === 'interview');
    const rejectedCards = Array.from(allCards).filter(card => card.dataset.status === 'reject');

    totalCountEl.innerText = allCards.length;
    interviewCountEl.innerText = interviewCards.length;
    rejectCountEl.innerText = rejectedCards.length;
  
    if (currentTab === 'all') {
        tabCountEl.innerText = `${allCards.length} Jobs`;
    } else if (currentTab === 'interview') {
        tabCountEl.innerText = `${interviewCards.length} Jobs`;
    } else {
        tabCountEl.innerText = `${rejectedCards.length} Jobs`;
    }
    
    renderTab();
}


function toggleStyle(btnId) {
    const buttons = ['all-filter-btn', 'interview-filter-btn', 'reject-filter-btn'];
    
  
    buttons.forEach(id => {
        const btn = document.getElementById(id);
        btn.classList.remove('bg-blue-600', 'text-white');
        btn.classList.add('bg-gray-100', 'text-slate-500');
    });

    const activeBtn = document.getElementById(btnId);
    activeBtn.classList.add('bg-blue-600', 'text-white');
    activeBtn.classList.remove('bg-gray-100', 'text-slate-500');

    if (btnId === 'all-filter-btn') currentTab = 'all';
    if (btnId === 'interview-filter-btn') currentTab = 'interview';
    if (btnId === 'reject-filter-btn') currentTab = 'reject';

    updateDashboard();
}


function renderTab() {
    const allCards = allCardsSection.querySelectorAll('.card');
    let visibleCount = 0;

    allCards.forEach(card => {
        const status = card.dataset.status;
        
        if (currentTab === 'all') {
            card.classList.remove('hidden');
            visibleCount++;
        } else if (currentTab === 'interview' && status === 'interview') {
            card.classList.remove('hidden');
            visibleCount++;
        } else if (currentTab === 'reject' && status === 'reject') {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });

    if (visibleCount === 0 && currentTab !== 'all') {
        filteredSection.innerHTML = `
            <div class="text-center py-20">
                <img src="./image/jobs.png" class="mx-auto mb-4" alt="empty">
                <h3 class="text-2xl font-bold text-blue-950">No Jobs Available</h3>
                <p class="text-gray-500">Check back soon for new job opportunities</p>
            </div>`;
        filteredSection.classList.remove('hidden');
    } else {
        filteredSection.classList.add('hidden');
    }
}

allCardsSection.addEventListener('click', (element) => {
    const card = element.target.closest('.card');
    if (!card) return;

    const statusBtn = card.querySelector('.status');


    if (element.target.classList.contains('interview-btn')) {
        card.dataset.status = 'interview';
        statusBtn.innerText = 'INTERVIEW';
        statusBtn.className = 'status text-green-600 bg-green-50 rounded-xl px-8 py-4 font-semibold';
        updateDashboard();
    }
    if (element.target.classList.contains('reject-btn')) {
        card.dataset.status = 'reject';
        statusBtn.innerText = 'REJECTED';
        statusBtn.className = 'status text-red-600 bg-red-50 rounded-xl px-8 py-4 font-semibold';
        updateDashboard();
    }

    if (element.target.closest('.btn-delet')) {
        card.remove();
        updateDashboard();
    }
});

updateDashboard();