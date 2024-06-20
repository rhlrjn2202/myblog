const path = require('path');
const { generateSitemap } = require('./sitemap');

module.exports = function(eleventyConfig) {
    // Add passthrough copy for static files
    eleventyConfig.addPassthroughCopy('./src/style.css');
    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addPassthroughCopy('./src/admin');

    // Define a custom collection of items (optional)
    eleventyConfig.addCollection('myCollection', function(collection) {
        return collection.getAll();
    });

    // Custom filter to generate blog post permalinks without the date
    eleventyConfig.addFilter('slugify', function(str) {
        return str.toLowerCase().replace(/\s+/g, '-');
    });

    // Custom filter to generate blog post permalinks
    eleventyConfig.addFilter('blogPostPermalink', function(page) {
        // Use the title or slugified title for permalink
        const title = page.data.title;
        return `/blog/${this.slugify(title)}/`;
    });

    // Generate sitemap after build
    eleventyConfig.on('afterBuild', async () => {
        try {
            const items = eleventyConfig.getCollections().myCollection.map(item => ({
                url: item.url
            }));

            const outputPath = path.join(__dirname, 'public', 'sitemap.xml');
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
