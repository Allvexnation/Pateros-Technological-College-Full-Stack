export function HeroSection() {
    return `
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div class="absolute inset-0 z-0">
            <img src="public/ptc-background.png" alt="PTC Background" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-br from-green-900/80 to-green-700/70"></div>
        </div>
        
        <div class="relative z-10 container mx-auto px-4 text-center">
            <div class="max-w-4xl mx-auto">
                <h1 class="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                    Welcome to<br>Pateros Technological College
                </h1>
                <p class="text-xl md:text-2xl text-green-100 mb-8 leading-relaxed">
                    Empowering students with quality education and technological excellence for a brighter future
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="#signup" class="bg-white text-green-700 hover:bg-green-50 px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg hover:shadow-xl">
                        Get Started
                    </a>
                    <a href="#login" class="bg-green-600 hover:bg-green-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg hover:shadow-xl border-2 border-green-500">
                        Student Portal
                    </a>
                </div>
            </div>
        </div>
    </section>
    `;
}
