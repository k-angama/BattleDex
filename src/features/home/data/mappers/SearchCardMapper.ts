import { SearchCardRaw } from '../../../../common/api/dto/SearchCardRaw';
import { SearchCardSuggestionEntity } from '../../domaine/entities/SearchCardSuggestionEntity';

export class SearchCardMapper {
  static toEntity(dto: SearchCardRaw): SearchCardSuggestionEntity {
    return {
      id: dto.id,
      title: dto.name,
      subtitle: dto.setName,
      imageUrl: dto.imageUrl ?? '',
    };
  }

  static fromEntity(entity: SearchCardSuggestionEntity): SearchCardRaw {
    return {
      id: entity.id,
      name: entity.title,
      setName: entity.subtitle,
      imageUrl: entity.imageUrl,
    };
  }
}
