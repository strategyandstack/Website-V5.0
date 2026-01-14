import { salesArchitectureData as data } from './data.js';
import { createValuePropCard, createBlueprintNavItem, createBlueprintDisplay, createBlueprintAccordion, createPricingCard, createStatItem, createRoadmapItem, createFaqItem, createMarketDynamics, createSecondaryCTANote } from './components.js';

const LANG = 'en';

const emailTemplates = {
    linkedin: `{{RANDOM | Hi {{firstName}} | Hello {{firstName}} | {{firstName}},}} this is a cold message and I know you get many, so I'll keep it brief.

Messages like this are the reason Rockets Traffic has helped more than 105 professionals turn their LinkedIn presence into a consistent source of leads.

{{RANDOM | We are opening | We're launching}} an end-of-year bundle for just 12 clients.

{{RANDOM | Inside you get | This includes}} a complete LinkedIn profile upgrade, plus 1 full month of done-for-you managed outreach.

{{RANDOM | If this feels worth exploring | If this sounds interesting}}, reply "Yes" and I'll share my calendar link.`,

    cold: `Subject: {{RANDOM | Quick question about {{companyName}} | {{firstName}}, saw your work at {{companyName}}}}

{{RANDOM | Hi {{firstName}} | Hello {{firstName}}}},

{{RANDOM | I noticed | I saw}} {{companyName}} {{RANDOM | is scaling rapidly | has been growing}} and thought you might be interested in how we've helped similar {{industry}} companies {{RANDOM | 3x their pipeline | book 40+ meetings monthly}}.

We build done-for-you outbound systems that {{RANDOM | run on autopilot | scale without adding headcount}}.

{{RANDOM | Would it make sense | Would you be open}} to chat for 15 minutes this week?

{{RANDOM | Best | Cheers}},
{{senderName}}`,

    followup: `{{RANDOM | Hi {{firstName}} | Hey {{firstName}}}},

{{RANDOM | Following up on my last message | Wanted to circle back}} - {{RANDOM | I know you're busy | things get buried}}.

We help {{industry}} companies like {{companyName}} build outbound systems that {{RANDOM | generate leads on autopilot | book 30-50 meetings per month}}.

{{RANDOM | Worth a 10-minute call? | Would a quick chat make sense?}}

{{RANDOM | {{senderName}} | Best, {{senderName}}}}`,

    breakup: `{{RANDOM | Hi {{firstName}} | Hey {{firstName}}}},

{{RANDOM | I've reached out a few times | This is my last follow-up}} - {{RANDOM | I don't want to keep filling your inbox | I respect your time}}.

{{RANDOM | If building a predictable outbound engine isn't a priority right now | If now isn't the right time}}, {{RANDOM | totally understand | no worries}}.

{{RANDOM | But if anything changes | When you're ready}}, {{RANDOM | my door is always open | you know where to find me}}.

{{RANDOM | {{senderName}} | All the best, {{senderName}}}}`
};

let currentBlueprintIndex = 0;
let typingInterval = null;
let isTyping = false;
let ctaHoverTimeout = null;
let blurOverlay = null;

document.addEventListener('DOMContentLoaded', () => {
    if (!data) return;
    initBlurOverlay();
    initMouseGlow();
    initScrollProgress();
    initLayout();
    initNavScroll();
    initActiveNavHighlight();
    initSmoothScroll();
    initEmailEditor();
    initEditorScrollEffect();
    initBlueprintInteraction();
    initBlueprintAccordion();
    initSectionReveals();
    initRoadmapAnimation();
    initFaqAnimations();
    initStatsCounter();
    initMobileStickyCta();
    initCTAFocusEffect();
    initAnimations();
    lucide.createIcons();
});

function initBlurOverlay() {
    blurOverlay = document.createElement('div');
    blurOverlay.className = 'page-blur-overlay';
    document.body.appendChild(blurOverlay);
}

function initMouseGlow() {
    const glow = document.createElement('div');
    glow.className = 'mouse-glow';
    document.body.appendChild(glow);
    let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;
    document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });
    function animate() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(animate);
    }
    animate();
}

function initScrollProgress() {
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    document.body.appendChild(progress);
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = `scaleX(${scrollTop / docHeight})`;
    }, { passive: true });
}

function initNavScroll() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
}

function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!sections.length || !navLinks.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
            }
        });
    }, { threshold: 0.3 });
    sections.forEach(section => observer.observe(section));
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function initEditorScrollEffect() {
    const editor = document.querySelector('.email-editor-container');
    const statsSection = document.getElementById('stats-section');
    if (!editor || !statsSection) return;
    
    const heroSection = editor.closest('section');
    if (!heroSection) return;
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const statsTop = statsSection.offsetTop;
        
        // Calculate progress (0 to 1) as we scroll through the hero
        const scrollStart = 100;
        const scrollEnd = statsTop - 100;
        const progress = Math.max(0, Math.min(1, (scrollY - scrollStart) / (scrollEnd - scrollStart)));
        
        if (scrollY < scrollStart) {
            // Before scroll effect starts
            editor.style.transform = 'perspective(1000px) rotateX(0deg) scale(1)';
            editor.style.opacity = '1';
        } else if (progress < 1) {
            // During scroll - scale up and apply trapezoid effect (coming toward viewer)
            const scale = 1 + (progress * 0.15); // Scale up to 1.15
            const rotateX = progress * -8; // Tilt top away (trapezoid effect)
            const translateY = progress * -30; // Move up slightly
            
            editor.style.transform = `perspective(1000px) rotateX(${rotateX}deg) scale(${scale}) translateY(${translateY}px)`;
            editor.style.opacity = Math.max(0, 1 - (progress * 1.2));
        } else {
            // After stats section - fully hidden
            editor.style.opacity = '0';
        }
    }, { passive: true });
}

function initCTAFocusEffect() {
    const ctaSelectors = '.btn-primary, .btn-secondary, .display-cta, .pricing-cta';
    const ctas = document.querySelectorAll(ctaSelectors);
    
    ctas.forEach(cta => {
        cta.addEventListener('mouseenter', () => {
            ctaHoverTimeout = setTimeout(() => {
                blurOverlay.classList.add('active');
                cta.classList.add('cta-focus');
                // Elevate parent card above blur
                const parentCard = cta.closest('.glass-card, .pricing-card, .blueprint-display');
                if (parentCard) parentCard.classList.add('card-elevated');
            }, 300);
        });
        
        cta.addEventListener('mouseleave', () => {
            if (ctaHoverTimeout) {
                clearTimeout(ctaHoverTimeout);
                ctaHoverTimeout = null;
            }
            blurOverlay.classList.remove('active');
            cta.classList.remove('cta-focus');
            // Remove elevation from parent card
            const parentCard = cta.closest('.glass-card, .pricing-card, .blueprint-display');
            if (parentCard) parentCard.classList.remove('card-elevated');
        });
    });
}

function initSectionReveals() {
    const reveals = document.querySelectorAll('.section-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));
}

function initMobileStickyCta() {
    const sticky = document.querySelector('.mobile-sticky-cta');
    const hero = document.querySelector('.hero-content');
    const footer = document.querySelector('footer');
    if (!sticky || !hero) return;
    window.addEventListener('scroll', () => {
        const heroBottom = hero.getBoundingClientRect().bottom;
        const footerTop = footer ? footer.getBoundingClientRect().top : Infinity;
        sticky.classList.toggle('visible', heroBottom < 0 && footerTop > window.innerHeight);
    }, { passive: true });
}

function initLayout() {
    document.title = data.meta.name + " | " + data.meta.tagline;
    
    const vpContainer = document.getElementById('value-props');
    if (vpContainer) {
        vpContainer.innerHTML = createValuePropCard('Battle Tested', data.value_proposition.supporting, 'layers') +
            createValuePropCard('Full Ownership', 'We build on your infrastructure. Accounts, data, and content stay with you forever.', 'key') +
            createValuePropCard('The Outcome', data.value_proposition.outcome, 'rocket');
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
    if (mList) {
        mList.innerHTML = createMarketDynamics(data.guarantee.what_depends_on_market, LANG);
    }
    
    const statsGrid = document.getElementById('stats-grid');
    if (statsGrid) statsGrid.innerHTML = data.social_proof.stats.map(s => createStatItem(s)).join('');
    
    const bpContainer = document.getElementById('blueprints-container');
    if (bpContainer) {
        bpContainer.innerHTML = `
<div class="blueprint-dashboard section-reveal">
    <div class="blueprint-nav">${data.blueprints.map((bp, i) => createBlueprintNavItem(bp, i === 0)).join('')}</div>
    <div class="blueprint-display" id="blueprint-display">${createBlueprintDisplay(data.blueprints[0], LANG)}</div>
</div>
${createBlueprintAccordion(data.blueprints, LANG)}`;
        setTimeout(() => {
            const display = document.getElementById('blueprint-display');
            if (display) display.classList.add('active');
            animateHoursBars();
        }, 100);
    }
    
    const pricingGrid = document.getElementById('pricing-grid');
    if (pricingGrid) pricingGrid.innerHTML = data.packages.map(p => createPricingCard(p, LANG)).join('');
    
    const stepsContainer = document.getElementById('next-steps-container');
    if (stepsContainer) stepsContainer.innerHTML = data.next_steps.map((s, i) => createRoadmapItem(s, i)).join('');
    
    const faqContainer = document.getElementById('faq-container');
    if (faqContainer) faqContainer.innerHTML = data.faq.map((f, i) => createFaqItem(f, i)).join('');
    
    const ctaPrimaryTitle = document.getElementById('cta-primary-title');
    const ctaPrimarySub = document.getElementById('cta-primary-sub');
    const ctaPrimaryBtn = document.getElementById('cta-primary-btn');
    const ctaPrimarySecondary = document.getElementById('cta-primary-secondary');
    if (ctaPrimaryTitle) ctaPrimaryTitle.textContent = data.cta_sections.primary.headline;
    if (ctaPrimarySub) ctaPrimarySub.textContent = data.cta_sections.primary.subheadline;
    if (ctaPrimaryBtn) ctaPrimaryBtn.textContent = data.cta_sections.primary.button_text;
    if (ctaPrimarySecondary) ctaPrimarySecondary.textContent = data.cta_sections.primary.secondary_text;
    
    const ctaSecondaryTitle = document.getElementById('cta-secondary-title');
    const ctaSecondarySub = document.getElementById('cta-secondary-sub');
    const ctaSecondaryBtn = document.getElementById('cta-secondary-btn');
    const ctaSecondaryCard = document.getElementById('cta-secondary-card');
    if (ctaSecondaryTitle) ctaSecondaryTitle.textContent = data.cta_sections.secondary.headline;
    if (ctaSecondarySub) ctaSecondarySub.textContent = data.cta_sections.secondary.subheadline;
    if (ctaSecondaryBtn) ctaSecondaryBtn.textContent = data.cta_sections.secondary.button_text;
    
    // Add secondary note to the secondary CTA card
    if (ctaSecondaryCard && data.cta_sections.secondary.note_text) {
        const noteHtml = createSecondaryCTANote(data.cta_sections.secondary.note_text, data.cta_sections.secondary.scarcity_text);
        ctaSecondaryCard.insertAdjacentHTML('beforeend', noteHtml);
    }
    
    const footerTagline = document.getElementById('footer-tagline');
    const footerPowered = document.getElementById('footer-powered');
    if (footerTagline) footerTagline.textContent = data.footer.tagline;
    if (footerPowered) footerPowered.textContent = data.footer.powered_by;
}

function animateHoursBars() {
    document.querySelectorAll('.hours-bar[data-width]').forEach(bar => {
        setTimeout(() => { bar.style.width = bar.dataset.width; }, 100);
    });
}

function initRoadmapAnimation() {
    const items = document.querySelectorAll('.roadmap-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), parseInt(entry.target.dataset.index) * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    items.forEach(item => observer.observe(item));
}

function initFaqAnimations() {
    const items = document.querySelectorAll('.faq-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), parseInt(entry.target.dataset.index) * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    items.forEach(item => observer.observe(item));
    items.forEach(item => {
        item.querySelector('summary').addEventListener('click', (e) => {
            const rect = item.getBoundingClientRect();
            item.style.setProperty('--ripple-x', ((e.clientX - rect.left) / rect.width) * 100 + '%');
            item.style.setProperty('--ripple-y', ((e.clientY - rect.top) / rect.height) * 100 + '%');
            item.classList.remove('ripple');
            void item.offsetWidth;
            item.classList.add('ripple');
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

function initBlueprintAccordion() {
    const items = document.querySelectorAll('.blueprint-accordion-item');
    items.forEach(item => {
        item.querySelector('.blueprint-accordion-header').addEventListener('click', () => {
            const wasActive = item.classList.contains('active');
            items.forEach(i => i.classList.remove('active'));
            if (!wasActive) item.classList.add('active');
        });
    });
}

function loadBlueprint(index) {
    const display = document.getElementById('blueprint-display');
    const bp = data.blueprints[index];
    if (!display || !bp) return;
    currentBlueprintIndex = index;
    display.classList.remove('scanning', 'active');
    void display.offsetWidth;
    display.classList.add('scanning');
    display.innerHTML = createBlueprintDisplay(bp, LANG);
    animateBlueprintContent(bp);
    setTimeout(() => display.classList.add('active'), 700);
    setTimeout(() => animateHoursBars(), 100);
    initCTAFocusEffect(); // Re-init for new CTAs
    lucide.createIcons();
}

function animateBlueprintContent(bp) {
    const display = document.getElementById('blueprint-display');
    const title = display.querySelector('.display-title');
    if (title) scrambleText(title, bp.name.toUpperCase());
    display.querySelectorAll('.display-description, .display-timeline').forEach((el, i) => {
        el.style.opacity = '0'; el.style.transform = 'translateY(8px)';
        setTimeout(() => { el.style.transition = 'all 0.4s ease'; el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, 100 + i * 50);
    });
    display.querySelectorAll('.feature-list li').forEach((el, i) => {
        el.style.opacity = '0'; el.style.transform = 'translateY(8px)';
        setTimeout(() => { el.style.transition = 'all 0.3s ease'; el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, 250 + i * 40);
    });
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
    Object.keys(emailTemplates).forEach(tabName => {
        const panel = document.getElementById(`tab-${tabName}`);
        if (panel) panel.querySelector('.editor-text').innerHTML = '<span class="typing-cursor"></span>';
    });
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
        if (charIndex >= plainText.length) {
            textElement.innerHTML = highlightedText + '<span class="typing-cursor"></span>';
            stopTyping();
            setTimeout(() => { const cursor = textElement.querySelector('.typing-cursor'); if (cursor) cursor.style.opacity = '0'; }, 2000);
        } else {
            textElement.innerHTML = getPartialHighlightedText(highlightedText, charIndex) + '<span class="typing-cursor"></span>';
        }
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
        const highlighted = parts.map((part, i) => {
            const v = part.replace(/\{\{(\w+)\}\}/g, '<span class="syntax-variable">{{$1}}</span>');
            return i < parts.length - 1 ? v + ' <span class="syntax-pipe">|</span> ' : v;
        }).join('');
        return `<span class="syntax-random">{{RANDOM |</span> ${highlighted} <span class="syntax-random">}}</span>`;
    });
    return escaped.replace(/\{\{(\w+)\}\}/g, '<span class="syntax-variable">{{$1}}</span>');
}

function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-counter');
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
    stats.forEach(stat => observer.observe(stat));
}

function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('#hero-headline', { opacity: 0, y: 50, duration: 1.2, ease: 'expo.out' });
    gsap.from('.hero-content p, .hero-content .flex', { opacity: 0, y: 25, duration: 1, stagger: 0.1, delay: 0.2, ease: 'power3.out' });
    gsap.from('.email-editor', { opacity: 0, scale: 0.96, duration: 1, delay: 0.4, ease: 'expo.out' });
    // Removed blueprint-dashboard animation - conflicts with section-reveal CSS
}
