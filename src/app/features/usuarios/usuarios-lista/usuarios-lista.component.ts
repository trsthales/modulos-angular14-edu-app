/**
 * USUARIOS-LISTA.COMPONENT.TS
 */

import { Component, OnInit } from '@angular/core';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-usuarios-lista',
  templateUrl: './usuarios-lista.component.html',
  styleUrls: ['./usuarios-lista.component.css']
})
export class UsuariosListaComponent implements OnInit {
  usuarios: Usuario[] = [
    { id: 1, nome: 'João Silva', email: 'joao@example.com', role: 'Admin' },
    { id: 2, nome: 'Maria Santos', email: 'maria@example.com', role: 'Editor' },
    { id: 3, nome: 'Pedro Costa', email: 'pedro@example.com', role: 'Viewer' },
    { id: 4, nome: 'Ana Lima', email: 'ana@example.com', role: 'Editor' }
  ];

  constructor() {}

  ngOnInit(): void {
    console.log('👥 UsuariosListaComponent inicializado');
  }
}
