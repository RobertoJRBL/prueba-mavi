<?php

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Route::view('/', 'welcome');
Route::view('/', 'login')->name('login');
Route::view('dashboard', 'dashboard')->middleware('auth');

Route::post('/signin', [UserController::class, 'signin']);
Route::post('/logout', [UserController::class, 'logout'])->middleware('auth');

Route::get('/clientes', [ClienteController::class, 'index'])->middleware('auth');
Route::post('/cliente', [ClienteController::class, 'store'])->middleware('auth');
Route::get('/cliente/{id}', [ClienteController::class, 'show'])->middleware('auth');
Route::put('/cliente/{id}', [ClienteController::class, 'update'])->middleware('auth');
Route::delete('/cliente/{id}', [ClienteController::class, 'destroy'])->middleware('auth');




