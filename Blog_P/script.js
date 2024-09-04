// script.js

document.addEventListener('DOMContentLoaded', () => {
    const blogsContainer = document.getElementById('blogsContainer');
    const modal = document.getElementById('modal');
    const addBlogBtn = document.getElementById('addBlogBtn');
    const closeModal = document.getElementById('closeModal');
    const blogForm = document.getElementById('blogForm');

    // Load blogs from LocalStorage
    const loadBlogs = () => {
        const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        blogsContainer.innerHTML = '';
        blogs.forEach((blog, index) => {
            const blogCard = document.createElement('div');
            blogCard.className = 'blog-card';
            blogCard.innerHTML = `
                <img src="${blog.image}" alt="Blog Image" class="blog-image">
                <h2>${blog.title}</h2>
                <p><strong>Poster:</strong> ${blog.poster}</p>
                <p>${blog.description}</p>
                <button onclick="viewBlog(${index})">Read More</button>
            `;
            blogsContainer.appendChild(blogCard);
        });
    };

    // Show Modal
    addBlogBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    // Close Modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Add New Blog
    blogForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        const imageFile = blogForm.image.files[0];
        const reader = new FileReader();

        reader.onloadend = function () {
            const newBlog = {
                title: blogForm.title.value,
                poster: blogForm.poster.value,
                description: blogForm.description.value,
                content: blogForm.content.value,
                image: reader.result
            };
            blogs.push(newBlog);
            localStorage.setItem('blogs', JSON.stringify(blogs));
            modal.style.display = 'none';
            blogForm.reset();
            loadBlogs();
        };

        if (imageFile) {
            reader.readAsDataURL(imageFile);
        }
    });

    loadBlogs();
});

// Function to view blog post
function viewBlog(index) {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const blog = blogs[index];
    if (blog) {
        localStorage.setItem('currentBlog', JSON.stringify(blog));
        window.location.href = 'blog.html';
    }
}

// blog.html Script
if (window.location.pathname.endsWith('blog.html')) {
    const blog = JSON.parse(localStorage.getItem('currentBlog'));
    if (blog) {
        document.getElementById('blogTitle').innerText = blog.title;
        document.getElementById('blogPoster').innerText = `Posted by: ${blog.poster}`;
        document.getElementById('blogContent').innerHTML = `
            <img src="${blog.image}" alt="Blog Image" class="blog-image">
            <p>${blog.content}</p>
        `;
    }
}
