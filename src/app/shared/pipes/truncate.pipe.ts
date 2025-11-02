/**
 * TRUNCATE.PIPE.TS
 * Pipe customizado para truncar texto
 * 
 * PIPES EM SHARED MODULE:
 * -----------------------
 * Pipes que formatam dados e são usados em vários módulos
 * devem estar no SharedModule e serem exportados.
 * 
 * USO:
 * {{ longText | truncate:100 }}
 * {{ 'Este é um texto muito longo' | truncate:10 }}
 * Resultado: "Este é um..."
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  /**
   * Trunca um texto para um tamanho máximo
   * @param value Texto a ser truncado
   * @param limit Tamanho máximo (padrão: 50)
   * @param trail Caracteres finais (padrão: '...')
   */
  transform(value: string, limit: number = 50, trail: string = '...'): string {
    if (!value) return '';
    
    if (value.length <= limit) {
      return value;
    }
    
    return value.substring(0, limit) + trail;
  }
}
