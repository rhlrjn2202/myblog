const path = require('path');
const fs = require('fs');

module.exports = function(eleventyConfig) {
    // Add passthrough copy for static files
    eleventyConfig.addPassthroughCopy('./src/style.css');
    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addPassthroughCopy('./src/admin');

    // Define a custom collection of items
    eleventyConfig.addCollection('myCollection', function(collection) {
        // Return an array of items excluding /admin/
        return collection.getAll().filter(item => !item.url.startsWith('/admin/'));
    });

    // Generate sitemap after build
    eleventyConfig.on('afterBuild', async () => {
        try {
            // Get all items from the collection
            const items = eleventyConfig.collections.myCollection.map(item => {
                return {
                    url: item.url
                };
            });

            // Define the output path for the sitemap
            const outputPath = path.join(__dirname, 'public', 'sitemap.xml');

            // Generate the sitemap
            await generateSitemap(outputPath, items);
        } catch (error) {
            console.error('Error generating sitemap:', error);
        }
    });

    return {
        dir: {
            input: 'src',
            output: 'public'
        }
    };
};

// Function to generate sitemap
async function generateSitemap(outputPath, items) {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${items.map(item => `
    <url>
        <loc>${item.url}</loc>
    </url>`).join('')}
</urlset>`;

    fs.writeFileSync(outputPath, sitemap);
}
