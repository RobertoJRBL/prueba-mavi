<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    public function index()
    {
        $clientes = Cliente::orderBy('id', 'desc')->get();
        return response()->json(['data' => $clientes]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required',
            'apellido' => 'required',
            'domicilio' => 'required',
            'email' => 'required|email',
        ]);

        $nombre = $request->input('nombre');
        $apellido = $request->input('apellido');
        $domicilio = $request->input('domicilio');
        $correo_electronico = $request->input('email');

        $cliente = new Cliente;
        $cliente->nombre = $nombre;
        $cliente->apellido = $apellido;
        $cliente->domicilio = $domicilio;
        $cliente->correo_electronico = $correo_electronico;
        $cliente->save();
        return response()->json(['data' => $cliente, 'message' => 'Cliente creado correctamente.']);
    }

    public function show($id)
    {
        $cliente = Cliente::find($id);
        if ($cliente) {
            return response()->json(['data' => $cliente]);
        } else {
            return response()->json(['error' => 'Cliente no encontrado.'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nombre' => 'required',
            'apellido' => 'required',
            'domicilio' => 'required',
            'email' => 'required|email',
        ]);

        $nombre = $request->input('nombre');
        $apellido = $request->input('apellido');
        $domicilio = $request->input('domicilio');
        $correo_electronico = $request->input('email');

        $cliente = Cliente::find($id);

        if (!$cliente) {
            return response()->json(['error' => 'Cliente no encontrado.'], 404);
        }

        $cliente->nombre = $nombre;
        $cliente->apellido = $apellido;
        $cliente->domicilio = $domicilio;
        $cliente->correo_electronico = $correo_electronico;
        $cliente->save();

        return response()->json(['data' => $cliente, 'message' => 'Cliente actualizado correctamente.']);
    }

    public function destroy($id)
    {
        $cliente = Cliente::find($id);
        if ($cliente) {
            $cliente->delete();
            return response()->json(['message' => 'Cliente eliminado correctamente.']);
        } else {
            return response()->json(['error' => 'Cliente no encontrado.'], 404);
        }
    }
}
