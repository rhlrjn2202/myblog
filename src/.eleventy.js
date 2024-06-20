const { generateSitemap } = require("./sitemap");
const path = require("path");

module.exports = function(eleventyConfig) {

    // Pass-through copy for static files
    eleventyConfig.addPassthroughCopy('./src/style.css');
    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addPassthroughCopy('./src/admin');

    // Generate sitemap after build
    eleventyConfig.on("afterBuild", () => {
        // Collecting items for the sitemap
        const items = eleventyConfig.collections.all().map(item => {
            return {
                url: item.url
            };
        });

        // Define the output path for the sitemap
        const outputPath = path.join(__dirname, "public", "sitemap.xml");

        // Generate the sitemap
        generateSitemap(outputPath, items);
    });

    return {
        dir: {
            input: "src",
            output: "public"
        }
    };
};