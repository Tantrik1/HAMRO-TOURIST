import { DefaultNamingStrategy, NamingStrategyInterface, Table } from 'typeorm';

function snake(str: string): string {
  return str.replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2').toLowerCase();
}

export class SnakeNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  tableName(targetName: string, userSpecifiedName: string | undefined): string {
    return userSpecifiedName ?? snake(targetName);
  }

  columnName(propertyName: string, customName: string | undefined, embeddedPrefixes: string[]): string {
    const prefix = embeddedPrefixes.length > 0 ? `${snake(embeddedPrefixes.join('_'))}_` : '';
    return prefix + (customName ?? snake(propertyName));
  }

  relationName(propertyName: string): string {
    return snake(propertyName);
  }

  joinColumnName(relationName: string, referencedColumnName: string): string {
    return snake(`${relationName}_${referencedColumnName}`);
  }

  joinTableName(firstTableName: string, secondTableName: string, firstPropertyName: string): string {
    return snake(`${firstTableName}_${firstPropertyName.replace(/\./gi, '_')}_${secondTableName}`);
  }

  joinTableColumnName(tableName: string, propertyName: string, columnName?: string): string {
    return snake(`${tableName}_${columnName ?? propertyName}`);
  }

  classTableInheritanceParentColumnName(parentTableName: any, parentTableIdPropertyName: any): string {
    return snake(`${parentTableName}_${parentTableIdPropertyName}`);
  }

  eponym(name: string): string {
    return snake(name);
  }

  indexName(tableOrName: Table | string, columnNames: string[]): string {
    const table = tableOrName instanceof Table ? tableOrName.name : tableOrName;
    return `idx_${table}_${columnNames.join('_')}`;
  }
}
