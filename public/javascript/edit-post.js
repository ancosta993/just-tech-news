async function editFormHandler(event) {
   event.preventDefault();
   const title = document.querySelector("input[name='post-title']").value.trim();

   const post_id = window.location.toString().split('?')[0].split('/')[
      window.location.toString().split('?')[0].split('/').length - 1
   ];

   const response = await fetch(`/api/posts/${post_id}`, {
      method: 'PUT',
      body: JSON.stringify({
         title
      }),
      headers: {
         "Content-Type": 'application/json'
      }
   });

   if (response.ok){
      document.location.replace('/dashboard/');
   }
}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);