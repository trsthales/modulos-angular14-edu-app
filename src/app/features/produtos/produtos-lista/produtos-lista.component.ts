/**
 * PRODUTOS-LISTA.COMPONENT.TS
 * Componente que lista produtos
 */

import { Component, OnInit } from '@angular/core';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
}

@Component({
  selector: 'app-produtos-lista',
  templateUrl: './produtos-lista.component.html',
  styleUrls: ['./produtos-lista.component.css']
})
export class ProdutosListaComponent implements OnInit {
  produtos: Produto[] = [
    { id: 1, nome: 'Angular 14 - Curso Completo', preco: 199.90, descricao: 'Aprenda Angular do zero' },
    { id: 2, nome: 'TypeScript Avançado', preco: 149.90, descricao: 'Domine TypeScript' },
    { id: 3, nome: 'RxJS na Prática', preco: 129.90, descricao: 'Programação reativa' },
    { id: 4, nome: 'NgRx State Management', preco: 179.90, descricao: 'Gerenciamento de estado' }
  ];

  constructor() {
    console.log('📦 ProdutosListaComponent criado');
  }

  ngOnInit(): void {
    console.log('📦 ProdutosListaComponent inicializado');
    console.log('Este componente faz parte do ProdutosModule (Feature Module)');
  }
}
