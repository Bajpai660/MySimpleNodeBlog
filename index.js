// import express from 'express';
// import morgan from 'morgan';
// import path from "path";
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
// import fs from 'fs';

// const __dirname = dirname(fileURLToPath(import.meta.url));
// const app = express();
// const port = 3000;

// // Middleware
// app.use(morgan('dev'));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(__dirname + '/public'));

// app.set("view engine", "ejs");

// // Helper functions
// const postsDir = __dirname + '/posts/';


// // …

// function loadPosts() {
//   return fs.readdirSync(postsDir).map(filename => {
//     const slug = path.basename(filename, ".json");           // e.g. "hello-world"
//     const data = JSON.parse(fs.readFileSync(postsDir + filename));
//     return { ...data, slug };                                // include slug in each post object
//   });
// }

// function savePost(slug, data) {
//   fs.writeFileSync(postsDir + slug + '.json', JSON.stringify(data));
// }

// // 1. Home – list posts
// app.get('/', (req, res) => {
//   const posts = loadPosts();
//   res.render('index', { posts, title: "All Posts" });
// });

// // 2. New Post form
// app.get('/new', (req, res) => {
//   res.render('new', { title: "Create New Post" });
// });

// // 3. Handle form submission
// app.post('/new', (req, res) => {
//   const { title, content } = req.body;
//   const slug = title.toLowerCase().replace(/ /g, '-');
//   savePost(slug, { title, content });
//   res.redirect(`/posts/${slug}`);
// });

// // 4. Single post view
// app.get('/posts/:slug', (req, res) => {
//   const slug = req.params.slug;
//   let post;
//   try {
//     post = JSON.parse(fs.readFileSync(postsDir + slug + '.json'));
//   } catch {
//     return res.status(404).send('Post not found');
//   }

//   res.render('post', {
//     post,             // now EJS has `post` for post.title & post.content
//     title: post.title // use that same `post` variable
//   });
// });


// // !==> After your existing routes, add:

// // 1) Render Edit form
// app.get("/edit/:slug", (req, res) => {
//   const slug = req.params.slug;
//   try {
//     const post = JSON.parse(fs.readFileSync(postsDir + slug + ".json"));
//     post.slug = slug;
//     res.render("edit", { post, slug, 
//     title: `Edit: ${post.title}`
//   });
//   } catch {
//     res.status(404).send("Post not found");
//   }
// });

// // 2) Handle Edit submission
// app.post("/edit/:slug", (req, res) => {
//   const oldSlug = req.params.slug;
//   const { title, content } = req.body;
//   const newSlug = title.toLowerCase().replace(/ /g, "-");
//   //  – Save under new file name
//   savePost(newSlug, { title, content });
//   //  – If slug changed, delete old file
//   if (newSlug !== oldSlug) {
//     fs.unlinkSync(postsDir + oldSlug + ".json");
//   }
//   res.redirect(`/posts/${newSlug}`);
// });

// // 3) Handle Delete
// app.post("/delete/:slug", (req, res) => {
//   const slug = req.params.slug;
//   try {
//     fs.unlinkSync(postsDir + slug + ".json");
//   } catch { }
//   res.redirect("/");
// });

// // Start server
// app.listen(port, () => console.log(`Server running at http://localhost:${port}`));



// import express from 'express';
// import morgan from 'morgan';
// import path from "path";
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
// import fs from 'fs';

// const __dirname = dirname(fileURLToPath(import.meta.url));
// const app = express();
// const port = 3000;

// // Middleware
// app.use(morgan('dev'));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(__dirname + '/public'));

// app.set("view engine", "ejs");

// // Helper functions
// const postsDir = __dirname + '/posts/';

// function loadPosts() {
//   return fs.readdirSync(postsDir).map(filename => {
//     const slug = path.basename(filename, ".json");
//     const data = JSON.parse(fs.readFileSync(postsDir + filename));
//     return { ...data, slug };
//   });
// }

// function savePost(slug, data) {
//   fs.writeFileSync(postsDir + slug + '.json', JSON.stringify(data, null, 2)); // Added null, 2 for pretty printing JSON
// }

// // Helper to generate a random Lorem Picsum URL
// // It's good practice to use a unique ID for each image to ensure it's different.
// // We can use a combination of timestamp and a random number.
// function generateLoremPicsumUrl() {
//     const width = 800; // Desired width for the image
//     const height = 600; // Desired height
//     const uniqueId = Math.floor(Math.random() * 1000000000); // A large random number for uniqueness
//     return `https://picsum.photos/id/${uniqueId % 1000}/${width}/${height}`; // Using /id/ for truly unique images per ID
//     // You can also use `https://picsum.photos/${width}/${height}?random=${Date.now()}`
//     // The `/id/{id}/` approach is better if you want the *same* unique image for a given ID consistently.
// }


// // 1. Home – list posts
// app.get('/', (req, res) => {
//   const posts = loadPosts();
//   res.render('index', { posts, title: "All Posts" });
// });

// // 2. New Post form
// app.get('/new', (req, res) => {
//   res.render('new', { title: "Create New Post" });
// });

// // 3. Handle form submission (UPDATED)
// app.post('/new', (req, res) => {
//   const { title, content } = req.body;
//   const slug = title.toLowerCase().replace(/ /g, '-');
//   const imageUrl = generateLoremPicsumUrl(); // Generate a random image URL
//   savePost(slug, { title, content, image: imageUrl }); // Save the image URL with the post
//   res.redirect(`/posts/${slug}`);
// });

// // 4. Single post view
// app.get('/posts/:slug', (req, res) => {
//   const slug = req.params.slug;
//   let post;
//   try {
//     post = JSON.parse(fs.readFileSync(postsDir + slug + '.json'));
//   } catch {
//     return res.status(404).send('Post not found');
//   }

//   res.render('post', {
//     post,
//     title: post.title
//   });
// });


// // 1) Render Edit form
// app.get("/edit/:slug", (req, res) => {
//   const slug = req.params.slug;
//   try {
//     const post = JSON.parse(fs.readFileSync(postsDir + slug + ".json"));
//     post.slug = slug;
//     res.render("edit", { post, slug,
//     title: `Edit: ${post.title}`
//   });
//   } catch {
//     res.status(404).send("Post not found");
//   }
// });

// // 2) Handle Edit submission (UPDATED - to preserve existing image)
// app.post("/edit/:slug", (req, res) => {
//   const oldSlug = req.params.slug;
//   const { title, content } = req.body;
//   const newSlug = title.toLowerCase().replace(/ /g, "-");

//   let existingPost = {};
//   try {
//       existingPost = JSON.parse(fs.readFileSync(postsDir + oldSlug + ".json"));
//   } catch (error) {
//       // If old post not found, treat as new (though this shouldn't happen via edit route)
//       console.error("Error reading existing post for edit:", error);
//   }

//   // Preserve the existing image URL, or generate a new one if it's missing (e.g., for old posts)
//   const imageUrl = existingPost.image || generateLoremPicsumUrl();

//   // – Save under new file name
//   savePost(newSlug, { title, content, image: imageUrl });
//   // – If slug changed, delete old file
//   if (newSlug !== oldSlug) {
//     fs.unlinkSync(postsDir + oldSlug + ".json");
//   }
//   res.redirect(`/posts/${newSlug}`);
// });

// // 3) Handle Delete
// app.post("/delete/:slug", (req, res) => {
//   const slug = req.params.slug;
//   try {
//     fs.unlinkSync(postsDir + slug + ".json");
//     // If you were doing actual file uploads, you'd delete the image here too.
//     // For Lorem Picsum, no local image file to delete.
//   } catch { }
//   res.redirect("/");
// });

// // Start server
// app.listen(port, () => console.log(`Server running at http://localhost:${port}`));




// import express from 'express';
// import morgan from 'morgan';
// import path from "path";
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
// import fs from 'fs';

// const __dirname = dirname(fileURLToPath(import.meta.url));
// const app = express();
// const port = 3000;

// // Middleware
// app.use(morgan('dev'));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(__dirname + '/public'));

// app.set("view engine", "ejs");

// // Helper functions
// const postsDir = __dirname + '/posts/';

// // Define available categories
// const AVAILABLE_CATEGORIES = [
//     "Technology",
//     "Travel",
//     "Food",
//     "Lifestyle",
//     "Programming",
//     "Science",
//     "Arts",
//     "Personal"
// ];

// function loadPosts() {
//     try {
//         return fs.readdirSync(postsDir).map(filename => {
//             const slug = path.basename(filename, ".json");
//             const data = JSON.parse(fs.readFileSync(postsDir + filename));
//             return { ...data, slug };
//         });
//     } catch (error) {
//         console.error("Error loading posts:", error);
//         return []; // Return empty array if directory doesn't exist or error occurs
//     }
// }

// function savePost(slug, data) {
//     fs.writeFileSync(postsDir + slug + '.json', JSON.stringify(data, null, 2)); // Added null, 2 for pretty printing JSON
// }

// function generateLoremPicsumUrl() {
//     const width = 800;
//     const height = 600;
//     const uniqueId = Math.floor(Math.random() * 1000000000);
//     return `https://picsum.photos/id/${uniqueId % 1000}/${width}/${height}`;
// }

// app.get('/', (req, res) => {
//     let posts = loadPosts(); // Always load all posts initially
//     const selectedCategory = req.query.category;
//     const searchTerm = req.query.search; // Get search term from URL query parameter

//     // --- Apply Filters ---

//     // 1. Apply Category Filter
//     if (selectedCategory && selectedCategory !== 'all') {
//         posts = posts.filter(p => p.category && p.category === selectedCategory);
//     }

//     // 2. Apply Search Filter (after category filter, if applicable)
//     if (searchTerm) {
//         const lowerCaseSearchTerm = searchTerm.toLowerCase();
//         posts = posts.filter(p => p.title.toLowerCase().includes(lowerCaseSearchTerm));
//         // You could extend this to also search content:
//         // posts = posts.filter(p =>
//         //     p.title.toLowerCase().includes(lowerCaseSearchTerm) ||
//         //     p.content.toLowerCase().includes(lowerCaseSearchTerm)
//         // );
//     }

//     // --- Prepare Data for Sidebar ---

//     // Categories for sidebar (from ALL posts, so all options are always visible)
//     const allPostsForCategories = loadPosts(); // Re-load all posts to get all category counts
//     const categoriesMap = {};
//     allPostsForCategories.forEach(post => {
//         if (post.category) {
//             categoriesMap[post.category] = (categoriesMap[post.category] || 0) + 1;
//         }
//     });
//     const categories = Object.keys(categoriesMap).map(name => ({
//         name: name,
//         count: categoriesMap[name]
//     })).sort((a, b) => a.name.localeCompare(b.name));


//     res.render('index', {
//         posts,
//         title: (searchTerm ? `Search Results for "${searchTerm}"` : (selectedCategory ? `${selectedCategory} Posts` : "All Posts")),
//         categories,
//         selectedCategory,
//         searchTerm // Pass search term back to EJS to pre-fill search box
//     });
// });

// // 2. New Post form
// app.get('/new', (req, res) => {
//     res.render('new', {
//         title: "Create New Post",
//         availableCategories: AVAILABLE_CATEGORIES // Pass categories for dropdown
//     });
// });

// // 3. Handle form submission (UPDATED for categories)
// app.post('/new', (req, res) => {
//     const { title, content, category } = req.body;
//     const slug = title.toLowerCase().replace(/ /g, '-');

//     // Determine the final category
//     let finalCategory = category;
//     if (category === 'Random') {
//         const randomIndex = Math.floor(Math.random() * AVAILABLE_CATEGORIES.length);
//         finalCategory = AVAILABLE_CATEGORIES[randomIndex];
//     }

//     const imageUrl = generateLoremPicsumUrl();
//     savePost(slug, { title, content, image: imageUrl, category: finalCategory }); // Save image and category
//     res.redirect(`/posts/${slug}`);
// });

// // 4. Single post view
// app.get('/posts/:slug', (req, res) => {
//     const slug = req.params.slug;
//     let post;
//     try {
//         post = JSON.parse(fs.readFileSync(postsDir + slug + '.json'));
//     } catch {
//         return res.status(404).send('Post not found');
//     }

//     res.render('post', {
//         post,
//         title: post.title
//     });
// });


// // 1) Render Edit form (UPDATED for categories)
// app.get("/edit/:slug", (req, res) => {
//     const slug = req.params.slug;
//     try {
//         const post = JSON.parse(fs.readFileSync(postsDir + slug + ".json"));
//         post.slug = slug;
//         res.render("edit", {
//             post,
//             slug,
//             title: `Edit: ${post.title}`,
//             availableCategories: AVAILABLE_CATEGORIES // Pass categories for dropdown
//         });
//     } catch {
//         res.status(404).send("Post not found");
//     }
// });

// // 2) Handle Edit submission (UPDATED for categories and image preservation)
// app.post("/edit/:slug", (req, res) => {
//     const oldSlug = req.params.slug;
//     const { title, content, category } = req.body;
//     const newSlug = title.toLowerCase().replace(/ /g, "-");

//     let existingPost = {};
//     try {
//         existingPost = JSON.parse(fs.readFileSync(postsDir + oldSlug + ".json"));
//     } catch (error) {
//         console.error("Error reading existing post for edit:", error);
//     }

//     // Determine the final category
//     let finalCategory = category;
//     if (category === 'Random') {
//         const randomIndex = Math.floor(Math.random() * AVAILABLE_CATEGORIES.length);
//         finalCategory = AVAILABLE_CATEGORIES[randomIndex];
//     }

//     // Preserve the existing image URL, or generate a new one if it's missing (e.g., for old posts)
//     const imageUrl = existingPost.image || generateLoremPicsumUrl();

//     // – Save under new file name
//     savePost(newSlug, { title, content, image: imageUrl, category: finalCategory });
//     // – If slug changed, delete old file
//     if (newSlug !== oldSlug) {
//         fs.unlinkSync(postsDir + oldSlug + ".json");
//     }
//     res.redirect(`/posts/${newSlug}`);
// });

// // 3) Handle Delete
// app.post("/delete/:slug", (req, res) => {
//     const slug = req.params.slug;
//     try {
//         fs.unlinkSync(postsDir + slug + ".json");
//     } catch { }
//     res.redirect("/");
// });
// // ... (your existing routes like app.get('/new'), app.post('/new'), etc.)

// // About Page Route
// app.get('/about', (req, res) => {
//     res.render('about', { title: "About My Blog" });
// });

// // Contact Page Route
// app.get('/contact', (req, res) => {
//     res.render('contact', { title: "Contact Us" });
// });

// // Start server
// app.listen(port, () => console.log(`Server running at http://localhost:${port}`));




// import express from 'express';
// import morgan from 'morgan';
// import path from "path";
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
// import fs from 'fs';

// const __dirname = dirname(fileURLToPath(import.meta.url));
// const app = express();
// const port = 3000;

// // Middleware
// app.use(morgan('dev'));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(__dirname + '/public'));

// app.set("view engine", "ejs");

// // Helper functions
// const postsDir = __dirname + '/posts/';

// // Define available categories (keep this)
// const AVAILABLE_CATEGORIES = [
//     "Technology",
//     "Travel",
//     "Food",
//     "Lifestyle",
//     "Programming",
//     "Science",
//     "Arts",
//     "Personal"
// ];

// // Removed PRE_CHOSEN_IMAGES array as it's no longer used


// function loadPosts() {
//     try {
//         return fs.readdirSync(postsDir).map(filename => {
//             const slug = path.basename(filename, ".json");
//             const data = JSON.parse(fs.readFileSync(postsDir + filename));
//             return { ...data, slug };
//         });
//     } catch (error) {
//         console.error("Error loading posts:", error);
//         return [];
//     }
// }

// function savePost(slug, data) {
//     fs.writeFileSync(postsDir + slug + '.json', JSON.stringify(data, null, 2));
// }

// function generateLoremPicsumUrl() {
//     const width = 800;
//     const height = 600;
//     const uniqueId = Math.floor(Math.random() * 1000000000);
//     return `https://picsum.photos/id/${uniqueId % 1000}/${width}/${height}`;
// }

// // 1. Home – list posts (keep as is)
// app.get('/', (req, res) => {
//     let posts = loadPosts();
//     const selectedCategory = req.query.category;
//     const searchTerm = req.query.search;

//     // --- Apply Filters ---
//     if (selectedCategory && selectedCategory !== 'all') {
//         posts = posts.filter(p => p.category && p.category === selectedCategory);
//     }
//     if (searchTerm) {
//         const lowerCaseSearchTerm = searchTerm.toLowerCase();
//         posts = posts.filter(p => p.title.toLowerCase().includes(lowerCaseSearchTerm));
//     }

//     // --- Prepare Data for Sidebar ---
//     const allPostsForCategories = loadPosts();
//     const categoriesMap = {};
//     allPostsForCategories.forEach(post => {
//         if (post.category) {
//             categoriesMap[post.category] = (categoriesMap[post.category] || 0) + 1;
//         }
//     });
//     const categories = Object.keys(categoriesMap).map(name => ({
//         name: name,
//         count: categoriesMap[name]
//     })).sort((a, b) => a.name.localeCompare(b.name));


//     res.render('index', {
//         posts,
//         title: (searchTerm ? `Search Results for "${searchTerm}"` : (selectedCategory ? `${selectedCategory} Posts` : "All Posts")),
//         categories,
//         selectedCategory,
//         searchTerm,
//     });
// });

// // 2. New Post form (SIMPLIFIED - no preChosenImages passed)
// app.get('/new', (req, res) => {
//     res.render('new', {
//         title: "Create New Post",
//         availableCategories: AVAILABLE_CATEGORIES
//         // preChosenImages is no longer passed
//     });
// });

// // 3. Handle form submission (SIMPLIFIED - image logic)
// app.post('/new', (req, res) => {
//     const { title, content, category, imageUrl } = req.body; // imageUrl is the only image input
//     const slug = title.toLowerCase().replace(/ /g, '-');

//     // Determine the final category
//     let finalCategory = category;
//     if (category === 'Random') {
//         const randomIndex = Math.floor(Math.random() * AVAILABLE_CATEGORIES.length);
//         finalCategory = AVAILABLE_CATEGORIES[randomIndex];
//     }

//     // Determine the final image path: Use imageUrl if provided, otherwise generate random
//     let finalImageUrl;
//     if (imageUrl && imageUrl.trim() !== '') { // Check if imageUrl is not empty or just whitespace
//         finalImageUrl = imageUrl.trim();
//     } else {
//         finalImageUrl = generateLoremPicsumUrl();
//     }

//     savePost(slug, { title, content, category: finalCategory, image: finalImageUrl });
//     res.redirect(`/posts/${slug}`);
// });

// // 4. Single post view (keep as is)
// app.get('/posts/:slug', (req, res) => {
//     const slug = req.params.slug;
//     let post;
//     try {
//         post = JSON.parse(fs.readFileSync(postsDir + slug + '.json'));
//     } catch {
//         return res.status(404).send('Post not found');
//     }

//     res.render('post', {
//         post,
//         title: post.title
//     });
// });


// // 1) Render Edit form (SIMPLIFIED - no preChosenImages passed)
// app.get("/edit/:slug", (req, res) => {
//     const slug = req.params.slug;
//     try {
//         const post = JSON.parse(fs.readFileSync(postsDir + slug + ".json"));
//         post.slug = slug;
//         res.render("edit", {
//             post,
//             slug,
//             title: `Edit: ${post.title}`,
//             availableCategories: AVAILABLE_CATEGORIES
//             // preChosenImages is no longer passed
//         });
//     } catch {
//         res.status(404).send("Post not found");
//     }
// });

// // 2) Handle Edit submission (SIMPLIFIED - image logic)
// app.post("/edit/:slug", (req, res) => {
//     const oldSlug = req.params.slug;
//     const { title, content, category, imageUrl } = req.body; // imageUrl is the only image input
//     const newSlug = title.toLowerCase().replace(/ /g, "-");

//     let existingPost = {};
//     try {
//         existingPost = JSON.parse(fs.readFileSync(postsDir + oldSlug + ".json"));
//     } catch (error) {
//         console.error("Error reading existing post for edit:", error);
//     }

//     // Determine the final category
//     let finalCategory = category;
//     if (category === 'Random') {
//         const randomIndex = Math.floor(Math.random() * AVAILABLE_CATEGORIES.length);
//         finalCategory = AVAILABLE_CATEGORIES[randomIndex];
//     }

//     // Determine the final image path: Use imageUrl if provided, otherwise use existing or generate random
//     let finalImageUrl;
//     if (imageUrl && imageUrl.trim() !== '') { // User provided a new URL
//         finalImageUrl = imageUrl.trim();
//     } else if (existingPost.image) { // User didn't provide new URL, but an image already exists
//         finalImageUrl = existingPost.image;
//     } else { // No new URL, no existing image, generate random
//         finalImageUrl = generateLoremPicsumUrl();
//     }

//     savePost(newSlug, { title, content, category: finalCategory, image: finalImageUrl });
//     if (newSlug !== oldSlug) {
//         fs.unlinkSync(postsDir + oldSlug + ".json");
//     }
//     res.redirect(`/posts/${newSlug}`);
// });

// // 3) Handle Delete (keep as is)
// app.post("/delete/:slug", (req, res) => {
//     const slug = req.params.slug;
//     try {
//         fs.unlinkSync(postsDir + slug + ".json");
//     } catch { }
//     res.redirect("/");
// });

// // About Page Route (keep as is)
// app.get('/about', (req, res) => {
//     res.render('about', { title: "About My Blog" });
// });

// // Contact Page Route (keep as is)
// app.get('/contact', (req, res) => {
//     res.render('contact', { title: "Contact Us" });
// });


// // Start server
// app.listen(port, () => console.log(`Server running at http://localhost:${port}`));



import express from 'express';
import morgan from 'morgan';
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url)); // Corrected typo here
const app = express();
const port = 3000;

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.set("view engine", "ejs");

// Helper functions
const postsDir = __dirname + '/posts/';

// Define available categories
const AVAILABLE_CATEGORIES = [
    "Technology",
    "Travel",
    "Food",
    "Lifestyle",
    "Programming",
    "Science",
    "Arts",
    "Personal",
    "Sports",     // <-- New
    "Business",   // <-- New
    "Animals",    // <-- New
    "Space",      // <-- New
    "History",
    "Education"     // <-- New
];


function loadPosts() {
    try {
        // Load all posts
        let posts = fs.readdirSync(postsDir).map(filename => {
            const slug = path.basename(filename, ".json");
            const data = JSON.parse(fs.readFileSync(postsDir + filename));
            return { ...data, slug };
        });

        // Sort posts by lastModified date in descending order (newest first)
        // If a post doesn't have lastModified (e.g., old posts), treat it as very old.
        posts.sort((a, b) => {
            const dateA = a.lastModified ? new Date(a.lastModified).getTime() : 0;
            const dateB = b.lastModified ? new Date(b.lastModified).getTime() : 0;
            return dateB - dateA; // For descending order (newest first)
        });

        return posts;

    } catch (error) {
        console.error("Error loading posts:", error);
        return [];
    }
}

function savePost(slug, data) {
    fs.writeFileSync(postsDir + slug + '.json', JSON.stringify(data, null, 2));
}

function generateLoremPicsumUrl() {
    const width = 800;
    const height = 600;
    const uniqueId = Math.floor(Math.random() * 1000000000);
    return `https://picsum.photos/id/${uniqueId % 1000}/${width}/${height}`;
}

// 1. Home – list posts (Uses the now sorted loadPosts())
app.get('/', (req, res) => {
    let posts = loadPosts();
    const selectedCategory = req.query.category;
    const searchTerm = req.query.search;

    if (selectedCategory && selectedCategory !== 'all') {
        posts = posts.filter(p => p.category && p.category === selectedCategory);
    }
    if (searchTerm) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        posts = posts.filter(p => p.title.toLowerCase().includes(lowerCaseSearchTerm));
    }

    const allPostsForCategories = loadPosts(); // Re-load all posts to get all category counts, then sort them
    const categoriesMap = {};
    allPostsForCategories.forEach(post => {
        if (post.category) {
            categoriesMap[post.category] = (categoriesMap[post.category] || 0) + 1;
        }
    });
    const categories = Object.keys(categoriesMap).map(name => ({
        name: name,
        count: categoriesMap[name]
    })).sort((a, b) => a.name.localeCompare(b.name));


    res.render('index', {
        posts,
        title: (searchTerm ? `Search Results for "${searchTerm}"` : (selectedCategory ? `${selectedCategory} Posts` : "All Posts")),
        categories,
        selectedCategory,
        searchTerm,
    });
});

// 2. New Post form
app.get('/new', (req, res) => {
    res.render('new', {
        title: "Create New Post",
        availableCategories: AVAILABLE_CATEGORIES
    });
});

// 3. Handle form submission (UPDATED: Add lastModified timestamp)
app.post('/new', (req, res) => {
    const { title, content, category, imageUrl } = req.body;
    const slug = title.toLowerCase().replace(/ /g, '-');

    let finalCategory = category;
    if (category === 'Random') {
        const randomIndex = Math.floor(Math.random() * AVAILABLE_CATEGORIES.length);
        finalCategory = AVAILABLE_CATEGORIES[randomIndex];
    }

    let finalImageUrl;
    if (imageUrl && imageUrl.trim() !== '') {
        finalImageUrl = imageUrl.trim();
    } else {
        finalImageUrl = generateLoremPicsumUrl();
    }

    // Add lastModified timestamp here
    savePost(slug, {
        title,
        content,
        category: finalCategory,
        image: finalImageUrl,
        lastModified: new Date().toISOString() // Store ISO string for easy sorting
    });
    res.redirect(`/posts/${slug}`);
});

// 4. Single post view (keep as is for now, will modify in next step)
app.get('/posts/:slug', (req, res) => {
    const slug = req.params.slug; // This extracts the slug from the URL
    let post;
    try {
        post = JSON.parse(fs.readFileSync(postsDir + slug + '.json'));
        // Ensure the slug is part of the post object passed to EJS
        post.slug = slug; // <--- THIS LINE IS CRUCIAL
    } catch {
        return res.status(404).send('Post not found');
    }

    res.render('post', {
        post, // The 'post' object passed here must have the slug property
        title: post.title
    });
});


// 1) Render Edit form
app.get("/edit/:slug", (req, res) => {
    const slug = req.params.slug;
    try {
        const post = JSON.parse(fs.readFileSync(postsDir + slug + ".json"));
        post.slug = slug;
        res.render("edit", {
            post,
            slug,
            title: `Edit: ${post.title}`,
            availableCategories: AVAILABLE_CATEGORIES
        });
    } catch {
        res.status(404).send("Post not found");
    }
});

// 2) Handle Edit submission (UPDATED: Update lastModified timestamp)
app.post("/edit/:slug", (req, res) => {
    const oldSlug = req.params.slug;
    const { title, content, category, imageUrl } = req.body;
    const newSlug = title.toLowerCase().replace(/ /g, "-");

    let existingPost = {};
    try {
        existingPost = JSON.parse(fs.readFileSync(postsDir + oldSlug + ".json"));
    } catch (error) {
        console.error("Error reading existing post for edit:", error);
    }

    let finalCategory = category;
    if (category === 'Random') {
        const randomIndex = Math.floor(Math.random() * AVAILABLE_CATEGORIES.length);
        finalCategory = AVAILABLE_CATEGORIES[randomIndex];
    }

    let finalImageUrl;
    if (imageUrl && imageUrl.trim() !== '') {
        finalImageUrl = imageUrl.trim();
    } else if (existingPost.image) {
        finalImageUrl = existingPost.image;
    } else {
        finalImageUrl = generateLoremPicsumUrl();
    }

    // Preserve existing lastModified if present, otherwise set current time.
    // This handles old posts not yet having a lastModified field,
    // but ensures it's updated on subsequent edits.
    const currentLastModified = existingPost.lastModified || new Date().toISOString();

    savePost(newSlug, {
        title,
        content,
        category: finalCategory,
        image: finalImageUrl,
        lastModified: new Date().toISOString() // Always update lastModified on edit
    });

    if (newSlug !== oldSlug) {
        fs.unlinkSync(postsDir + oldSlug + ".json");
    }
    res.redirect(`/posts/${newSlug}`);
});

// 3) Handle Delete (keep as is)
app.post("/delete/:slug", (req, res) => {
    const slug = req.params.slug;
    try {
        fs.unlinkSync(postsDir + slug + ".json");
    } catch { }
    res.redirect("/");
});

// About Page Route (keep as is)
app.get('/about', (req, res) => {
    res.render('about', { title: "About My Blog" });
});

// Contact Page Route (keep as is)
app.get('/contact', (req, res) => {
    res.render('contact', { title: "Contact Us" });
});


// Start server
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));