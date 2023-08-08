function loadClientes() {
    $.ajax({
        type: 'GET',
        url: '/clientes', 
        dataType: 'json',
        success: function(response) {
            
            $.each(response.data, function(index, cliente) {
                var newRow = '<tr>';
                newRow += '<td>' + cliente.id + '</td>';
                newRow += '<td>' + cliente.nombre + '</td>';
                newRow += '<td>' + cliente.apellido + '</td>';
                newRow += '<td>' + cliente.domicilio + '</td>';
                newRow += '<td>' + cliente.correo_electronico + '</td>';
                newRow += '<td>';
                newRow += '<button value="'+cliente.id+'" class="btnEditarCliente btn btn-outline-info me-2" data-bs-toggle="modal" data-bs-target="#modalEdit">Editar</button>';
                newRow += '<button value="'+cliente.id+'" class="btnEliminar btn btn-outline-danger">Eliminar</button>';
                newRow += '</td>';
                newRow += '</tr>';
                $('#clientesTable tbody').append(newRow);
            });

            $(".btnEditarCliente").each(function(index, boton) {
                $(boton).on("click", function(){
                    mostrarCliente($(this).val());
                })
            });

            $(".btnEliminar").each(function(index, boton) {
                $(boton).on("click", function(){
                    eliminarCliente($(this).val());
                })
            });

            $('#spinner').addClass("d-none");
            $('#clientesTable').removeClass("d-none");
        },
        error: function(xhr, status, error) {
            alert('Error al cargar los clientes.');
        }
    });
}

function agregarCliente() {
    const formData = $('#agregarClienteForm').serialize();

    $.ajax({
        type: 'POST',
        url: '/cliente', 
        data: formData,
        dataType: 'json',
        success: function(response) {
            alert('message: ' + response.message);
            location.reload();
        },
        error: function(xhr, status, error) {
            const errorMessage = xhr.responseJSON.error;
            alert(errorMessage);
        }
    });
}

function mostrarCliente(id) {
    $.ajax({
        type: 'GET',
        url: '/cliente/'+id, 
        dataType: 'json',
        success: function(response) {
            console.log(response.data)
            $("#idCliente").val(response.data.id);
            $("#nombreEditar").val(response.data.nombre);
            $("#apellidoEditar").val(response.data.apellido); 
            $("#domicilioEditar").val(response.data.domicilio);
            $("#emailEditar").val(response.data.correo_electronico);
        },
        error: function(xhr, status, error) {
            alert('Error al cargar los clientes.');
        }
    });
}

function editarCliente() {
    const formData = $('#editarCliente').serialize();
    const id = $("#idCliente").val();

    $.ajax({
        type: 'PUT',
        url: '/cliente/' + id, 
        data: formData,
        dataType: 'json',
        success: function(response) {
            alert('message: ' + response.message);
            location.reload();
        },
        error: function(xhr, status, error) {
            const errorMessage = xhr.responseJSON.error;
            alert(errorMessage);
        }
    });
}

function eliminarCliente(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
        var csrfToken = $('#csrf-token').data('csrf-token');
        $.ajax({
            type: 'DELETE',
            url: '/cliente/' + id,
            data: {
                _token: csrfToken
            }, 
            dataType: 'json',
            beforeSend: function(xhr) {
            },
            success: function(response) {
                alert('message: ' + response.message);
                location.reload();
            },
            error: function(xhr, status, error) {
                const errorMessage = xhr.responseJSON.error;
                alert(errorMessage);
            }
        });
    }
}

$(document).ready(function() {
    loadClientes();
    $('#agregarClienteForm')[0].reset();


    $('#modalEdit').on('hidden.bs.modal', function () {
        $("#nombreEditar").val('');
        $("#apellidoEditar").val('');
        $("#domicilioEditar").val('');
        $("#emailEditar").val('');
    });
    
    $('#agregarClienteForm').on('submit', function(e) {
        e.preventDefault(); 
        agregarCliente()
    });

    $('#editarCliente').on('submit', function(e) {
        e.preventDefault(); 
        editarCliente()
    });

});
