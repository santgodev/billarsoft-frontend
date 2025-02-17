import { Component } from '@angular/core';

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrl: './pool.component.css'
})
export class PoolComponent {
  tables = [

    { id: 1,  },
    { id: 2,  },
    { id: 3,  },
    { id: 4,  },
    { id: 5,  },
    { id: 6,  },
    { id: 7,  },
    { id: 8,  },



  ];

  constructor() { }

  ngOnInit(): void { }

  onTableClick(tableId: number): void {
    alert(`Mesa con ID: ${tableId} clickeada!`);
  }
}
