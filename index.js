import express from 'express';
import morgan from 'morgan';
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url)); 
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
    "Sports",    
    "Business",  
    "Animals",   
    "Space", 
    "History",
    "Education"
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
