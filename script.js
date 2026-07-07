const spreads = document.querySelectorAll('.spread');
const dotsEl = document.getElementById('dots');
const pageTitleEl = document.getElementById('page-title');
let current = 0;

spreads.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.onclick = () => goTo(i);
    dotsEl.appendChild(d);
});

function goTo(idx) {
    spreads[current].classList.remove('active');
    dotsEl.children[current].classList.remove('active');
    current = Math.max(0, Math.min(idx, spreads.length - 1));
    spreads[current].classList.add('active');
    dotsEl.children[current].classList.add('active');
    pageTitleEl.textContent = spreads[current].dataset.title;
    document.getElementById('btn-prev').disabled = current === 0;
    document.getElementById('btn-next').disabled = current === spreads.length - 1;
    spreads[current].querySelectorAll('.page-left,.page-right').forEach(p => p.scrollTop = 0);
    window.scrollTo(0, 0);
}

function navigate(d) { goTo(current + d); }

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') navigate(1);
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') navigate(-1);
});

let tx = 0;
document.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
document.addEventListener('touchend', e => {
    const diff = tx - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
}, { passive: true });

goTo(0);