function login() {
    const formData = $('#loginForm').serialize();

    $.ajax({
        type: 'POST',
        url: '/signin', 
        data: formData,
        dataType: 'json',
        success: function(response) {
            window.location.href = '/dashboard';
        },
        error: function(xhr, status, error) {
            const errorMessage = xhr.responseJSON.error;
            alert(errorMessage);
        }
    });
}

function logout() {
    const formData = $('#formLogout').serialize();
    $.ajax({
        type: 'POST',
        url: '/logout', 
        data: formData,
        dataType: 'json',
        success: function(response) {
            window.location.href = '/';
        },
        error: function(xhr, status, error) {
            const errorMessage = xhr.responseJSON.error;
            alert(errorMessage);
        }
    });
}

$(document).ready(function() {

    $('#loginForm').on('submit', function(e) {
        e.preventDefault(); 
        login();
    });

    $('#formLogout').on('submit', function(e) {
        e.preventDefault(); 
        logout();
    });
});
