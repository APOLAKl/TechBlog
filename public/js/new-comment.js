const newCommentHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const comment = document.querySelector('#content').value.trim();

  const blog_id = window.location.href.split("/")[4]

  if (comment && blog_id) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ comment, blog_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the homepage
      document.location.replace('/blog/' + blog_id);
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentHandler);