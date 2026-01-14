import { salesArchitectureData as data } from './data.js';
import { 
    createValuePropCard, 
    createBlueprintModule, 
    createPricingCard, 
    createStatItem
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

document.addEventListener('DOMContentLoaded', () => {
    if (!data) return;
    initLayout();
    initEmailEditor();
    initAnimations();
    initStatsCounter();
    lucide.createIcons();
});

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
                <div class="w-7 h-7 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-white group-hover:border-white transition-all">
                    <i data-lucide="check" class="w-4 h-4 text-white group-hover:text-black"></i>
                </div>
                <span class="text-lg font-medium leading-tight group-hover:text-white transition-colors">${item}</span>
            `;
            gList.appendChild(li);
        });
    }

    // Market Depends
    const mList = document.getElementById('market-depends-list');
    if (mList) {
        data.guarantee.what_depends_on_market.forEach(item => {
            const li = document.createElement('li');
            li.className = 'flex items-start gap-4 text-gray-400 font-bold text-sm uppercase tracking-wide';
            li.innerHTML = `<i data-lucide="minus" class="w-5 h-5 text-white/20 shrink-0"></i> <span>${item}</span>`;
            mList.appendChild(li);
        });
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
        data.blueprints.forEach(bp => {
            blueprintContainer.innerHTML += createBlueprintModule(bp);
        });
    }

    // Pricing
    const pricingGrid = document.getElementById('pricing-grid');
    if (pricingGrid) {
        data.packages.forEach(pkg => {
            pricingGrid.innerHTML += createPricingCard(pkg);
        });
    }

    // Next Steps
    const roadmapContainer = document.getElementById('next-steps-container');
    if (roadmapContainer) {
        data.next_steps.forEach((step, idx) => {
            roadmapContainer.innerHTML += `
                <div class="flex md:items-center gap-8 group relative">
                    <div class="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-white text-xl z-10 group-hover:bg-white group-hover:text-black transition-all duration-500">
                        ${idx + 1}
                    </div>
                    <div class="flex-grow glass-card p-8 md:p-10 rounded-[2.5rem] border-white/5 group-hover:border-white/20 transition-all duration-500">
                        <p class="text-lg font-bold tracking-tight">${step}</p>
                    </div>
                </div>
            `;
        });
    }

    // FAQ
    const faqContainer = document.getElementById('faq-container');
    if (faqContainer) {
        data.faq.forEach(item => {
            faqContainer.innerHTML += `
                <details class="faq-item glass-card rounded-[2rem] overflow-hidden border border-white/5">
                    <summary class="p-8 cursor-pointer font-black text-xs uppercase tracking-[0.3em] list-none flex justify-between items-center group transition-colors hover:text-white text-white/50">
                        <span>${item.question}</span>
                        <i data-lucide="chevron-down" class="w-5 h-5 transition-transform duration-500 text-white"></i>
                    </summary>
                    <div class="px-8 pb-8 text-gray-400 leading-relaxed text-base font-medium border-t border-white/5 pt-8">
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

// Email Editor with typing animation
function initEmailEditor() {
    const tabs = document.querySelectorAll('.editor-tab');
    const panels = document.querySelectorAll('.tab-panel');
    
    if (tabs.length === 0) return;

    // Start typing animation for first tab
    setTimeout(() => typeText('linkedin'), 500);

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            
            // Update tab states
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            
            // Update panel visibility
            panels.forEach(p => p.classList.add('hidden'));
            const activePanel = document.getElementById(`tab-${tabName}`);
            if (activePanel) {
                activePanel.classList.remove('hidden');
                typeText(tabName);
            }
        });
    });
}

let typingInterval = null;

function typeText(tabName) {
    // Clear any existing typing animation
    if (typingInterval) {
        clearInterval(typingInterval);
        typingInterval = null;
    }

    const panel = document.getElementById(`tab-${tabName}`);
    if (!panel) return;
    
    const textElement = panel.querySelector('.editor-text');
    if (!textElement) return;
    
    const template = emailTemplates[tabName];
    if (!template) return;
    
    // Clear existing content
    textElement.innerHTML = '';
    
    // Prepare highlighted text
    const highlightedText = highlightSyntax(template);
    
    // Create a temporary element to get plain text length
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = highlightedText;
    const plainText = tempDiv.textContent;
    
    // Typing animation
    let charIndex = 0;
    const typingSpeed = 8; // ms per character
    
    // Add cursor
    textElement.innerHTML = '<span class="typing-cursor"></span>';
    
    typingInterval = setInterval(() => {
        if (charIndex < plainText.length) {
            // Calculate how much of the highlighted HTML to show
            const partialText = getPartialHighlightedText(highlightedText, charIndex + 1);
            textElement.innerHTML = partialText + '<span class="typing-cursor"></span>';
            charIndex++;
        } else {
            // Typing complete
            clearInterval(typingInterval);
            typingInterval = null;
            textElement.innerHTML = highlightedText + '<span class="typing-cursor"></span>';
            
            // Remove cursor after a delay
            setTimeout(() => {
                const cursor = textElement.querySelector('.typing-cursor');
                if (cursor) cursor.remove();
            }, 2000);
        }
    }, typingSpeed);
}

function getPartialHighlightedText(html, charCount) {
    let result = '';
    let visibleChars = 0;
    let inTag = false;
    let i = 0;
    
    while (i < html.length && visibleChars < charCount) {
        const char = html[i];
        
        if (char === '<') {
            inTag = true;
            // Find the end of this tag
            const tagEnd = html.indexOf('>', i);
            if (tagEnd !== -1) {
                result += html.substring(i, tagEnd + 1);
                i = tagEnd + 1;
                continue;
            }
        }
        
        if (char === '&') {
            // Handle HTML entities
            const semicolon = html.indexOf(';', i);
            if (semicolon !== -1 && semicolon - i < 10) {
                result += html.substring(i, semicolon + 1);
                visibleChars++;
                i = semicolon + 1;
                continue;
            }
        }
        
        if (!inTag) {
            result += char;
            visibleChars++;
        }
        
        if (char === '>') {
            inTag = false;
        }
        
        i++;
    }
    
    // Close any open tags
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
    
    // Highlight {{RANDOM | ... }} tokens
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
    
    // Highlight remaining {{variable}} tokens
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
}
