import { RawSearchCard } from '../../../../common/api/types';
import { SearchCardSuggestionEntity } from '../../domaine/entities/SearchCardSuggestionEntity';

export class SearchCardMapper {
  static toEntity(dto: RawSearchCard): SearchCardSuggestionEntity {
    return {
      id: dto.id,
      title: dto.name,
      subtitle: dto.setName,
      imageUrl: dto.imageUrl ?? '',
    };
  }

  static fromEntity(entity: SearchCardSuggestionEntity): RawSearchCard {
    return {
      id: entity.id,
      name: entity.title,
      setName: entity.subtitle,
      imageUrl: entity.imageUrl,
    };
  }
}
