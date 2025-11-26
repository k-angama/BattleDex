import { compareLocalDatabase } from '../../../common/db/dbDI';
import { RawCompareRow } from '../../../common/db/types';
import { DataBaseCardsRepository } from '../domaine/DataBaseCardsRepository';
import { CompareCardsPreviewEntity } from '../domaine/entities/CompareCardsPreviewEntity';
import { ComparePreviewMapper } from './mappers/ComparePreviewMapper';

export class DataBaseCardsRepositoryImpl implements DataBaseCardsRepository {
  getCompareCards(): Promise<CompareCardsPreviewEntity[]> {
    return compareLocalDatabase
      .getCompareCards()
      .then(rows => rows.map((row: RawCompareRow) => ComparePreviewMapper.toEntity(row)));
  }
}
