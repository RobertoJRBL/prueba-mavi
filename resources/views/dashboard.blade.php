@extends('app')
@include('partials.nav')

@section('title')
<title>Dashboard</title>
@endsection

@section('content')
<div class="container my-5">
    <h1 class="text-center mb-4 text-uppercase fw-bold">Bienvenido</h1>
    <div id="spinner" class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <button type="button" class="btn btn-primary ms-auto d-block mb-4" data-bs-toggle="modal" data-bs-target="#modalAdd">
      Agregar
    </button>
    <table class="table d-none" id="clientesTable">
        <thead >
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Domicilio</th>
                <th scope="col">Correo Electrónico</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>

        </tbody>
    </table>

    <div class="modal fade" id="modalAdd" tabindex="-1" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitleId">Agregar cliente</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="agregarClienteForm">
                        @csrf
                        <div class="mb-3">
                            <label for="nombre" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="nombreAgregar" name="nombre" required>
                        </div>
                        <div class="mb-3">
                            <label for="apellido" class="form-label">Apellido</label>
                            <input type="text" class="form-control" id="apellidoAgregar" name="apellido" required>
                        </div>
                        <div class="mb-3">
                            <label for="domicilio" class="form-label">Domicilio</label>
                            <input type="text" class="form-control" id="domicilioAgregar" name="domicilio" required>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Correo Electrónico</label>
                            <input type="email" class="form-control" id="emailAgregar" name="email" required>
                        </div>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button id="btnAgregarCliente" type="submit" class="btn btn-primary">Guardar Cliente</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalEdit" tabindex="-1" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitleId">Editar Cliente</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="editarCliente">
                        @csrf
                        <input type="hidden" class="form-control" id="idCliente" name="idCliente" >
                        <div class="mb-3">
                            <label for="nombre" class="form-label" >Nombre</label>
                            <input type="text" class="form-control" id="nombreEditar" name="nombre" required>
                        </div>
                        <div class="mb-3">
                            <label for="apellido" class="form-label"> Apellido</label>
                            <input type="text" class="form-control" id="apellidoEditar" name="apellido" required>
                        </div>
                        <div class="mb-3">
                            <label for="domicilio" class="form-label" >Domicilio</label>
                            <input type="text" class="form-control" id="domicilioEditar" name="domicilio" required>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label" >Correo Electrónico</label>
                            <input type="email" class="form-control" id="emailEditar" name="email" required>
                        </div>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn btn-primary">Guardar Cliente</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div id="csrf-token" data-csrf-token="{{ csrf_token() }}"></div>
</div>
@endsection

@section('scripts')
    <script src="{{ asset('assets/js/main.js') }}"></script>
    <script src="{{ asset('assets/js/clientes.js') }}"></script>
@endsection