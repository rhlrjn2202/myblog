const { generateSitemap } = require("./sitemap");
const path = require("path");

module.exports = function(eleventyConfig) {
    // Function to filter out drafts based on front matter
    eleventyConfig.addFilter("published", function(collection) {
        return collection.filter(item => item.data.draft !== true);
    });

    // Pass-through copy for static files
    eleventyConfig.addPassthroughCopy("./src/style.css");
    eleventyConfig.addPassthroughCopy("./src/assets");
    eleventyConfig.addPassthroughCopy("./src/admin");

    // Define a collection for blog posts
    eleventyConfig.addCollection("blogPosts", function(collection) {
        return collection.getFilteredByGlob("src/blog/*.md").filter(item => !item.data.draft);
    });

    // Generate sitemap after build
    eleventyConfig.on("afterBuild", () => {
        // Access the 'blogPosts' collection
        const items = eleventyConfig.getCollections("blogPosts").map(item => {
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
