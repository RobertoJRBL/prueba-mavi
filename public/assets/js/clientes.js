function loadClientes() {
    $.ajax({
        type: 'GET',
        url: '/clientes', 
        dataType: 'json',
        success: function(response) {
            if (response.data.length === 0) {
                $('#clientesTable tbody').html('<tr><td colspan="6">No hay registros</td></tr>');
            } else {
                $.each(response.data, function(index, cliente) {
                    agregarFilaCliente(cliente)
                });
            }

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
            if($('#clientesTable .filaCliente').length === 0){
                $('#clientesTable tbody').empty();
            }
            agregarFilaCliente(response.data, false)
            $('#agregarClienteForm')[0].reset();
            $('#modalAdd').modal('hide');
            alert('message: ' + response.message);
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
            let rowToUpdate = $("#cliente" + response.data.id);
            rowToUpdate.find("td:eq(1)").text(response.data.nombre);
            rowToUpdate.find("td:eq(2)").text(response.data.apellido);
            rowToUpdate.find("td:eq(3)").text(response.data.domicilio);
            rowToUpdate.find("td:eq(4)").text(response.data.correo_electronico);
            $('#modalEdit').modal('hide');
            alert('message: ' + response.message);
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
            success: function(response) {
                $("#cliente"+id).remove();
                if($('#clientesTable .filaCliente').length === 0){
                    $('#clientesTable tbody').html('<tr><td colspan="6">No hay registros</td></tr>');
                }
                alert('message: ' + response.message);
            },
            error: function(xhr, status, error) {
                const errorMessage = xhr.responseJSON.error;
                alert(errorMessage);
            }
        });
    }
}

function agregarFilaCliente(cliente, isLast = true) {
    let newRow = '<tr id="cliente' + cliente.id + '" class="filaCliente">';
        newRow += '<td>' + cliente.id + '</td>';
        newRow += '<td>' + cliente.nombre + '</td>';
        newRow += '<td>' + cliente.apellido + '</td>';
        newRow += '<td>' + cliente.domicilio + '</td>';
        newRow += '<td>' + cliente.correo_electronico + '</td>';
        newRow += '<td>';
        newRow += '<button value="' + cliente.id + '" class="btnEditarCliente btn btn-outline-info me-2" data-bs-toggle="modal" data-bs-target="#modalEdit">Editar</button>';
        newRow += '<button value="' + cliente.id + '" class="btnEliminar btn btn-outline-danger">Eliminar</button>';
        newRow += '</td>';
        newRow += '</tr>';

    isLast ? $('#clientesTable tbody').append(newRow) : $(newRow).prependTo('#clientesTable tbody');
}

$(document).ready(function() {
    loadClientes();

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

    $(document).on("click", ".btnEditarCliente", function() {
        mostrarCliente($(this).val());
    });
    
    $(document).on("click", ".btnEliminar", function(){
        eliminarCliente($(this).val());
    });
});
