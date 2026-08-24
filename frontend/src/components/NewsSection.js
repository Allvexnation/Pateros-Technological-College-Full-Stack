export function NewsSection() {
    return `
    <section class="py-20 bg-gradient-to-b from-green-50 to-white">
        <div class="container mx-auto px-4">
            <h2 class="text-4xl font-bold text-green-800 text-center mb-4">News & Updates</h2>
            <p class="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Stay informed with the latest happenings at Pateros Technological College</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="glass-effect rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer news-card" 
                     onclick="openNewsModal('public/news/image41-today-news.jpg', 'Latest', 'College Achievements', 'Celebrating excellence in academic and extracurricular activities. Our students continue to excel in various competitions and academic pursuits, bringing pride to our institution.')">
                    <div class="relative h-48 overflow-hidden">
                        <img src="public/news/image41-today-news.jpg" alt="News 1" class="w-full h-full object-cover hover:scale-110 transition-transform duration-500">
                    </div>
                    <div class="p-6">
                        <div class="flex items-center mb-3">
                            <span class="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">Latest</span>
                            <span class="text-gray-500 text-xs ml-auto">Today</span>
                        </div>
                        <h3 class="text-lg font-semibold text-green-800 mb-2">College Achievements</h3>
                        <p class="text-gray-600 text-sm">Celebrating excellence in academic and extracurricular activities.</p>
                    </div>
                </div>

                <div class="glass-effect rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer news-card"
                     onclick="openNewsModal('public/news/image43-today-news.jpg', 'Events', 'Upcoming Events', 'Join us for exciting campus events and activities this semester. From academic conferences to cultural festivals, there is something for everyone to participate in and enjoy.')">
                    <div class="relative h-48 overflow-hidden">
                        <img src="public/news/image43-today-news.jpg" alt="News 2" class="w-full h-full object-cover hover:scale-110 transition-transform duration-500">
                    </div>
                    <div class="p-6">
                        <div class="flex items-center mb-3">
                            <span class="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">Events</span>
                            <span class="text-gray-500 text-xs ml-auto">Today</span>
                        </div>
                        <h3 class="text-lg font-semibold text-green-800 mb-2">Upcoming Events</h3>
                        <p class="text-gray-600 text-sm">Join us for exciting campus events and activities this semester.</p>
                    </div>
                </div>

                <div class="glass-effect rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer news-card"
                     onclick="openNewsModal('public/news/image45-today-news.jpg', 'Research', 'Research Breakthroughs', 'Our faculty and students lead innovative research projects. From cutting-edge technology to sustainable solutions, our research initiatives are making significant contributions to various fields.')">
                    <div class="relative h-48 overflow-hidden">
                        <img src="public/news/image45-today-news.jpg" alt="News 3" class="w-full h-full object-cover hover:scale-110 transition-transform duration-500">
                    </div>
                    <div class="p-6">
                        <div class="flex items-center mb-3">
                            <span class="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">Research</span>
                            <span class="text-gray-500 text-xs ml-auto">Today</span>
                        </div>
                        <h3 class="text-lg font-semibold text-green-800 mb-2">Research Breakthroughs</h3>
                        <p class="text-gray-600 text-sm">Our faculty and students lead innovative research projects.</p>
                    </div>
                </div>

                <div class="glass-effect rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer news-card"
                     onclick="openNewsModal('public/news/image46-today-news.jpg', 'Community', 'Community Outreach', 'Making a positive impact in our local community through service. Our students and faculty actively participate in various outreach programs to help those in need and create meaningful change.')">
                    <div class="relative h-48 overflow-hidden">
                        <img src="public/news/image46-today-news.jpg" alt="News 4" class="w-full h-full object-cover hover:scale-110 transition-transform duration-500">
                    </div>
                    <div class="p-6">
                        <div class="flex items-center mb-3">
                            <span class="bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full">Community</span>
                            <span class="text-gray-500 text-xs ml-auto">Today</span>
                        </div>
                        <h3 class="text-lg font-semibold text-green-800 mb-2">Community Outreach</h3>
                        <p class="text-gray-600 text-sm">Making a positive impact in our local community through service.</p>
                    </div>
                </div>

                <div class="glass-effect rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer news-card md:col-span-2 lg:col-span-2"
                     onclick="openNewsModal('public/news/image51-today-news.jpg', 'Featured', 'Student Success Stories', 'Inspiring stories of our graduates making waves in their respective fields. From entrepreneurship to public service, our alumni continue to excel and make significant contributions to society.')">
                    <div class="relative h-48 overflow-hidden">
                        <img src="public/news/image51-today-news.jpg" alt="News 5" class="w-full h-full object-cover hover:scale-110 transition-transform duration-500">
                    </div>
                    <div class="p-6">
                        <div class="flex items-center mb-3">
                            <span class="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">Featured</span>
                            <span class="text-gray-500 text-xs ml-auto">Today</span>
                        </div>
                        <h3 class="text-lg font-semibold text-green-800 mb-2">Student Success Stories</h3>
                        <p class="text-gray-600 text-sm">Inspiring stories of our graduates making waves in their respective fields.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}
