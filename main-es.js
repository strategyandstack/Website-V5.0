import { salesArchitectureData as data } from './data-es.js';
import { createValuePropCard, createBlueprintNavItem, createBlueprintDisplay, createBlueprintAccordion, createPricingCard, createStatItem, createRoadmapItem, createFaqItem } from '../components.js';

const LANG = 'es';

const emailTemplates = {
    linkedin: `{{RANDOM | Hola {{firstName}} | {{firstName}},}} este es un mensaje en frío y sé que recibes muchos, así que seré breve.

Mensajes como este son la razón por la que Rockets Traffic ha ayudado a más de 105 profesionales a convertir su presencia en LinkedIn en una fuente constante de leads.

{{RANDOM | Estamos abriendo | Estamos lanzando}} un paquete de fin de año para solo 12 clientes.

{{RANDOM | Incluye | Dentro obtienes}} una actualización completa de perfil de LinkedIn, más 1 mes completo de outreach gestionado.

{{RANDOM | Si te interesa explorar esto | Si suena interesante}}, responde "Sí" y te comparto mi link de calendario.`,

    cold: `Asunto: {{RANDOM | Pregunta rápida sobre {{companyName}} | {{firstName}}, vi tu trabajo en {{companyName}}}}

{{RANDOM | Hola {{firstName}} | {{firstName}}}},

{{RANDOM | Noté | Vi}} que {{companyName}} {{RANDOM | está escalando rápidamente | ha estado creciendo}} y pensé que te podría interesar cómo hemos ayudado a empresas similares de {{industry}} a {{RANDOM | triplicar su pipeline | agendar 40+ reuniones mensuales}}.

Construimos sistemas de outbound llave en mano que {{RANDOM | corren en automático | escalan sin agregar personal}}.

{{RANDOM | ¿Tendría sentido | ¿Estarías abierto a}} una llamada de 15 minutos esta semana?

{{RANDOM | Saludos | Un abrazo}},
{{senderName}}`,

    followup: `{{RANDOM | Hola {{firstName}} | {{firstName}}}},

{{RANDOM | Dando seguimiento a mi último mensaje | Quería retomar}} - {{RANDOM | sé que estás ocupado | las cosas se entierran}}.

Ayudamos a empresas de {{industry}} como {{companyName}} a construir sistemas de outbound que {{RANDOM | generan leads en automático | agendan 30-50 reuniones por mes}}.

{{RANDOM | ¿Vale la pena una llamada de 10 minutos? | ¿Tendría sentido conectar?}}

{{RANDOM | {{senderName}} | Saludos, {{senderName}}}}`,

    breakup: `{{RANDOM | Hola {{firstName}} | {{firstName}}}},

{{RANDOM | Te he escrito varias veces | Este es mi último seguimiento}} - {{RANDOM | no quiero seguir llenando tu bandeja | respeto tu tiempo}}.

{{RANDOM | Si construir un motor de outbound predecible no es prioridad ahora | Si no es el momento correcto}}, {{RANDOM | lo entiendo totalmente | no hay problema}}.

{{RANDOM | Pero si algo cambia | Cuando estés listo}}, {{RANDOM | mi puerta siempre está abierta | sabes dónde encontrarme}}.

{{RANDOM | {{senderName}} | Un abrazo, {{senderName}}}}`
};

let currentBlueprintIndex = 0;
let typingInterval = null;
let isTyping = false;

document.addEventListener('DOMContentLoaded', () => {
    if (!data) return;
    initMouseGlow();
    initScrollProgress();
    initLayout();
    initNavScroll();
    initActiveNavHighlight();
    initEmailEditor();
    initEditorScrollFade();
    initBlueprintInteraction();
    initBlueprintAccordion();
    initSectionReveals();
    initRoadmapAnimation();
    initFaqAnimations();
    initStatsCounter();
    initMobileStickyCta();
    initAnimations();
    lucide.createIcons();
});

function initMouseGlow() {
    const glow = document.createElement('div');
    glow.className = 'mouse-glow';
    document.body.appendChild(glow);
    let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;
    document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });
    function animate() { glowX += (mouseX - glowX) * 0.1; glowY += (mouseY - glowY) * 0.1; glow.style.left = glowX + 'px'; glow.style.top = glowY + 'px'; requestAnimationFrame(animate); }
    animate();
}

function initScrollProgress() {
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    document.body.appendChild(progress);
    window.addEventListener('scroll', () => { progress.style.transform = `scaleX(${window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)})`; }, { passive: true });
}

function initNavScroll() {
    const nav = document.querySelector('nav');
    if (nav) window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50), { passive: true });
}

function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!sections.length || !navLinks.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`)); });
    }, { threshold: 0.3 });
    sections.forEach(section => observer.observe(section));
}

function initEditorScrollFade() {
    const editor = document.querySelector('.email-editor-container');
    if (!editor) return;
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > 200) { editor.style.opacity = 1 - Math.min((scrollY - 200) / 300, 1); editor.style.transform = `translateY(${-(scrollY - 200) * 0.3}px)`; }
        else { editor.style.opacity = 1; editor.style.transform = 'translateY(0)'; }
    }, { passive: true });
}

function initSectionReveals() {
    const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }); }, { threshold: 0.1 });
    document.querySelectorAll('.section-reveal').forEach(el => observer.observe(el));
}

function initMobileStickyCta() {
    const sticky = document.querySelector('.mobile-sticky-cta');
    const hero = document.querySelector('.hero-content');
    const footer = document.querySelector('footer');
    if (!sticky || !hero) return;
    window.addEventListener('scroll', () => { sticky.classList.toggle('visible', hero.getBoundingClientRect().bottom < 0 && (footer ? footer.getBoundingClientRect().top : Infinity) > window.innerHeight); }, { passive: true });
}

function initLayout() {
    document.title = data.meta.name + " | " + data.meta.tagline;
    const vpContainer = document.getElementById('value-props');
    if (vpContainer) {
        vpContainer.innerHTML = createValuePropCard('Probado en Batalla', data.value_proposition.supporting, 'layers') +
            createValuePropCard('Propiedad Total', 'Construimos en tu infraestructura. Cuentas, datos y contenido se quedan contigo para siempre.', 'key') +
            createValuePropCard('El Resultado', data.value_proposition.outcome, 'rocket');
    }
    const gList = document.getElementById('guarantees-list');
    if (gList) {
        data.guarantee.what_we_guarantee.forEach(item => {
            const li = document.createElement('li');
            li.className = 'flex items-start gap-4 text-gray-400 group';
            li.innerHTML = `<div class="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-white group-hover:border-white transition-all"><i data-lucide="check" class="w-3 h-3 text-white group-hover:text-black"></i></div><span class="text-base font-medium leading-tight group-hover:text-white transition-colors">${item}</span>`;
            gList.appendChild(li);
        });
    }
    const mList = document.getElementById('market-depends-list');
    if (mList) mList.innerHTML = `<div class="market-dynamics"><div class="market-dynamics-label">Los resultados varían según el mercado</div><div class="market-dynamics-list">${data.guarantee.what_depends_on_market.map(item => `<span class="market-dynamics-item">${item}</span>`).join('')}</div></div>`;
    const statsGrid = document.getElementById('stats-grid');
    if (statsGrid) data.social_proof.stats.forEach(stat => statsGrid.innerHTML += createStatItem(stat));
    const blueprintContainer = document.getElementById('blueprints-container');
    if (blueprintContainer) {
        let navItems = data.blueprints.map((bp, i) => createBlueprintNavItem(bp, i === 0)).join('');
        blueprintContainer.innerHTML = `<div class="blueprint-dashboard"><div class="blueprint-nav">${navItems}</div><div class="blueprint-display active" id="blueprint-display">${createBlueprintDisplay(data.blueprints[0], LANG)}</div></div>${createBlueprintAccordion(data.blueprints, LANG)}`;
        setTimeout(() => animateHoursBars(), 100);
    }
    const pricingGrid = document.getElementById('pricing-grid');
    if (pricingGrid) data.packages.forEach(pkg => pricingGrid.innerHTML += createPricingCard(pkg, LANG));
    const roadmapContainer = document.getElementById('next-steps-container');
    if (roadmapContainer) data.next_steps.forEach((step, idx) => roadmapContainer.innerHTML += createRoadmapItem(step, idx));
    const faqContainer = document.getElementById('faq-container');
    if (faqContainer) data.faq.forEach((item, index) => faqContainer.innerHTML += createFaqItem(item, index));
    const primaryTitle = document.getElementById('cta-primary-title');
    if (primaryTitle) {
        primaryTitle.textContent = data.cta_sections.primary.headline;
        document.getElementById('cta-primary-sub').textContent = data.cta_sections.primary.subheadline;
        document.getElementById('cta-primary-btn').textContent = data.cta_sections.primary.button_text;
        document.getElementById('cta-primary-secondary').textContent = data.cta_sections.primary.secondary_text;
        document.getElementById('cta-secondary-title').textContent = data.cta_sections.secondary.headline;
        document.getElementById('cta-secondary-sub').textContent = data.cta_sections.secondary.subheadline;
        document.getElementById('cta-secondary-btn').textContent = data.cta_sections.secondary.button_text;
        document.getElementById('footer-tagline').textContent = data.footer.tagline || "";
        document.getElementById('footer-powered').textContent = data.footer.powered_by || "";
    }
}

function animateHoursBars() { document.querySelectorAll('.hours-bar[data-width]').forEach(bar => setTimeout(() => bar.style.width = bar.dataset.width, 200)); }

function initBlueprintAccordion() {
    document.querySelectorAll('.blueprint-accordion-item').forEach(item => {
        item.querySelector('.blueprint-accordion-header').addEventListener('click', () => {
            const wasActive = item.classList.contains('active');
            document.querySelectorAll('.blueprint-accordion-item').forEach(i => i.classList.remove('active'));
            if (!wasActive) item.classList.add('active');
        });
    });
}

function initRoadmapAnimation() {
    const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { setTimeout(() => entry.target.classList.add('visible'), parseInt(entry.target.dataset.index) * 100); observer.unobserve(entry.target); } }); }, { threshold: 0.2 });
    document.querySelectorAll('.roadmap-item').forEach(item => observer.observe(item));
}

function initFaqAnimations() {
    const items = document.querySelectorAll('.faq-item');
    const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { setTimeout(() => entry.target.classList.add('visible'), parseInt(entry.target.dataset.index) * 80); observer.unobserve(entry.target); } }); }, { threshold: 0.1 });
    items.forEach(item => observer.observe(item));
    items.forEach(item => {
        item.querySelector('summary').addEventListener('click', (e) => {
            const rect = item.getBoundingClientRect();
            item.style.setProperty('--ripple-x', ((e.clientX - rect.left) / rect.width) * 100 + '%');
            item.style.setProperty('--ripple-y', ((e.clientY - rect.top) / rect.height) * 100 + '%');
            item.classList.remove('ripple'); void item.offsetWidth; item.classList.add('ripple');
        });
    });
}

function initBlueprintInteraction() {
    const navItems = document.querySelectorAll('.blueprint-nav-item');
    const display = document.getElementById('blueprint-display');
    if (!navItems.length || !display) return;
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.dataset.blueprintIndex);
            if (index === currentBlueprintIndex) return;
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');
            loadBlueprint(index);
        });
    });
}

function loadBlueprint(index) {
    const display = document.getElementById('blueprint-display');
    const bp = data.blueprints[index];
    if (!display || !bp) return;
    currentBlueprintIndex = index;
    display.classList.remove('scanning', 'active'); void display.offsetWidth; display.classList.add('scanning');
    display.innerHTML = createBlueprintDisplay(bp, LANG);
    animateBlueprintContent(bp);
    setTimeout(() => display.classList.add('active'), 700);
    setTimeout(() => animateHoursBars(), 100);
    lucide.createIcons();
}

function animateBlueprintContent(bp) {
    const display = document.getElementById('blueprint-display');
    const title = display.querySelector('.display-title');
    if (title) scrambleText(title, bp.name.toUpperCase());
    display.querySelectorAll('.display-description, .display-timeline').forEach((el, i) => { el.style.opacity = '0'; el.style.transform = 'translateY(8px)'; setTimeout(() => { el.style.transition = 'all 0.4s ease'; el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, 100 + i * 50); });
    display.querySelectorAll('.feature-list li').forEach((el, i) => { el.style.opacity = '0'; el.style.transform = 'translateY(8px)'; setTimeout(() => { el.style.transition = 'all 0.3s ease'; el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, 250 + i * 40); });
    const footer = display.querySelector('.display-footer');
    if (footer) { footer.style.opacity = '0'; setTimeout(() => { footer.style.transition = 'opacity 0.4s ease'; footer.style.opacity = '1'; }, 450); }
}

function scrambleText(element, targetText) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let iteration = 0;
    const interval = setInterval(() => {
        element.textContent = targetText.split('').map((char, idx) => char === ' ' ? ' ' : idx < iteration ? targetText[idx] : chars[Math.floor(Math.random() * chars.length)]).join('');
        if (++iteration > targetText.length) { element.textContent = targetText; clearInterval(interval); }
    }, 25);
}

function initEmailEditor() {
    const tabs = document.querySelectorAll('.editor-tab');
    if (!tabs.length) return;
    Object.keys(emailTemplates).forEach(tabName => { const panel = document.getElementById(`tab-${tabName}`); if (panel) panel.querySelector('.editor-text').innerHTML = '<span class="typing-cursor"></span>'; });
    setTimeout(() => typeText('linkedin'), 500);
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            stopTyping();
            tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
            tab.classList.add('active'); tab.setAttribute('aria-selected', 'true');
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
            const activePanel = document.getElementById(`tab-${tabName}`);
            if (activePanel) { activePanel.classList.remove('hidden'); setTimeout(() => typeText(tabName), 50); }
        });
    });
}

function stopTyping() { if (typingInterval) { clearInterval(typingInterval); typingInterval = null; } isTyping = false; }

function typeText(tabName) {
    stopTyping();
    const panel = document.getElementById(`tab-${tabName}`);
    if (!panel) return;
    const textElement = panel.querySelector('.editor-text');
    const template = emailTemplates[tabName];
    if (!textElement || !template) return;
    isTyping = true;
    const highlightedText = highlightSyntax(template);
    const tempDiv = document.createElement('div'); tempDiv.innerHTML = highlightedText;
    const plainText = tempDiv.textContent || tempDiv.innerText;
    textElement.innerHTML = '<span class="typing-cursor"></span>';
    let charIndex = 0;
    typingInterval = setInterval(() => {
        if (!isTyping) { stopTyping(); return; }
        charIndex += 3;
        if (charIndex >= plainText.length) { textElement.innerHTML = highlightedText + '<span class="typing-cursor"></span>'; stopTyping(); setTimeout(() => { const cursor = textElement.querySelector('.typing-cursor'); if (cursor) cursor.style.opacity = '0'; }, 2000); }
        else { textElement.innerHTML = getPartialHighlightedText(highlightedText, charIndex) + '<span class="typing-cursor"></span>'; }
    }, 8);
}

function getPartialHighlightedText(html, charCount) {
    let result = '', visibleChars = 0, i = 0;
    while (i < html.length && visibleChars < charCount) {
        if (html[i] === '<') { const tagEnd = html.indexOf('>', i); if (tagEnd !== -1) { result += html.substring(i, tagEnd + 1); i = tagEnd + 1; continue; } }
        if (html[i] === '&') { const semi = html.indexOf(';', i); if (semi !== -1 && semi - i < 10) { result += html.substring(i, semi + 1); visibleChars++; i = semi + 1; continue; } }
        result += html[i]; visibleChars++; i++;
    }
    const open = (result.match(/<span[^>]*>/g) || []).length, close = (result.match(/<\/span>/g) || []).length;
    for (let j = 0; j < open - close; j++) result += '</span>';
    return result;
}

function highlightSyntax(text) {
    let escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    escaped = escaped.replace(/\{\{RANDOM\s*\|([^}]+)\}\}/g, (m, content) => {
        const parts = content.split('|').map(p => p.trim());
        const highlighted = parts.map((part, i) => { const v = part.replace(/\{\{(\w+)\}\}/g, '<span class="syntax-variable">{{$1}}</span>'); return i < parts.length - 1 ? v + ' <span class="syntax-pipe">|</span> ' : v; }).join('');
        return `<span class="syntax-random">{{RANDOM |</span> ${highlighted} <span class="syntax-random">}}</span>`;
    });
    return escaped.replace(/\{\{(\w+)\}\}/g, '<span class="syntax-variable">{{$1}}</span>');
}

function initStatsCounter() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                const counter = { value: 0 };
                gsap.to(counter, { value: target, duration: 1.5, ease: 'power2.out', onUpdate: () => entry.target.textContent = Math.round(counter.value), onComplete: () => { entry.target.classList.add('pulse'); setTimeout(() => entry.target.classList.remove('pulse'), 600); } });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stat-counter').forEach(stat => observer.observe(stat));
}

function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('#hero-headline', { opacity: 0, y: 50, duration: 1.2, ease: 'expo.out' });
    gsap.from('.hero-content p, .hero-content .flex', { opacity: 0, y: 25, duration: 1, stagger: 0.1, delay: 0.2, ease: 'power3.out' });
    gsap.from('.email-editor', { opacity: 0, scale: 0.96, duration: 1, delay: 0.4, ease: 'expo.out' });
    gsap.from('.blueprint-dashboard', { scrollTrigger: { trigger: '.blueprint-dashboard', start: 'top 85%' }, opacity: 0, y: 30, duration: 0.8, ease: 'expo.out' });
}
