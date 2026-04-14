document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SELETORES GLOBAIS (Declarados apenas uma vez) ---
    const selectArea = document.getElementById('area');
    const formContato = document.querySelector('.contato form');
    const header = document.querySelector('.header');

    // --- 2. MUDANÇA DE COR DO FORMULÁRIO ---
    if (selectArea && formContato) {
        selectArea.addEventListener('change', function() {
            // Remove classes antigas e adiciona a nova baseada no valor
            formContato.classList.remove('status-personal', 'status-nutricao', 'status-saude');
            const valor = this.value;
            if (valor) {
                formContato.classList.add(`status-${valor}`);
            }
        });
    }

    // --- 3. HEADER FIXO (Efeito ao rolar) ---
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    header.classList.add('header--scrolled');
                    header.style.backgroundColor = 'rgba(5, 5, 5, 0.98)';
                } else {
                    header.classList.remove('header--scrolled');
                    header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // --- 4. SCROLL SUAVE PARA LINKS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 5. EFEITO 3D NOS CARDS DE PLANOS ---
    const planos = document.querySelectorAll('.plano');
    planos.forEach(plano => {
        plano.addEventListener('mousemove', (e) => {
            const rect = plano.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = (rect.height / 2 - y) / 10;
            const rotateY = (x - rect.width / 2) / 10;
            plano.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        plano.addEventListener('mouseleave', () => {
            plano.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
        });
    });

    // --- 6. ANIMAÇÃO DE REVELAÇÃO (Reveal on Scroll) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.team-card, .plano, .pilar').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});

// --- 7. FUNÇÕES GLOBAIS (Fora do DOMContentLoaded para o HTML encontrar) ---

// Função para os cards clicáveis preencherem o formulário
function selecionarProfissional(area) {
    const selectArea = document.getElementById('area');
    const inputNome = document.getElementById('nome');
    const sectionContato = document.getElementById('contato');

    if (selectArea) {
        selectArea.value = area;
        selectArea.dispatchEvent(new Event('change')); // Ativa a cor do form

        if (sectionContato) {
            window.scrollTo({
                top: sectionContato.offsetTop - 80,
                behavior: 'smooth'
            });
        }
        if (inputNome) inputNome.focus();
    }
}

// Função para enviar o WhatsApp
function enviarWhats(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const area = document.getElementById('area').value;
    const mensagem = document.getElementById('mensagem').value;

    const dados = {
        'saude': { n: "5561991463375", p: "Dra. Geovana" },
        'nutricao': { n: "556191887614", p: "Nutri Fernanda" },
        'personal': { n: "556186351036", p: "Personal Fernando" }
    };

    if (dados[area]) {
        const { n, p } = dados[area];
        const texto = `Olá ${p}! Meu nome é ${nome}. Gostaria de agendar um atendimento.%0A%0AObjetivo: ${mensagem}`;
        window.open(`https://wa.me/${n}?text=${texto}`, '_blank');
    } else {
        alert("Por favor, selecione uma área de atendimento.");
    }
}