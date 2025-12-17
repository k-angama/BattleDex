import { CompareLocalDatabase } from '../../../common/db/CompareLocalDatabase';
import { CompareRowRaw } from '../../../common/db/dto/CompareRowRaw';
import { DataBaseCardsRepository } from '../domaine/DataBaseCardsRepository';
import { CompareCardsPreviewEntity } from '../domaine/entities/CompareCardsPreviewEntity';
import { ComparePreviewMapper } from './mappers/ComparePreviewMapper';

export class DataBaseCardsRepositoryImpl implements DataBaseCardsRepository {
  constructor(private compareLocalDatabase: CompareLocalDatabase) {}
  getCompareCards(): Promise<CompareCardsPreviewEntity[]> {
    return this.compareLocalDatabase
      .getCompareCards()
      .then(rows =>
        rows.map((row: CompareRowRaw) => ComparePreviewMapper.toEntity(row)),
      );
  }
}
