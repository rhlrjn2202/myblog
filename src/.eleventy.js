const sitemap = require("@quasibit/eleventy-plugin-sitemap");

module.exports = function(eleventyConfig) {

    // Pass-through copy for static files
    eleventyConfig.addPassthroughCopy('./src/style.css');
    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addPassthroughCopy('./src/admin');

    // Add the sitemap plugin
    eleventyConfig.addPlugin(sitemap, {
        sitemap: {
            hostname: "https://ecotechreviews.com", // Replace with your website URL
            changefreq: "daily",
            priority: "0.5",
        },
    });

    return {
        dir: {
            input: "src",
            output: "public"
        }
    };
};
