import { salesArchitectureData as data } from './data.js';
import { 
    createValuePropCard, 
    createBlueprintNavItem,
    createBlueprintDisplay,
    createBlueprintAccordion,
    createPricingCard, 
    createStatItem,
    createRoadmapItem,
    createFaqItem
} from './components.js';

const emailTemplates = {
    linkedin: `{{RANDOM | Hi {{firstName}} | Hello {{firstName}} | {{firstName}},}} this is a cold message and I know you get many, so I'll keep it brief.

{{RANDOM | Still | Even so | Nevertheless}}, messages like this are the reason Rockets Traffic has helped more than 105 professionals turn their LinkedIn presence into a consistent source of leads.

{{RANDOM | We are opening | We're launching | We have available}} an end-of-year bundle for just 12 clients.

{{RANDOM | Inside you get | This includes | You'll receive}} a complete LinkedIn profile + company page upgrade, plus 1 full month of done-for-you managed outreach.

{{RANDOM | If this feels worth exploring | If this sounds interesting | If you'd like to learn more}}, reply "Yes" and I'll share my calendar link.`,

    cold: `Subject: {{RANDOM | Quick question about {{companyName}} | {{firstName}}, saw your work at {{companyName}}}}

{{RANDOM | Hi {{firstName}} | Hello {{firstName}} | Hey {{firstName}}}},

{{RANDOM | I noticed | I came across | I saw}} {{companyName}} {{RANDOM | is scaling rapidly | has been growing}} and thought you might be interested in how we've helped similar {{industry}} companies {{RANDOM | 3x their pipeline | book 40+ meetings monthly}}.

{{RANDOM | The short version | Here's the gist}}: We build done-for-you outbound systems that {{RANDOM | run on autopilot | require zero maintenance}}.

{{RANDOM | Would it make sense | Would you be open}} to chat for 15 minutes this week?

{{RANDOM | Best | Cheers}},
{{senderName}}`,

    followup: `{{RANDOM | Hi {{firstName}} | Hey {{firstName}}}},

{{RANDOM | Following up on my last message | Wanted to circle back}} - {{RANDOM | I know you're busy | things get buried}}.

{{RANDOM | Quick recap | In case you missed it}}: We help {{industry}} companies like {{companyName}} build outbound systems that {{RANDOM | generate leads on autopilot | book 30-50 meetings per month}}.

{{RANDOM | Worth a 10-minute call? | Would a quick chat make sense?}}

{{RANDOM | {{senderName}} | Best, {{senderName}}}}`,

    breakup: `{{RANDOM | Hi {{firstName}} | Hey {{firstName}}}},

{{RANDOM | I've reached out a few times | This is my last follow-up}} - {{RANDOM | I don't want to keep filling your inbox | I respect your time}}.

{{RANDOM | If building a predictable outbound engine for {{companyName}} isn't a priority right now | If now isn't the right time}}, {{RANDOM | totally understand | no worries}}.

{{RANDOM | But if anything changes | When you're ready}}, {{RANDOM | my door is always open | you know where to find me}}.

{{RANDOM | {{senderName}} | All the best, {{senderName}}}}`
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

// Mouse glow trail
function initMouseGlow() {
    const glow = document.createElement('div');
    glow.className = 'mouse-glow';
    document.body.appendChild(glow);
    
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateGlow() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }
    animateGlow();
}

// Scroll progress bar
function initScrollProgress() {
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    document.body.appendChild(progress);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        progress.style.transform = `scaleX(${scrollPercent})`;
    }, { passive: true });
}

// Nav scroll effect
function initNavScroll() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }, { passive: true });
}

// Active nav highlighting
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => observer.observe(section));
}

// Email editor fade on scroll
function initEditorScrollFade() {
    const editor = document.querySelector('.email-editor-container');
    if (!editor) return;
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const fadeStart = 200;
        const fadeEnd = 500;
        
        if (scrollY > fadeStart) {
            const opacity = 1 - Math.min((scrollY - fadeStart) / (fadeEnd - fadeStart), 1);
            editor.style.opacity = opacity;
            editor.style.transform = `translateY(${-(scrollY - fadeStart) * 0.3}px)`;
        } else {
            editor.style.opacity = 1;
            editor.style.transform = 'translateY(0)';
        }
    }, { passive: true });
}

// Section reveal animations
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

// Mobile sticky CTA
function initMobileStickyCta() {
    const sticky = document.querySelector('.mobile-sticky-cta');
    const hero = document.querySelector('.hero-content');
    const footer = document.querySelector('footer');
    
    if (!sticky || !hero) return;
    
    window.addEventListener('scroll', () => {
        const heroBottom = hero.getBoundingClientRect().bottom;
        const footerTop = footer ? footer.getBoundingClientRect().top : Infinity;
        
        if (heroBottom < 0 && footerTop > window.innerHeight) {
            sticky.classList.add('visible');
        } else {
            sticky.classList.remove('visible');
        }
    }, { passive: true });
}

function initLayout() {
    document.title = data.meta.name + " | " + data.meta.tagline;

    // Value Props
    const vpContainer = document.getElementById('value-props');
    if (vpContainer) {
        vpContainer.innerHTML = 
            createValuePropCard('Battle Tested', data.value_proposition.supporting, 'layers') +
            createValuePropCard('Full Ownership', 'We build on your infrastructure. Accounts, data, and content stay with you forever.', 'key') +
            createValuePropCard('The Outcome', data.value_proposition.outcome, 'rocket');
    }

    // Guarantees
    const gList = document.getElementById('guarantees-list');
    if (gList) {
        data.guarantee.what_we_guarantee.forEach(item => {
            const li = document.createElement('li');
            li.className = 'flex items-start gap-4 text-gray-400 group';
            li.innerHTML = `
                <div class="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-white group-hover:border-white transition-all">
                    <i data-lucide="check" class="w-3 h-3 text-white group-hover:text-black"></i>
                </div>
                <span class="text-base font-medium leading-tight group-hover:text-white transition-colors">${item}</span>
            `;
            gList.appendChild(li);
        });
    }

    // Market Dynamics
    const mList = document.getElementById('market-depends-list');
    if (mList) {
        mList.innerHTML = `
            <div class="market-dynamics">
                <div class="market-dynamics-label">Results vary by market</div>
                <div class="market-dynamics-list">
                    ${data.guarantee.what_depends_on_market.map(item => 
                        `<span class="market-dynamics-item">${item}</span>`
                    ).join('')}
                </div>
            </div>
        `;
    }

    // Stats
    const statsGrid = document.getElementById('stats-grid');
    if (statsGrid) {
        data.social_proof.stats.forEach(stat => {
            statsGrid.innerHTML += createStatItem(stat);
        });
    }

    // Blueprints - Desktop nav + display, Mobile accordion
    const blueprintContainer = document.getElementById('blueprints-container');
    if (blueprintContainer) {
        let navItems = '';
        data.blueprints.forEach((bp, index) => {
            navItems += createBlueprintNavItem(bp, index === 0);
        });
        
        blueprintContainer.innerHTML = `
            <div class="blueprint-dashboard">
                <div class="blueprint-nav">
                    ${navItems}
                </div>
                <div class="blueprint-display active" id="blueprint-display">
                    ${createBlueprintDisplay(data.blueprints[0])}
                </div>
            </div>
            ${createBlueprintAccordion(data.blueprints)}
        `;
        
        // Animate hours bars after render
        setTimeout(() => animateHoursBars(), 100);
    }

    // Pricing
    const pricingGrid = document.getElementById('pricing-grid');
    if (pricingGrid) {
        data.packages.forEach(pkg => {
            pricingGrid.innerHTML += createPricingCard(pkg);
        });
    }

    // Roadmap
    const roadmapContainer = document.getElementById('next-steps-container');
    if (roadmapContainer) {
        data.next_steps.forEach((step, idx) => {
            roadmapContainer.innerHTML += createRoadmapItem(step, idx);
        });
    }

    // FAQ
    const faqContainer = document.getElementById('faq-container');
    if (faqContainer) {
        data.faq.forEach((item, index) => {
            faqContainer.innerHTML += createFaqItem(item, index);
        });
    }

    // CTA Sections
    const primaryTitle = document.getElementById('cta-primary-title');
    if(primaryTitle) {
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

// Animate hours progress bars
function animateHoursBars() {
    const bars = document.querySelectorAll('.hours-bar[data-width]');
    bars.forEach(bar => {
        const width = bar.dataset.width;
        setTimeout(() => {
            bar.style.width = width;
        }, 200);
    });
}

// Blueprint accordion for mobile
function initBlueprintAccordion() {
    const items = document.querySelectorAll('.blueprint-accordion-item');
    
    items.forEach(item => {
        const header = item.querySelector('.blueprint-accordion-header');
        header.addEventListener('click', () => {
            const wasActive = item.classList.contains('active');
            
            // Close all
            items.forEach(i => i.classList.remove('active'));
            
            // Open clicked if wasn't active
            if (!wasActive) {
                item.classList.add('active');
            }
        });
    });
}

// Roadmap animation
function initRoadmapAnimation() {
    const items = document.querySelectorAll('.roadmap-item');
    if (items.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.index) * 100;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    items.forEach(item => observer.observe(item));
}

// FAQ animations with ripple
function initFaqAnimations() {
    const items = document.querySelectorAll('.faq-item');
    
    // Reveal animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.index) * 80;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    items.forEach(item => observer.observe(item));
    
    // Ripple effect on click
    items.forEach(item => {
        const summary = item.querySelector('summary');
        summary.addEventListener('click', (e) => {
            const rect = item.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            item.style.setProperty('--ripple-x', x + '%');
            item.style.setProperty('--ripple-y', y + '%');
            
            item.classList.remove('ripple');
            void item.offsetWidth;
            item.classList.add('ripple');
        });
    });
}

// Blueprint interaction (desktop)
function initBlueprintInteraction() {
    const navItems = document.querySelectorAll('.blueprint-nav-item');
    const display = document.getElementById('blueprint-display');
    
    if (navItems.length === 0 || !display) return;
    
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
    
    // Scan animation
    display.classList.remove('scanning', 'active');
    void display.offsetWidth;
    display.classList.add('scanning');
    
    // Update content
    display.innerHTML = createBlueprintDisplay(bp);
    
    // Animate content
    animateBlueprintContent(bp);
    
    // Show lightbar after scan
    setTimeout(() => {
        display.classList.add('active');
    }, 700);
    
    // Animate hours bars
    setTimeout(() => animateHoursBars(), 100);
    
    lucide.createIcons();
}

function animateBlueprintContent(bp) {
    const display = document.getElementById('blueprint-display');
    
    // Scramble title
    const title = display.querySelector('.display-title');
    if (title) {
        scrambleText(title, `${bp.name.toUpperCase()} BLUEPRINT`);
    }
    
    // Fade elements
    const fadeEls = display.querySelectorAll('.display-description, .display-timeline');
    fadeEls.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(8px)';
        setTimeout(() => {
            el.style.transition = 'all 0.4s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 + (i * 50));
    });
    
    // Features stagger
    const features = display.querySelectorAll('.feature-list li');
    features.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(8px)';
        setTimeout(() => {
            el.style.transition = 'all 0.3s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 250 + (i * 40));
    });
    
    // Footer
    const footer = display.querySelector('.display-footer');
    if (footer) {
        footer.style.opacity = '0';
        setTimeout(() => {
            footer.style.transition = 'opacity 0.4s ease';
            footer.style.opacity = '1';
        }, 450);
    }
}

function scrambleText(element, targetText) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let iteration = 0;
    const interval = setInterval(() => {
        element.textContent = targetText.split('').map((char, idx) => {
            if (char === ' ') return ' ';
            if (idx < iteration) return targetText[idx];
            return chars[Math.floor(Math.random() * chars.length)];
        }).join('');
        
        iteration += 1;
        if (iteration > targetText.length) {
            element.textContent = targetText;
            clearInterval(interval);
        }
    }, 25);
}

// Email Editor
function initEmailEditor() {
    const tabs = document.querySelectorAll('.editor-tab');
    const panels = document.querySelectorAll('.tab-panel');
    
    if (tabs.length === 0) return;

    Object.keys(emailTemplates).forEach(tabName => {
        const panel = document.getElementById(`tab-${tabName}`);
        if (panel) {
            const textElement = panel.querySelector('.editor-text');
            if (textElement) {
                textElement.innerHTML = '<span class="typing-cursor"></span>';
            }
        }
    });

    setTimeout(() => typeText('linkedin'), 500);

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            stopTyping();
            
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            
            panels.forEach(p => p.classList.add('hidden'));
            const activePanel = document.getElementById(`tab-${tabName}`);
            if (activePanel) {
                activePanel.classList.remove('hidden');
                setTimeout(() => typeText(tabName), 50);
            }
        });
    });
}

function stopTyping() {
    if (typingInterval) {
        clearInterval(typingInterval);
        typingInterval = null;
    }
    isTyping = false;
}

function typeText(tabName) {
    stopTyping();

    const panel = document.getElementById(`tab-${tabName}`);
    if (!panel) return;
    
    const textElement = panel.querySelector('.editor-text');
    if (!textElement) return;
    
    const template = emailTemplates[tabName];
    if (!template) return;
    
    isTyping = true;
    
    const highlightedText = highlightSyntax(template);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = highlightedText;
    const plainText = tempDiv.textContent || tempDiv.innerText;
    
    textElement.innerHTML = '<span class="typing-cursor"></span>';
    
    let charIndex = 0;
    const charsPerFrame = 3;
    
    typingInterval = setInterval(() => {
        if (!isTyping) {
            stopTyping();
            return;
        }
        
        charIndex += charsPerFrame;
        
        if (charIndex >= plainText.length) {
            textElement.innerHTML = highlightedText + '<span class="typing-cursor"></span>';
            stopTyping();
            setTimeout(() => {
                const cursor = textElement.querySelector('.typing-cursor');
                if (cursor) cursor.style.opacity = '0';
            }, 2000);
        } else {
            textElement.innerHTML = getPartialHighlightedText(highlightedText, charIndex) + '<span class="typing-cursor"></span>';
        }
    }, 8);
}

function getPartialHighlightedText(html, charCount) {
    let result = '';
    let visibleChars = 0;
    let i = 0;
    
    while (i < html.length && visibleChars < charCount) {
        const char = html[i];
        
        if (char === '<') {
            const tagEnd = html.indexOf('>', i);
            if (tagEnd !== -1) {
                result += html.substring(i, tagEnd + 1);
                i = tagEnd + 1;
                continue;
            }
        }
        
        if (char === '&') {
            const semicolon = html.indexOf(';', i);
            if (semicolon !== -1 && semicolon - i < 10) {
                result += html.substring(i, semicolon + 1);
                visibleChars++;
                i = semicolon + 1;
                continue;
            }
        }
        
        result += char;
        visibleChars++;
        i++;
    }
    
    const openSpans = (result.match(/<span[^>]*>/g) || []).length;
    const closeSpans = (result.match(/<\/span>/g) || []).length;
    for (let j = 0; j < openSpans - closeSpans; j++) {
        result += '</span>';
    }
    
    return result;
}

function highlightSyntax(text) {
    let escaped = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    
    escaped = escaped.replace(/\{\{RANDOM\s*\|([^}]+)\}\}/g, (match, content) => {
        const parts = content.split('|').map(p => p.trim());
        const highlightedParts = parts.map((part, i) => {
            const varHighlighted = part.replace(/\{\{(\w+)\}\}/g, '<span class="syntax-variable">{{$1}}</span>');
            return i < parts.length - 1 
                ? varHighlighted + ' <span class="syntax-pipe">|</span> '
                : varHighlighted;
        }).join('');
        return `<span class="syntax-random">{{RANDOM |</span> ${highlightedParts} <span class="syntax-random">}}</span>`;
    });
    
    escaped = escaped.replace(/\{\{(\w+)\}\}/g, '<span class="syntax-variable">{{$1}}</span>');
    
    return escaped;
}

// Stats with pulse
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-counter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const counter = { value: 0 };
                
                gsap.to(counter, {
                    value: target,
                    duration: 1.5,
                    ease: 'power2.out',
                    onUpdate: () => {
                        entry.target.textContent = Math.round(counter.value);
                    },
                    onComplete: () => {
                        entry.target.classList.add('pulse');
                        setTimeout(() => entry.target.classList.remove('pulse'), 600);
                    }
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('#hero-headline', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: 'expo.out'
    });

    gsap.from('.hero-content p, .hero-content .flex', {
        opacity: 0,
        y: 25,
        duration: 1,
        stagger: 0.1,
        delay: 0.2,
        ease: 'power3.out'
    });

    gsap.from('.email-editor', {
        opacity: 0,
        scale: 0.96,
        duration: 1,
        delay: 0.4,
        ease: 'expo.out'
    });
    
    gsap.from('.blueprint-dashboard', {
        scrollTrigger: {
            trigger: '.blueprint-dashboard',
            start: 'top 85%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'expo.out'
    });
}
