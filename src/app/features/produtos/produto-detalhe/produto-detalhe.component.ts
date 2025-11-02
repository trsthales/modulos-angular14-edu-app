/**
 * PRODUTO-DETALHE.COMPONENT.TS
 * Componente que exibe detalhes de um produto específico
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-produto-detalhe',
  templateUrl: './produto-detalhe.component.html',
  styleUrls: ['./produto-detalhe.component.css']
})
export class ProdutoDetalheComponent implements OnInit {
  produtoId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Captura o ID da URL
    this.produtoId = this.route.snapshot.paramMap.get('id');
    console.log('📦 Visualizando produto ID:', this.produtoId);
  }

  voltar(): void {
    this.router.navigate(['/produtos']);
  }
}
