const { SitemapStream, streamToPromise } = require('sitemap');
const fs = require('fs'); // Import Node.js filesystem module

async function generateSitemap(outputPath, items) {
    try {
        const smStream = new SitemapStream({ hostname: 'https://example.com/' });

        items.forEach(item => {
            smStream.write(item); // Add each URL item to the sitemap stream
        });

        smStream.end(); // End the stream

        const buffer = await streamToPromise(smStream); // Convert stream to Promise
        fs.writeFileSync(outputPath, buffer.toString(), 'utf8'); // Write sitemap to file
        console.log(`Sitemap has been written to ${outputPath}`);
    } catch (error) {
        console.error('Error generating sitemap:', error);
    }
}

module.exports = { generateSitemap };
