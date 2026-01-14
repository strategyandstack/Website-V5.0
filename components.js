export const createValuePropCard = (title, description, icon) => {
    return `
        <div class="glass-card p-8 rounded-[2rem] border-white/10 group hover:border-white/30 transition-all duration-500">
            <div class="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform">
                <i data-lucide="${icon}" class="w-6 h-6 text-white"></i>
            </div>
            <h3 class="text-xl font-bold mb-3 tracking-tight">${title}</h3>
            <p class="text-gray-400 leading-relaxed text-sm">${description}</p>
        </div>
    `;
};

export const createBlueprintModule = (bp) => {
    const priceDisplay = bp.price === 'Custom' ? 'Custom Quote' : bp.price;
    return `
        <div class="blueprint-module grid lg:grid-cols-2 gap-12 items-center">
            <div class="order-2 lg:order-1">
                <div class="flex items-center gap-5 mb-6">
                    <span class="text-5xl font-black blueprint-number">${String(bp.number).padStart(2, '0')}</span>
                    <div>
                        <h3 class="text-2xl font-bold tracking-tight">${bp.name}</h3>
                        <p class="text-white/40 text-xs font-black uppercase tracking-widest">${bp.tagline}</p>
                    </div>
                </div>
                <p class="text-gray-400 text-base mb-6 leading-relaxed">${bp.description}</p>
                ${bp.timeline ? `<p class="text-sm text-white/50 mb-6"><strong class="text-white/70">Timeline:</strong> ${bp.timeline}</p>` : ''}
                <div class="grid grid-cols-2 gap-3 mb-6">
                    <div class="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                        <div class="text-[9px] text-gray-500 uppercase font-black mb-1 tracking-widest">Our Blueprint</div>
                        <div class="text-lg font-bold text-white">${bp.comparison.blueprint_hours} Hours</div>
                    </div>
                    <div class="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                        <div class="text-[9px] text-gray-500 uppercase font-black mb-1 tracking-widest">Manual Approach</div>
                        <div class="text-lg font-bold text-gray-500">${bp.comparison.manual_hours} Hours</div>
                    </div>
                </div>
                <ul class="space-y-3 mb-6">
                    ${bp.deliverables.map(d => `
                        <li class="flex items-center gap-3 text-sm text-gray-300">
                            <i data-lucide="shield-check" class="w-4 h-4 text-white/60"></i>
                            ${d}
                        </li>
                    `).join('')}
                </ul>
                <div class="flex items-center gap-5">
                    <span class="text-xl font-black text-white">${priceDisplay}</span>
                    <a href="https://app.apollo.io/#/meet/managed-meetings/eddie/hor-57g-ivh/start" target="_blank" rel="noopener noreferrer" class="btn-secondary px-6 py-3 text-sm">
                        Book Strategy Call
                    </a>
                </div>
            </div>
            <div class="order-1 lg:order-2">
                <div class="glass-card p-10 rounded-[3rem] relative overflow-hidden group">
                    <div class="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div class="relative z-10 flex flex-col items-center text-center">
                        <div class="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                            <i data-lucide="layers" class="w-8 h-8 text-white/80"></i>
                        </div>
                        <h4 class="text-lg font-bold mb-3">Architecture Logic</h4>
                        <div class="w-full space-y-2">
                            <div class="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <div class="h-full bg-white/40 w-3/4"></div>
                            </div>
                            <div class="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <div class="h-full bg-white/40 w-1/2"></div>
                            </div>
                            <div class="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <div class="h-full bg-white/40 w-5/6"></div>
                            </div>
                        </div>
                        <p class="mt-6 text-xs text-gray-500 uppercase tracking-widest font-black">Blueprint ${bp.number} Active</p>
                    </div>
                </div>
            </div>
        </div>
    `;
};

export const createPricingCard = (pkg) => {
    const isPopular = pkg.popular;
    const isCustom = pkg.price === 'Custom';
    return `
        <div class="glass-card p-8 rounded-[2.5rem] flex flex-col h-full ${isPopular ? 'border-white/30 scale-[1.02] z-10' : 'border-white/10'}">
            ${isPopular ? '<div class="bg-white text-black text-[9px] font-black px-3 py-1 rounded-full uppercase self-start mb-6 tracking-widest">Most Popular</div>' : ''}
            <h3 class="text-xl font-bold mb-1 tracking-tight">${pkg.name}</h3>
            <p class="text-xs text-white/40 font-black uppercase tracking-wider mb-3">${pkg.tagline}</p>
            <div class="mb-5">
                <span class="text-3xl font-black">${isCustom ? 'Custom' : pkg.price}</span>
            </div>
            <p class="text-gray-400 text-sm mb-5">${pkg.description}</p>
            ${pkg.savings ? `<p class="text-xs text-green-400 font-bold mb-5">${pkg.savings}</p>` : ''}
            <ul class="space-y-3 mb-8 flex-grow">
                ${pkg.includes.map(inc => `
                    <li class="flex items-start gap-2 text-sm text-gray-300">
                        <i data-lucide="check" class="w-4 h-4 text-white shrink-0 mt-0.5"></i>
                        <span>${inc}</span>
                    </li>
                `).join('')}
            </ul>
            <a href="https://app.apollo.io/#/meet/managed-meetings/eddie/hor-57g-ivh/start" target="_blank" rel="noopener noreferrer" class="w-full py-4 rounded-xl ${isPopular ? 'bg-white text-black' : 'bg-white/5 border border-white/10 hover:bg-white/10'} font-black text-xs uppercase tracking-widest transition-all block text-center">
                Book Strategy Call
            </a>
        </div>
    `;
};

export const createStatItem = (stat) => {
    return `
        <div class="text-center">
            <div class="text-4xl font-black mb-2 tracking-tighter">
                ${stat.prefix || ''}<span class="stat-counter" data-target="${stat.value}">0</span>${stat.suffix || ''}
            </div>
            <div class="text-[9px] uppercase font-black tracking-[0.3em] text-white/40">${stat.metric}</div>
        </div>
    `;
};
