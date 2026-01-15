export const createValuePropCard = (title, description, icon) => `
<div class="glass-card p-6 rounded-xl border-white/10 group hover:border-white/20 transition-all duration-500 section-reveal">
    <div class="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center mb-5 border border-white/10 group-hover:scale-110 transition-transform">
        <i data-lucide="${icon}" class="w-5 h-5 text-white"></i>
    </div>
    <h3 class="text-lg font-bold mb-2 tracking-tight">${title}</h3>
    <p class="text-gray-300 leading-relaxed text-sm">${description}</p>
</div>`;

export const createABetterWaySection = (data, lang = 'en') => {
    const problem = data.problem;
    const solution = data.solution;
    
    return `
<section id="a-better-way" class="py-16 px-4">
    <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12 section-reveal">
            <div class="text-[9px] font-black uppercase tracking-[0.3em] text-white/60 mb-4">${data.section_label}</div>
            <h2 class="text-4xl md:text-5xl font-black tracking-tighter uppercase">${data.section_title}</h2>
        </div>
        <div class="grid md:grid-cols-2 gap-6 section-reveal">
            <div class="better-way-card problem-card glass-card p-8 rounded-2xl border-white/10 relative overflow-hidden">
                <div class="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-500/50 to-orange-500/50"></div>
                <div class="problem-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
                    <i data-lucide="alert-triangle" class="w-3.5 h-3.5 text-red-400"></i>
                    <span class="text-[10px] font-bold uppercase tracking-wider text-red-400">${problem.badge}</span>
                </div>
                <h3 class="text-2xl md:text-3xl font-black mb-4 tracking-tight">${problem.title}</h3>
                <p class="text-sm text-gray-300 leading-relaxed mb-6">${problem.description}</p>
                <ul class="space-y-3">
                    ${problem.pain_points.map(point => `
                    <li class="flex items-start gap-3 text-sm text-gray-300">
                        <span class="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center mt-0.5">
                            <i data-lucide="x" class="w-3.5 h-3.5 text-red-400/70"></i>
                        </span>
                        <span>${point}</span>
                    </li>`).join('')}
                </ul>
            </div>
            <div class="better-way-card solution-card glass-card p-8 rounded-2xl border-white/10 relative overflow-hidden">
                <div class="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500/50 to-cyan-500/50"></div>
                <div class="solution-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                    <img src="/favicon.svg" alt="" class="w-3.5 h-3.5">
                    <span class="text-[10px] font-bold uppercase tracking-wider text-purple-400">${solution.badge}</span>
                </div>
                <h3 class="text-2xl md:text-3xl font-black mb-4 tracking-tight">${solution.title}</h3>
                <p class="text-sm text-gray-300 leading-relaxed mb-6">${solution.description}</p>
                <ul class="space-y-3">
                    ${solution.benefits.map(benefit => `
                    <li class="flex items-start gap-3 text-sm text-gray-300">
                        <span class="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center mt-0.5">
                            <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400/70"></i>
                        </span>
                        <span>${benefit}</span>
                    </li>`).join('')}
                </ul>
            </div>
        </div>
    </div>
</section>`;
};

export const createWhoThisIsForSection = (data, lang = 'en') => {
    return `
<section id="who-this-is-for" class="py-16 px-4">
    <div class="max-w-6xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="section-reveal">
                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                    <img src="/favicon.svg" alt="" class="w-3.5 h-3.5">
                    <span class="text-[10px] font-bold uppercase tracking-wider text-purple-400">${data.section_label}</span>
                </div>
                <h2 class="text-3xl md:text-4xl font-black mb-4 tracking-tighter">${data.section_title}</h2>
                <p class="text-base text-gray-300 leading-relaxed">${data.description}</p>
            </div>
            <div class="space-y-4 section-reveal">
                ${data.criteria.map(item => `
                <div class="who-criteria-item glass-card p-5 rounded-xl border-white/10 flex items-start gap-4 group hover:border-white/20 transition-all">
                    <div class="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0 border border-purple-500/20 group-hover:scale-110 transition-transform">
                        <i data-lucide="${item.icon}" class="w-5 h-5 text-purple-400"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-sm mb-1">${item.title}</h4>
                        <p class="text-xs text-gray-300 leading-relaxed">${item.description}</p>
                    </div>
                </div>`).join('')}
            </div>
        </div>
    </div>
</section>`;
};

export const createBlueprintNavItem = (bp, isActive = false) => `
<div class="blueprint-nav-item ${isActive ? 'active' : ''}" data-blueprint-id="${bp.id}" data-blueprint-index="${bp.number - 1}">
    <span class="nav-number">${String(bp.number).padStart(2, '0')}</span>
    <span class="nav-title">${bp.name}</span>
    <span class="nav-tagline">${bp.tagline}</span>
</div>`;

export const createBlueprintDisplay = (bp, lang = 'en') => {
    const l = lang === 'es' 
        ? { blueprint: 'Nuestro Sistema', manual: 'Manual', timeline: 'Tiempo', cta: 'Agenda una Llamada', custom: 'Cotización Personalizada' }
        : { blueprint: 'Our System', manual: 'Manual', timeline: 'Timeline', cta: 'Book Strategy Call', custom: 'Custom Quote' };
    
    const priceDisplay = bp.price === 'Custom' || bp.price === 'Personalizado' ? l.custom : bp.price;
    const maxHours = 200;
    const bpPct = bp.comparison.blueprint_hours ? (bp.comparison.blueprint_hours / maxHours) * 100 : 0;
    const manPct = bp.comparison.manual_hours ? (bp.comparison.manual_hours / maxHours) * 100 : 0;
    
    // Only show hours comparison if both values exist
    const hoursHtml = (bp.comparison.blueprint_hours && bp.comparison.manual_hours) ? `
<div class="hours-comparison">
    <div class="hours-row"><span class="hours-label">${l.blueprint}</span><div class="hours-bar-container"><div class="hours-bar blueprint" style="width:0%" data-width="${bpPct}%"></div></div><span class="hours-value">${bp.comparison.blueprint_hours} hrs</span></div>
    <div class="hours-row"><span class="hours-label">${l.manual}</span><div class="hours-bar-container"><div class="hours-bar manual" style="width:0%" data-width="${manPct}%"></div></div><span class="hours-value manual">${bp.comparison.manual_hours}+ hrs</span></div>
</div>` : '';
    
    return `
<div class="blueprint-lightbar"></div><div class="scan-line"></div>
<div class="display-header">
    <h3 class="display-title">${bp.name.toUpperCase()}</h3>
    <p class="display-description">${bp.description}</p>
    ${bp.timeline ? `<p class="display-timeline"><strong>${l.timeline}:</strong> ${bp.timeline}</p>` : ''}
</div>
${hoursHtml}
<ul class="feature-list">${bp.deliverables.map(d => `<li>${d}</li>`).join('')}</ul>
<div class="display-footer">
    <div class="display-price">${priceDisplay}</div>
    <a href="https://app.apollo.io/#/meet/managed-meetings/eddie/hor-57g-ivh/start" target="_blank" rel="noopener noreferrer" class="display-cta">${l.cta}</a>
</div>`;
};

export const createBlueprintAccordion = (blueprints, lang = 'en') => {
    const l = lang === 'es' 
        ? { blueprint: 'Nuestro Sistema', manual: 'Enfoque Manual', cta: 'Agendar', timeline: 'Tiempo', custom: 'Personalizado' }
        : { blueprint: 'Our System', manual: 'Manual Approach', cta: 'Book Call', timeline: 'Timeline', custom: 'Custom' };
    
    return `<div class="blueprint-accordion">${blueprints.map((bp, i) => {
        const price = bp.price === 'Custom' || bp.price === 'Personalizado' ? l.custom : bp.price;
        // Only show hours if both values exist
        const hours = (bp.comparison.blueprint_hours && bp.comparison.manual_hours) ? `
<div class="mobile-hours">
    <div class="mobile-hours-row"><span class="text-xs text-white/60 uppercase tracking-wider font-bold">${l.blueprint}</span><span class="text-sm font-bold">${bp.comparison.blueprint_hours} hrs</span></div>
    <div class="mobile-hours-row"><span class="text-xs text-white/60 uppercase tracking-wider font-bold">${l.manual}</span><span class="text-sm font-bold manual-time">${bp.comparison.manual_hours}+ hrs</span></div>
</div>` : '';
        return `
<div class="blueprint-accordion-item ${i === 0 ? 'active' : ''}" data-index="${i}">
    <div class="blueprint-accordion-header">
        <div class="accordion-title-wrap"><span class="accordion-number">${String(bp.number).padStart(2, '0')}</span><span class="accordion-title">${bp.name}</span></div>
        <div class="accordion-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></div>
    </div>
    <div class="blueprint-accordion-content"><div class="accordion-inner">
        <p class="text-sm text-white/70 mb-4 leading-relaxed">${bp.description}</p>
        ${bp.timeline ? `<p class="text-xs text-white/60 mb-4"><strong class="text-white/70">${l.timeline}:</strong> ${bp.timeline}</p>` : ''}
        ${hours}
        <ul class="space-y-2 mb-4">${bp.deliverables.map(d => `<li class="flex items-start gap-2 text-xs text-white/70"><span class="text-white/55">→</span>${d}</li>`).join('')}</ul>
        <div class="flex items-center justify-between pt-4 border-t border-white/5">
            <span class="text-lg font-bold">${price}</span>
            <a href="https://app.apollo.io/#/meet/managed-meetings/eddie/hor-57g-ivh/start" target="_blank" rel="noopener noreferrer" class="bg-white text-black px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wide">${l.cta}</a>
        </div>
    </div></div>
</div>`;
    }).join('')}</div>`;
};

export const createPricingCard = (pkg, lang = 'en') => {
    const isPopular = pkg.popular;
    const isCustom = pkg.price === 'Custom' || pkg.price === 'Personalizado';
    const l = lang === 'es' 
        ? { popular: 'Más Popular', cta: 'Comenzar', custom: 'Personalizado' } 
        : { popular: 'Most Popular', cta: 'Get Started', custom: 'Custom' };
    
    return `
<div class="pricing-card ${isPopular ? 'popular' : ''}">
    ${isPopular ? `<div class="popular-badge"><span>${l.popular}</span></div>` : '<div style="height:38px;"></div>'}
    <div class="pricing-header"><div class="pricing-name">${pkg.name}</div><div class="pricing-tagline">${pkg.tagline}</div></div>
    <div class="pricing-price">${isCustom ? l.custom : pkg.price}</div>
    <p class="pricing-description">${pkg.description}</p>
    <div class="pricing-savings">${pkg.savings || ''}</div>
    <ul class="pricing-features">${pkg.includes.map(inc => `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg><span>${inc}</span></li>`).join('')}</ul>
    <a href="https://app.apollo.io/#/meet/managed-meetings/eddie/hor-57g-ivh/start" target="_blank" rel="noopener noreferrer" class="pricing-cta ${isPopular ? 'primary' : 'secondary'}">${l.cta}</a>
</div>`;
};

export const createStatItem = (stat) => `
<div class="stat-item text-center">
    <div class="text-3xl md:text-4xl font-black mb-1 tracking-tighter">${stat.prefix || ''}<span class="stat-counter" data-target="${stat.value}">0</span>${stat.suffix || ''}</div>
    <div class="text-[9px] uppercase font-black tracking-[0.25em] text-white/60">${stat.metric}</div>
</div>`;

export const createRoadmapItem = (step, idx) => `
<div class="roadmap-item flex items-start md:items-center gap-5 group" data-index="${idx}">
    <div class="roadmap-number flex-shrink-0 w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-black text-white text-base">${idx + 1}</div>
    <div class="flex-grow glass-card p-5 md:p-6 rounded-xl border-white/5 group-hover:border-white/15 transition-all duration-500"><p class="text-sm font-bold tracking-tight">${step}</p></div>
</div>`;

export const createFaqItem = (item, index) => `
<details class="faq-item" data-index="${index}">
    <summary class="faq-summary"><span>${item.question}</span><svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></summary>
    <div class="faq-content">${item.answer}</div>
</details>`;

export const createMarketDynamics = (items, lang = 'en') => {
    const label = lang === 'es' ? 'Lo Que Depende de Tu Mercado' : 'What Depends on Your Market';
    return `
<div class="market-dynamics">
    <div class="market-dynamics-label">${label}</div>
    <div class="market-dynamics-list">
        ${items.map(item => `<span class="market-dynamics-item">${item}</span>`).join('')}
    </div>
</div>`;
};

export const createSecondaryCTANote = (noteText, scarcityText) => `
<div class="cta-secondary-note">
    <div class="note-line">${noteText}</div>
    <div class="scarcity-line">${scarcityText}</div>
</div>`;
