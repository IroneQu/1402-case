document.addEventListener('DOMContentLoaded', () => {
	const riddles = {
		1: {
			answer: ['241', '856'],
			targetId: 'res-1',
			inputId: 'ans-1',
		},
		2: {
			answer: ['5', 'pięć', 'piec', '05'],
			targetId: 'res-2',
			inputId: 'ans-2',
		},
		3: {
			answer: ['maczek', 'mak', 'maczka'],
			targetId: 'res-3',
			inputId: 'ans-3',
		},
	};

	const finalCodeCorrect = "27052025"; 

    window.checkRiddle = function(id) {
        const riddle = riddles[id];
        const inputEl = document.getElementById(riddle.inputId);
        const resultEl = document.getElementById(riddle.targetId);
        
        const userVal = inputEl.value.trim().toLowerCase();

        if(riddle.answer.includes(userVal)) {
            resultEl.style.display = 'block';
            inputEl.style.borderColor = "#2e7d32";
            inputEl.style.backgroundColor = "#e8f5e9";
            inputEl.disabled = true;
        } else {
            inputEl.classList.add('shake');
            inputEl.style.borderColor = "#d32f2f";
            setTimeout(() => inputEl.classList.remove('shake'), 500);
        }
    };

    const puzzleScreen = document.getElementById('puzzle-screen');
    const finalScreen = document.getElementById('final-screen');
    const finalInput = document.getElementById('final-code');
    const safeBox = document.getElementById('safe-box');
    const unlockBtn = document.getElementById('unlock-btn');

    function checkFinalCode() {
        const raw = finalInput.value;
        const clean = raw.replace(/[^0-9]/g, '');

        if(clean === finalCodeCorrect) {
            puzzleScreen.style.display = 'none';
            finalScreen.style.display = 'block';
            startConfetti(); 
        } else {
            safeBox.classList.add('shake');
            setTimeout(() => safeBox.classList.remove('shake'), 500);
            alert("Błędny kod dostępu! Rozwiąż zagadki powyżej.");
            finalInput.value = '';
        }
    }

    unlockBtn.addEventListener('click', checkFinalCode);
    finalInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') checkFinalCode(); });


    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');

    yesBtn.addEventListener('click', () => {
        alert("Wiedziałem! Do zobaczenia 27.05.2025! ❤️");
        stopConfetti(); 
        startHearts();
        document.querySelector('.buttons').style.display = 'none';
    });

    let currentScale = 1.0;

    function moveButtonRandomly() {
        if (noBtn.style.position !== 'fixed') {
            noBtn.style.position = 'fixed';
        }

        if (currentScale > 0.5) { 
            currentScale -= 0.1; 
        }
        noBtn.style.transform = `scale(${currentScale})`;

        const noBtnRect = noBtn.getBoundingClientRect();
        
        const maxX = window.innerWidth - noBtnRect.width - 50;
        const maxY = window.innerHeight - noBtnRect.height - 50;
        
        const safeMaxX = Math.max(0, maxX);
        const safeMaxY = Math.max(0, maxY);

        let newX, newY, overlap, attempts = 0;

        do {
            newX = Math.random() * safeMaxX + 20;
            newY = Math.random() * safeMaxY + 20;

            const yesRect = yesBtn.getBoundingClientRect();

            overlap = !(newX + noBtnRect.width < yesRect.left - 70 || 
                        newX > yesRect.right + 70 || 
                        newY + noBtnRect.height < yesRect.top - 70 || 
                        newY > yesRect.bottom + 70);
            
            attempts++;
        } while (overlap && attempts < 50);

        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
    }

    noBtn.addEventListener('mouseover', moveButtonRandomly);
    
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveButtonRandomly();
    });
    
    noBtn.addEventListener('click', (e) => { 
        e.preventDefault();
        moveButtonRandomly(); 
    });


    function startConfetti() {
        const colors = ['#d32f2f', '#4CAF50', '#ffeb3b', '#2196F3', '#9C27B0'];
        for(let i=0; i<80; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti'); 
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = -10 + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear infinite`;
            document.body.appendChild(confetti);
        }
        
        if (!document.getElementById('confetti-style')) {
            const style = document.createElement('style');
            style.id = 'confetti-style';
            style.innerHTML = `@keyframes fall { to { transform: translateY(110vh) rotate(720deg); } }`;
            document.head.appendChild(style);
        }
    }

    function stopConfetti() {
        const allConfetti = document.querySelectorAll('.confetti');
        allConfetti.forEach(el => el.remove());
    }

    function startHearts() {
        const colors = ['#ff0000', '#d32f2f', '#ff4081', '#ff80ab'];
        for(let i=0; i<60; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart'); 
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = Math.random() * -50 + 'px';
            heart.style.fontSize = Math.random() * 30 + 20 + 'px';
            heart.style.color = colors[Math.floor(Math.random() * colors.length)];
            
            const duration = Math.random() * 3 + 4;
            const delay = Math.random() * 2;
            heart.style.animation = `heartFall ${duration}s linear ${delay}s infinite`;
            
            document.body.appendChild(heart);
        }
        
        if (!document.getElementById('heart-style')) {
            const style = document.createElement('style');
            style.id = 'heart-style';
            style.innerHTML = `
                @keyframes heartFall {
                    0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(110vh) rotate(${Math.random() > 0.5 ? 20 : -20}deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
});
