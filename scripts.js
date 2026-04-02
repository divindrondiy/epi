document.addEventListener('DOMContentLoaded', async () => {

    lucide.createIcons();

    let data = {};
    try {
        const response = await fetch('data.json');
        data = await response.json();
    } catch (e) {
        console.error('Data not found, using fallbacks');
    }

    const benefitsGrid = document.getElementById('benefits-grid');
    if (data.benefits) {
        data.benefits.forEach(item => {
            const div = document.createElement('div');
            div.className = 'flex flex-col items-center text-center p-8 rounded-[30px] bg-white border border-zinc-100 benefit-card';
            div.innerHTML = `
                <div class="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 mb-6">
                    <i data-lucide="${item.icon}"></i>
                </div>
                <h3 class="text-xl font-bold mb-4">${item.title}</h3>
                <p class="text-zinc-500 leading-relaxed">${item.desc}</p>
            `;
            benefitsGrid.appendChild(div);
        });
        lucide.createIcons();
    }

    // Закомментировал или удалил добавление карточек через JS, 
    // чтобы не создавались дубликаты
    /*
    const servicesGrid = document.getElementById('services-grid');
    if (data.services) {
        data.services.forEach(item => {
            const card = document.createElement('div');
            card.className = 'service-card group bg-zinc-50 p-10 rounded-[40px] border border-transparent hover:border-pink-100 hover:bg-white flex flex-col justify-between h-full cursor-default';
            card.innerHTML = `
                <div>
                    <div class="flex justify-between items-start mb-8">
                        <span class="text-xs font-bold uppercase tracking-widest text-zinc-400 group-hover:text-pink-400 transition-colors">0${item.id}</span>
                        <div class="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 group-hover:bg-zinc-900 group-hover:text-white transition-all">
                            <i data-lucide="arrow-up-right" class="w-5 h-5"></i>
                        </div>
                    </div>
                    <h3 class="text-2xl font-serif mb-4">${item.title}</h3>
                    <p class="text-zinc-500 mb-8 leading-relaxed">${item.desc}</p>
                </div>
                <div class="flex justify-between items-center pt-6 border-t border-zinc-200/50">
                    <span class="text-sm font-medium text-zinc-400">${item.time}</span>
                    <span class="font-bold text-lg">${item.price}</span>
                </div>
            `;
            servicesGrid.appendChild(card);
        });
        lucide.createIcons();
    }
    */

    const reviewsContainer = document.getElementById('reviews-container');
    if (data.reviews) {
        data.reviews.forEach(review => {
            const div = document.createElement('div');
            div.className = 'p-10 rounded-[30px] border border-zinc-100 bg-white review-item shadow-sm';
            div.innerHTML = `
                <div class="flex gap-1 mb-6">
                    ${Array(review.rating).fill('<i data-lucide="star" class="w-4 h-4 fill-yellow-400 text-yellow-400"></i>').join('')}
                </div>
                <p class="text-zinc-700 italic mb-8 leading-relaxed">"${review.text}"</p>
                <div class="flex justify-between items-center">
                    <span class="font-bold">${review.name}</span>
                    <span class="text-xs text-zinc-400 uppercase tracking-widest">${review.date}</span>
                </div>
            `;
            reviewsContainer.appendChild(div);
        });
        lucide.createIcons();
    }

    gsap.registerPlugin(ScrollTrigger);

    gsap.from("#hero-content > *", {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from("#hero-img", {
        scale: 1.2,
        opacity: 0,
        duration: 2,
        ease: "power2.out"
    });

    gsap.from(".benefit-card", {
        scrollTrigger: {
            trigger: "#benefits-grid",
            start: "top 80%",
        },
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8
    });

    // Анимация для сервисных карточек УБРАНА полностью
    // Карточки уже видны в HTML и не нуждаются в анимации

    window.addEventListener('scroll', () => {
        const header = document.getElementById('main-header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Заявка отправлена!';
            btn.classList.remove('bg-pink-500');
            btn.classList.add('bg-green-500');
            form.reset();
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.classList.remove('bg-green-500');
                btn.classList.add('bg-pink-500');
            }, 3000);
        });
    }
});
