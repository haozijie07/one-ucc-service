type Condition = {
  field: string;
  operator:
    | 'eq'
    | 'ne'
    | 'lt'
    | 'lte'
    | 'gt'
    | 'gte'
    | 'like'
    | 'in'
    | 'between';
  value: any;
};

export function buildWhereInput(conditions: Condition[]): Record<string, any> {
  const where: Record<string, any> = {};

  for (const cond of conditions) {
    const { field, operator, value } = cond;
    switch (operator) {
      case 'eq':
        where[field] = value;
        break;
      case 'ne':
        where[field] = { not: value };
        break;
      case 'lt':
      case 'lte':
      case 'gt':
      case 'gte':
        where[field] = { [operator]: value };
        break;
      case 'like':
        where[field] = { contains: value };
        break;
      case 'in':
        where[field] = { in: Array.isArray(value) ? value : [value] };
        break;
      case 'between':
        if (Array.isArray(value) && value.length === 2) {
          where[field] = { gte: value[0], lte: value[1] };
        }
        break;
    }
  }

  return where;
}
