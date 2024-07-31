const siteUrl = 'https://www.xyz.com'; // Replace with your actual site URL

module.exports = {
    siteUrl,
    generateRobotsTxt: true,
    robotsTxtOptions: {
       policies: [
          // {userAgent: "*", disallow: "/blog/category/*"},
          {userAgent: "*", allow: "/"},
       ],
    },
    // exclude: ["/blog/category/*"]
 };
