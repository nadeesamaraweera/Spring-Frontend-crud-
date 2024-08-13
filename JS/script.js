$('#savepost').click(function (){

    // console.log('event is triggered!')

    let postId =$('#post-id').val();
    let postTitle =$('#post-title').val();
    let postContent =$('#post-content').val();
    console.log(postId,postTitle,postContent);
    $.ajax({
        url:"http://localhost:8080/blog/savepost",
        method:"POST",
        contentType:"application/json",
        "data":JSON.stringify({
            "id":postId,
            "title":postTitle,
            "content":postContent
        }),
        success:function (result){
           console.log(result)
           alert("done")
        },
        error:function (error){
            console.log(error)
            alert("try again")

        }
    })




})

$('#updatepost').click(function () {
    let postId = $('#post-id').val();
    let postTitle = $('#post-title').val();
    let postContent = $('#post-content').val();
    console.log(postId, postTitle, postContent);

    $.ajax({
        url: "http://localhost:8080/blog/updatepost", // Update the endpoint URL
        method: "PUT", //
        contentType: "application/json",
        data: JSON.stringify({
            "id": postId,
            "title": postTitle,
            "content": postContent
        }),
        success: function (result) {
            console.log(result);
            alert("updated successfully!");
        },
        error: function (error) {
            console.log(error);
            alert("Update failed, please try again.");
        }
    });
});

$('#deletepost').click(function () {
    let postId = $('#post-id').val();

    $.ajax({
        url: "http://localhost:8080/blog/deletepost/" + postId,
        method: "DELETE",
        contentType: "application/json",
        success: function (result) {
            console.log(result);
            alert("deleted successfully!");
        },
        error: function (error) {
            console.log(error);
            alert("Failed to delete the post.");
        }
    });
});




//------------------------------

$(document).ready(function() {
    // Function to get all posts and populate the table
    function getAllPosts() {
        // Assuming you're fetching data from a server API, replace the URL with your actual endpoint
        $.ajax({
            url: 'http://localhost:8080/blog/getallpost', // Replace with your API endpoint
            method: 'GET',
            success: function(data) {
                var tbody = $('#postTable tbody');
                tbody.empty(); // Clear existing rows

                data.forEach(function(post) {
                    var row = `<tr>
                        <td>${post.id}</td>
                        <td>${post.title}</td>
                        <td>${post.content}</td>
                        <td>
                            <button class="btn btn-warning edit-post" data-id="${post.id}">Edit</button>
                            <button class="btn btn-danger btn-sm delete-post" data-id="${post.id}">Delete</button>
                        </td>
                    </tr>`;
                    tbody.append(row);
                });
            },
            error: function(error) {
                console.error('Error fetching posts:', error);
            }
        });
    }

    // Attach click event to Edit buttons
    $('.edit-post').click(function() {
        const postId = $(this).data('id');
        $.ajax({
            url: `http://localhost:8080/blog/updatepost/${postId}`,
            method: 'GET',
            success: function(post) {
                $('#post-id').val(post.id);
                $('#post-title').val(post.title);
                $('#post-content').val(post.content);
                $('#updatepost').data('id', post.id); // Store post ID in the update button
            },
            error: function(error) {
                console.error('Error fetching post:', error);
            }
        });
    });

    // Function to handle post deletion
    $(document).on('click', '.delete-post', function() {
        var postId = $(this).data('id');
        // Replace with your delete API endpoint
        $.ajax({
            url: `http://localhost:8080/blog/deletepost/${postId}`, // Replace with your API endpoint
            method: 'DELETE',
            success: function() {
                getAllPosts(); // Refresh the table after deletion
            },
            error: function(error) {
                console.error('Error deleting post:', error);
            }
        });
    });



    // Initialize the table with all posts
    $('#getallpost').click(function() {
        getAllPosts();
    });
});