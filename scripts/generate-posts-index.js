const fs = require('fs-extra');
const matter = require('gray-matter');
const path = require('path');

// Define posts root directory
const filesDir = path.join('public/posts');
// Define output file name and location
const output = path.join('public/posts-index.json');

// Get all files recursively
const files = fs.readdirSync(filesDir, { recursive: true }, 'utf-8');

// Get only markdown files and only the ones with '_' in their names
const posts = files.filter(file => file.endsWith('.md') && file.includes('_')).map(file => {
    // Get file contet
    const content = fs.readFileSync(path.join(filesDir, file));
    // Get file metadata using gray-matter
    const { data } = matter(content);
    
    // Get only file name, since "file" contains file directory name
    const fileName = path.basename(file);
    // Get file directory
    const fileDir = path.dirname(file);

    // Split folders (year and month) by path separator
    // If it's the root path return a empty array
    const folders = fileDir === '.' ? [] : fileDir.split(path.sep);

    // Return metadata in the PostData model format
    return {
        // Get first folder (year)
        year: folders[0],
        // Get second folder (month)
        month: folders[1],
        // Get the id, which is before the "_" in the file name
        id: fileName.split('_').at(0),
        coverDiagram: data.coverDiagram,
        // Get the slug, which is after the "_" in the file name, and remove extension
        slug: fileName.split('_').at(1).replace('.md', ''),
        title: data.title,
        category: data.category,
        date: data.date,
        description: data.description,
        tags: data.tags,
    }
});

// Write posts as a formatted JSON file
fs.writeFileSync(output, JSON.stringify(posts, null, 2));
