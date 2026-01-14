import { salesArchitectureData as data } from './data.js';
import { 
    createValuePropCard, 
    createBlueprintNavItem,
    createBlueprintDisplay,
    createPricingCard, 
    createStatItem,
    createRoadmapItem
} from './components.js';

const emailTemplates = {
    linkedin: `{{RANDOM | Hi {{firstName}} | Hello {{firstName}} | {{firstName}},}} this is a cold message and I know you get many, so I'll keep it brief.

{{RANDOM | Still | Even so | Nevertheless}}, messages like this are the reason Rockets Traffic has helped more than 105 professionals turn their LinkedIn presence into a consistent source of leads and launched over 200 outbound campaigns through ads, automation, and outreach.

{{RANDOM | We are opening | We're launching | We have available}} an end-of-year bundle for just 12 clients.

{{RANDOM | Inside you get | This includes | You'll receive}} a complete LinkedIn profile + company page upgrade, plus 1 full month of done-for-you managed outreach, free of charge for the first month.

{{RANDOM | If you qualify before December 12 | Should you meet the criteria before December 12 | Provided you're eligible before December 12}}, we'll also add 1 extra profile and launch it with outreach so you can scale and reach more of your ideal clients.

{{RANDOM | If this feels worth exploring | If this sounds interesting | If you'd like to learn more}}, reply "Yes" and I'll share my calendar link.`,

    cold: `Subject: {{RANDOM | Quick question about {{companyName}} | {{firstName}}, saw your work at {{companyName}} | Idea for {{companyName}}'s outbound}}

{{RANDOM | Hi {{firstName}} | Hello {{firstName}} | Hey {{firstName}}}},

{{RANDOM | I noticed | I came across | I saw}} {{companyName}} {{RANDOM | is scaling rapidly | has been growing | is expanding into new markets}} and thought you might be interested in how we've helped similar {{industry}} companies {{RANDOM | 3x their pipeline | book 40+ meetings monthly | reduce CAC by 60%}}.

{{RANDOM | The short version | Here's the gist | Quick overview}}: We build done-for-you outbound systems that {{RANDOM | run on autopilot | require zero maintenance | scale without adding headcount}}.

{{RANDOM | Would it make sense | Would you be open | Are you available}} to chat for 15 minutes this week? I can show you exactly what we'd build for {{companyName}}.

{{RANDOM | Best | Cheers | Talk soon}},
{{senderName}}

P.S. {{RANDOM | No pitch on the call | This isn't a sales call | Just a quick strategy session}} just want to see if there's a fit.`,

    followup: `{{RANDOM | Hi {{firstName}} | Hey {{firstName}} | {{firstName}}}},

{{RANDOM | Following up on my last message | Wanted to circle back | Bumping this to the top of your inbox}} {{RANDOM | I know you're busy | things get buried | timing is everything}}.

{{RANDOM | Quick recap | In case you missed it | The short version}}: We help {{industry}} companies like {{companyName}} build outbound systems that {{RANDOM | generate qualified leads on autopilot | book 30 to 50 meetings per month | create predictable pipeline}}.

{{RANDOM | I put together | I created | I drafted}} a quick breakdown of what this could look like for {{companyName}} specifically {{RANDOM | happy to share | would love to walk you through it | can send it over}} if you're interested.

{{RANDOM | Worth a 10-minute call? | Would a quick chat make sense? | Open to connecting this week?}}

{{RANDOM | {{senderName}} | Best, {{senderName}} | Cheers, {{senderName}}}}`,

    breakup: `{{RANDOM | Hi {{firstName}} | Hey {{firstName}} | {{firstName}}}},

{{RANDOM | I've reached out a few times | This is my last follow-up | I'll keep this short}} {{RANDOM | I don't want to keep filling your inbox | I know when to take a hint | I respect your time}}.

{{RANDOM | If building a predictable outbound engine for {{companyName}} isn't a priority right now | If now isn't the right time to scale your pipeline | If outbound isn't on your radar this quarter}}, {{RANDOM | totally understand | no worries at all | completely get it}}.

{{RANDOM | But if anything changes | If this becomes relevant later | When you're ready to explore this}}, {{RANDOM | my door is always open | you know where to find me | just reply to this thread}}.

{{RANDOM | Wishing you and the team at {{companyName}} a strong {{quarter}} | Best of luck with everything at {{companyName}} | Rooting for {{companyName}}'s success}}.

{{RANDOM | {{senderName}} | All the best, {{senderName}} | Cheers, {{senderName}}}}`
};

// State
let currentBlueprintIndex = 0;
let typingInterval = null;
let isTyping = false;

document.addEventListener('DOMContentLoaded', () => {
    if (!data) return;
    initLayout();
    initNavScroll();
    initEmailEditor();
    initBlueprintInteraction();
    initMobileBlueprintScroll();
    initRoadmapAnimation();
    initAnimations();
    initStatsCounter();
    lucide.createIcons();
});

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
            li.className = 'flex items-start gap-5 text-gray-400 group';
            li.innerHTML = `
                <div class="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-white group-hover:border-white transition-all">
                    <i data-lucide="check" class="w-4 h-4 text-white group-hover:text-black"></i>
                </div>
                <span class="text-lg font-medium leading-tight group-hover:text-white transition-colors">${item}</span>
            `;
            gList.appendChild(li);
        });
    }

    // Market Dynamics - Redesigned
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

    // Blueprints
    const blueprintContainer = document.getElementById('blueprints-container');
    if (blueprintContainer) {
        let navItems = '';
        data.blueprints.forEach((bp, index) => {
            navItems += createBlueprintNavItem(bp, index === 0);
        });
        
        blueprintContainer.innerHTML = `
            <div class="blueprint-dashboard">
                <div class="blueprint-nav-wrapper">
                    <div class="blueprint-nav">
                        ${navItems}
                    </div>
                    <div class="scroll-hint scroll-hint-left">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </div>
                    <div class="scroll-hint scroll-hint-right">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </div>
                </div>
                <div class="blueprint-display" id="blueprint-display">
                    ${createBlueprintDisplay(data.blueprints[0])}
                </div>
            </div>
        `;
    }

    // Pricing
    const pricingGrid = document.getElementById('pricing-grid');
    if (pricingGrid) {
        data.packages.forEach(pkg => {
            pricingGrid.innerHTML += createPricingCard(pkg);
        });
    }

    // Next Steps / Roadmap
    const roadmapContainer = document.getElementById('next-steps-container');
    if (roadmapContainer) {
        data.next_steps.forEach((step, idx) => {
            roadmapContainer.innerHTML += createRoadmapItem(step, idx);
        });
    }

    // FAQ
    const faqContainer = document.getElementById('faq-container');
    if (faqContainer) {
        data.faq.forEach(item => {
            faqContainer.innerHTML += `
                <details class="faq-item glass-card rounded-[1rem] overflow-hidden border border-white/5">
                    <summary class="p-6 cursor-pointer font-black text-xs uppercase tracking-[0.2em] list-none flex justify-between items-center group transition-colors hover:text-white text-white/50">
                        <span>${item.question}</span>
                        <i data-lucide="chevron-down" class="w-5 h-5 transition-transform duration-500 text-white"></i>
                    </summary>
                    <div class="px-6 pb-6 text-gray-400 leading-relaxed text-sm font-medium border-t border-white/5 pt-6">
                        ${item.answer}
                    </div>
                </details>
            `;
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

// Mobile blueprint scroll hints
function initMobileBlueprintScroll() {
    const wrapper = document.querySelector('.blueprint-nav-wrapper');
    const nav = document.querySelector('.blueprint-nav');
    
    if (!wrapper || !nav) return;
    
    const updateScrollState = () => {
        const scrollLeft = nav.scrollLeft;
        const maxScroll = nav.scrollWidth - nav.clientWidth;
        
        if (scrollLeft > 10) {
            wrapper.classList.add('scrolled-start');
        } else {
            wrapper.classList.remove('scrolled-start');
        }
        
        if (scrollLeft >= maxScroll - 10) {
            wrapper.classList.add('scrolled-end');
        } else {
            wrapper.classList.remove('scrolled-end');
        }
    };
    
    nav.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();
}

// Roadmap scroll animation
function initRoadmapAnimation() {
    const items = document.querySelectorAll('.roadmap-item');
    if (items.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
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

// Blueprint interaction
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
    
    // Trigger scan animation
    display.classList.remove('scanning');
    void display.offsetWidth;
    display.classList.add('scanning');
    
    // Update content
    display.innerHTML = createBlueprintDisplay(bp);
    
    // Animate all elements
    animateBlueprintContent(bp);
    
    lucide.createIcons();
}

// Combined animations for blueprint content
function animateBlueprintContent(bp) {
    const display = document.getElementById('blueprint-display');
    
    // Scramble the title
    const titleElement = display.querySelector('.display-title');
    if (titleElement) {
        scrambleText(titleElement, `${bp.name.toUpperCase()} BLUEPRINT`);
    }
    
    // Fade in description and timeline
    const fadeElements = display.querySelectorAll('.display-description, .display-timeline');
    fadeElements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(10px)';
        setTimeout(() => {
            el.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 + (i * 50));
    });
    
    // Animate hours with count-up effect
    const hoursElements = display.querySelectorAll('.hours-value');
    hoursElements.forEach((el, i) => {
        const value = el.dataset.value;
        el.style.opacity = '0';
        setTimeout(() => {
            el.style.opacity = '1';
            if (value && !isNaN(parseInt(value))) {
                animateNumber(el, parseInt(value));
            } else {
                // For "Ongoing" or "Automated" text, just fade in
                el.style.transition = 'opacity 0.3s ease';
            }
        }, 200 + (i * 100));
    });
    
    // Slide in hours boxes
    const hoursBoxes = display.querySelectorAll('.hours-box');
    hoursBoxes.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            el.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateX(0)';
        }, 150 + (i * 75));
    });
    
    // Stagger fade in features
    const features = display.querySelectorAll('.feature-list li');
    features.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(10px)';
        setTimeout(() => {
            el.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 300 + (i * 40));
    });
    
    // Fade in footer
    const footer = display.querySelector('.display-footer');
    if (footer) {
        footer.style.opacity = '0';
        setTimeout(() => {
            footer.style.transition = 'opacity 0.5s ease';
            footer.style.opacity = '1';
        }, 500);
    }
}

// Number count-up animation
function animateNumber(element, target) {
    const suffix = element.textContent.includes('Hours') ? ' Hours' : '';
    const duration = 600;
    const start = 0;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (target - start) * easeOut);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            element.textContent = target + suffix;
        }
    };
    
    requestAnimationFrame(animate);
}

// Text scramble animation
function scrambleText(element, targetText) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let iteration = 0;
    const duration = 500;
    const interval = 25;
    const totalIterations = duration / interval;
    
    const scrambleInterval = setInterval(() => {
        element.textContent = targetText.split('').map((char, idx) => {
            if (char === ' ') return ' ';
            if (idx < iteration) return targetText[idx];
            return chars[Math.floor(Math.random() * chars.length)];
        }).join('');
        
        iteration += targetText.length / totalIterations;
        
        if (iteration >= targetText.length) {
            element.textContent = targetText;
            clearInterval(scrambleInterval);
        }
    }, interval);
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
                textElement.dataset.fullContent = highlightSyntax(emailTemplates[tabName]);
                textElement.innerHTML = '<span class="typing-cursor"></span>';
            }
        }
    });

    requestAnimationFrame(() => {
        setTimeout(() => typeText('linkedin'), 300);
    });

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
                requestAnimationFrame(() => {
                    typeText(tabName);
                });
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
    const typingSpeed = 5;
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
            const partialText = getPartialHighlightedText(highlightedText, charIndex);
            textElement.innerHTML = partialText + '<span class="typing-cursor"></span>';
        }
    }, typingSpeed);
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

function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-counter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                gsap.to(entry.target, {
                    innerText: target,
                    duration: 2,
                    snap: { innerText: 1 },
                    ease: 'expo.out'
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
        y: 60,
        duration: 1.5,
        ease: 'expo.out'
    });

    gsap.from('.hero-content p, .hero-content .flex', {
        opacity: 0,
        y: 30,
        duration: 1.2,
        stagger: 0.15,
        delay: 0.3,
        ease: 'power4.out'
    });

    gsap.from('.email-editor', {
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        delay: 0.5,
        ease: 'expo.out'
    });
    
    gsap.from('.blueprint-dashboard', {
        scrollTrigger: {
            trigger: '.blueprint-dashboard',
            start: 'top 80%',
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'expo.out'
    });
}
