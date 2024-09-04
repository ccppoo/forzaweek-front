//

// '++id,name, year, country,driveTrain,door,engine,manufacture,bodyStyle',

/**
 * 1. ++	Auto-incremented primary key
 * 2. &	Unique index
 * 3. `column_name`*	Multi-entry index (searching names:[...] -> )
 * 4. [A+B]	Compound index or primary key
 */

function CompoundIndex(index: string[]): string {
  return `[${index.join('+')}]`;
}

function UniqueIndex(index: string): string {
  return `&${index}`;
}

function MultiEntryIndex(index: string) {
  return `*${index}`;
}

export function AutoIncrementPK(PK: string): string {
  return `++${PK}`;
}

interface dbIndexIntf {
  PK: string;
  duplicate?: string[];
  unique?: string[];
  compound?: string[][];
  multiEntry?: string[];
}

export function dbIndexBuilder(params: dbIndexIntf) {
  const { PK, duplicate, unique, compound, multiEntry } = params;
  const _uniqueIndex = unique?.map((idx) => UniqueIndex(idx)).join(',');
  const _duplicateIndex = duplicate?.join(',');
  const _compoundIndex = compound?.map((indices) => CompoundIndex(indices)).join(',');
  const _multiEntryIndex = multiEntry?.map((idx) => MultiEntryIndex(idx)).join(',');
  const _idx = [PK, _duplicateIndex, _uniqueIndex, _compoundIndex, _multiEntryIndex].filter(
    (idx) => !!idx && idx.length > 0,
  );
  return _idx.join(',');
}
