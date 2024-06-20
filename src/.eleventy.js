// .eleventy.js

module.exports = function(eleventyConfig) {
    // Add passthrough copy for static files
    eleventyConfig.addPassthroughCopy('./src/style.css');
    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addPassthroughCopy('./src/admin');

    // Define a custom collection of items
    eleventyConfig.addCollection('myCollection', function(collection) {
        // Return an array of items
        return collection.getAll();
    });

    // Generate sitemap after build
    eleventyConfig.on('afterBuild', async () => {
        try {
            // Get all items from the collection
            const items = eleventyConfig.getCollections().myCollection.map(item => {
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
